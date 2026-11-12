import { test, expect, type Locator, type Page } from './base';

// Overlay behaviour in a real browser: what jsdom cannot see (layout, focus, anchor positioning,
// native scrolling). Every fixture here starts closed and is opened by the test that needs it.

const T = (id: string) => `[data-testid="${id}"]`;

test.beforeEach(async ({ page, testPage }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(testPage);
  await page.waitForSelector(T('overlay-behavior-section'));
});

type Rect = { left: number; top: number; right: number; bottom: number; width: number; height: number };
async function rectOf(loc: Locator): Promise<Rect> {
  return loc.evaluate((el) => {
    const b = el.getBoundingClientRect();
    return { left: b.left, top: b.top, right: b.right, bottom: b.bottom, width: b.width, height: b.height };
  });
}

/** Make the page take the JS positioning path, as on an engine without CSS anchor positioning. */
async function forceJsPositioning(page: Page) {
  await page.addInitScript(() => {
    const orig = CSS.supports.bind(CSS);
    CSS.supports = ((a: string, b?: string) =>
      String(a).includes('position-area') || String(a).includes('anchor') ? false : orig(a, b as string)) as typeof CSS.supports;
  });
}

async function openLifecycleModal(page: Page) {
  await page.locator(T('ob-life-open')).click();
  await expect(page.locator(T('ob-life-modal'))).toHaveAttribute('data-state', 'entered');
}

test.describe('Overlay lifecycle: closing keeps the content mounted', () => {
  test('the dialog is the same DOM node while it fades out', async ({ page }) => {
    await openLifecycleModal(page);
    await page.locator(T('ob-life-modal')).evaluate((el) => {
      (el as HTMLElement & { __same?: boolean }).__same = true;
    });

    await page.keyboard.press('Escape');

    const dialog = page.locator(T('ob-life-modal'));
    await expect(dialog).toHaveAttribute('data-state', 'exiting');
    expect(await dialog.evaluate((el) => (el as HTMLElement & { __same?: boolean }).__same === true)).toBe(true);
    await expect(dialog).toHaveCount(0);
  });

  test('a typed value survives the exit and child effects run once', async ({ page }) => {
    await openLifecycleModal(page);
    await page.locator(T('ob-life-input')).fill('typed by the user');

    await page.keyboard.press('Escape');

    await expect(page.locator(T('ob-life-modal'))).toHaveAttribute('data-state', 'exiting');
    await expect(page.locator(T('ob-life-input'))).toHaveValue('typed by the user');
    // still mounted: one mount, no unmount yet
    expect(await page.evaluate(() => {
      const w = window as unknown as { __obMounts?: number; __obUnmounts?: number };
      return [w.__obMounts ?? 0, w.__obUnmounts ?? 0];
    })).toEqual([1, 0]);

    await expect(page.locator(T('ob-life-modal'))).toHaveCount(0);
    expect(await page.evaluate(() => {
      const w = window as unknown as { __obMounts?: number; __obUnmounts?: number };
      return [w.__obMounts ?? 0, w.__obUnmounts ?? 0];
    })).toEqual([1, 1]);
  });
});

test.describe('Modal backdrop dismissal', () => {
  test('a drag that starts in the dialog and ends on the backdrop keeps the Modal open', async ({ page }) => {
    await page.locator(T('ob-drag-open')).click();
    const dialog = page.locator(T('ob-drag-modal'));
    await expect(dialog).toBeVisible();

    // press in the field, drag out of the dialog, release over the backdrop
    const field = await rectOf(page.locator(T('ob-drag-field')));
    await page.mouse.move(field.right - 10, field.top + field.height / 2);
    await page.mouse.down();
    await page.mouse.move(5, 5, { steps: 5 });
    await page.mouse.up();

    await expect(dialog).toBeVisible();
    await expect(page.locator(T('ob-drag-field'))).toHaveValue('some long text to select by dragging');

    // a real click on the backdrop still closes it
    await page.mouse.click(5, 5);
    await expect(dialog).toHaveCount(0);
  });
});

test.describe('Escape with two Modals open', () => {
  test('sibling modals close top-first, also after the lower one re-renders', async ({ page }) => {
    await page.locator(T('ob-esc-open-a')).click();
    await page.locator(T('ob-esc-open-b')).click();
    await expect(page.locator(T('ob-esc-b'))).toBeVisible();
    // typing updates state in the parent, which re-renders A with a new inline onClose
    await page.locator(T('ob-esc-b-input')).fill('x');

    await page.keyboard.press('Escape');
    await expect(page.locator(T('ob-esc-b'))).toHaveCount(0);
    await expect(page.locator(T('ob-esc-a'))).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator(T('ob-esc-a'))).toHaveCount(0);
  });

  test('a modal nested in another closes before it', async ({ page }) => {
    await page.locator(T('ob-nest-open-a')).click();
    await page.locator(T('ob-nest-open-b')).click();
    await expect(page.locator(T('ob-nest-b'))).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator(T('ob-nest-b'))).toHaveCount(0);
    await expect(page.locator(T('ob-nest-a'))).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator(T('ob-nest-a'))).toHaveCount(0);
  });
});

test.describe('Focus return from a Modal opened by a menu item', () => {
  test('focus goes back to the menu trigger and the page does not scroll', async ({ page }) => {
    const trigger = page.locator(T('ob-focus-trigger'));
    await trigger.scrollIntoViewIfNeeded();
    const scrollBefore = await page.evaluate(() => window.scrollY);
    // the fixture sits well below the first screen, so a jump to the top would show
    expect(scrollBefore).toBeGreaterThan(0);

    await trigger.click();
    await page.locator(T('ob-focus-item')).click();
    await expect(page.locator(T('ob-focus-modal'))).toHaveAttribute('data-state', 'entered');
    // the menu, and the item that had focus, are gone by now
    await expect(page.locator(T('ob-focus-menu'))).toHaveCount(0);

    await page.keyboard.press('Escape');
    await expect(page.locator(T('ob-focus-modal'))).toHaveCount(0);

    await expect(trigger).toBeFocused();
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - scrollBefore)).toBeLessThanOrEqual(1);
  });
});

/** Scroll the page so the element's top edge sits `y` pixels below the top of the viewport. */
async function moveToViewportY(loc: Locator, y: number) {
  await loc.evaluate((el, top) => window.scrollBy(0, el.getBoundingClientRect().top - top), y);
}

/** Open a menu from the keyboard: focus lands on its first item, with a visible focus outline. */
async function openMenuWithKeyboard(page: Page, trigger: Locator, menu: Locator) {
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('data-state', 'entered');
}

/** The menu's scroll box: its visible area (without a scrollbar) and whether its content overflows. */
async function scrollBoxOf(menu: Locator) {
  return menu.evaluate((el) => {
    const box = el.querySelector(':scope > .vane-popup-scroll') as HTMLElement;
    const b = box.getBoundingClientRect();
    const left = b.left + box.clientLeft;
    const top = b.top + box.clientTop;
    return {
      left, top, right: left + box.clientWidth, bottom: top + box.clientHeight,
      scrollHeight: box.scrollHeight, clientHeight: box.clientHeight, scrollTop: box.scrollTop,
    };
  });
}

/** How far the focused item's outline reaches past its box, and the item's box. */
async function focusedItem(page: Page) {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const cs = getComputedStyle(el);
    const b = el.getBoundingClientRect();
    return {
      testId: el.getAttribute('data-testid'),
      outline: cs.outlineStyle === 'none' ? 0 : parseFloat(cs.outlineWidth) + parseFloat(cs.outlineOffset),
      left: b.left, top: b.top, right: b.right, bottom: b.bottom,
    };
  });
}

for (const path of ['css-anchor', 'js-fallback'] as const) {
  test.describe(`A Menu with more items than fit on screen (${path})`, () => {
    const VIEWPORT_HEIGHT = 420;

    test.beforeEach(async ({ page, testPage }) => {
      await page.setViewportSize({ width: 1280, height: VIEWPORT_HEIGHT });
      if (path === 'js-fallback') {
        await forceJsPositioning(page);
        await page.goto(testPage);
        await page.waitForSelector(T('overlay-behavior-section'));
      }
    });

    test('stays inside the viewport, scrolls, and keeps the focused item in view', async ({ page }) => {
      const trigger = page.locator(T('ob-tall-trigger'));
      const menu = page.locator(T('ob-tall-menu'));
      await moveToViewportY(trigger, 60);
      await openMenuWithKeyboard(page, trigger, menu);

      // under the trigger, ending at or before the bottom edge of the viewport
      const anchor = await rectOf(trigger);
      const m = await rectOf(menu);
      expect(m.top).toBeGreaterThanOrEqual(anchor.bottom);
      expect(m.bottom).toBeLessThanOrEqual(VIEWPORT_HEIGHT + 0.5);
      // it uses the room it has: no more than a pixel is left under it
      expect(VIEWPORT_HEIGHT - m.bottom).toBeLessThanOrEqual(1);

      const box = await scrollBoxOf(menu);
      expect(box.scrollHeight).toBeGreaterThan(box.clientHeight);

      await expect(page.locator(T('ob-tall-item-0'))).toBeFocused();
      await expect(page.locator(T('ob-tall-item-0'))).toBeInViewport({ ratio: 1 });
      await expect(page.locator(T('ob-tall-item-39'))).not.toBeInViewport();
      // the focused item is the one tab stop inside the scroll box
      await expect(page.locator(T('ob-tall-item-0'))).toHaveAttribute('tabindex', '0');
      await expect(menu.locator('[data-menu-item][tabindex="0"]')).toHaveCount(1);

      // End moves focus to the last item, which scrolls into view with its whole focus outline
      await page.keyboard.press('End');
      await expect(page.locator(T('ob-tall-item-39'))).toBeFocused();
      await expect(page.locator(T('ob-tall-item-39'))).toBeInViewport({ ratio: 1 });
      await expect(page.locator(T('ob-tall-item-39'))).toHaveAttribute('tabindex', '0');
      await expect(menu.locator('[data-menu-item][tabindex="0"]')).toHaveCount(1);
      const last = await focusedItem(page);
      const atEnd = await scrollBoxOf(menu);
      expect(last.outline).toBeGreaterThan(0);
      expect(atEnd.bottom - last.bottom).toBeGreaterThanOrEqual(last.outline);
      expect(last.left - atEnd.left).toBeGreaterThanOrEqual(last.outline);
      expect(atEnd.right - last.right).toBeGreaterThanOrEqual(last.outline);

      // one step up from the last item, then back to the first
      await page.keyboard.press('ArrowUp');
      await expect(page.locator(T('ob-tall-item-38'))).toBeFocused();
      await page.keyboard.press('Home');
      await expect(page.locator(T('ob-tall-item-0'))).toBeInViewport({ ratio: 1 });
      const first = await focusedItem(page);
      const atStart = await scrollBoxOf(menu);
      expect(first.top - atStart.top).toBeGreaterThanOrEqual(first.outline);

      // the menu itself did not move while its content scrolled
      const after = await rectOf(menu);
      expect(Math.abs(after.top - m.top)).toBeLessThanOrEqual(0.5);
      expect(Math.abs(after.bottom - m.bottom)).toBeLessThanOrEqual(0.5);
    });

    test('opens above the trigger when there is more room there', async ({ page }) => {
      const trigger = page.locator(T('ob-tall-trigger'));
      const menu = page.locator(T('ob-tall-menu'));
      await moveToViewportY(trigger, 300);
      await openMenuWithKeyboard(page, trigger, menu);

      const anchor = await rectOf(trigger);
      const m = await rectOf(menu);
      expect(m.bottom).toBeLessThanOrEqual(anchor.top);
      expect(m.top).toBeGreaterThanOrEqual(-0.5);
      expect(m.top).toBeLessThanOrEqual(1);
      await expect(menu).toHaveAttribute('data-placement', 'top-start');

      await page.keyboard.press('End');
      await expect(page.locator(T('ob-tall-item-39'))).toBeInViewport({ ratio: 1 });
    });

    test('scrolling with the wheel does not move focus or the menu', async ({ page }) => {
      const trigger = page.locator(T('ob-tall-trigger'));
      const menu = page.locator(T('ob-tall-menu'));
      await moveToViewportY(trigger, 60);
      await openMenuWithKeyboard(page, trigger, menu);
      const m = await rectOf(menu);
      const pageScroll = await page.evaluate(() => window.scrollY);

      // the pointer rests on an item at the lower edge while the list scrolls under it
      await page.mouse.move(m.left + m.width / 2, m.bottom - 12);
      await page.mouse.wheel(0, 300);
      await expect.poll(async () => (await scrollBoxOf(menu)).scrollTop).toBeGreaterThanOrEqual(300);
      await page.waitForTimeout(150);

      // hovering focuses an item without scrolling to it, so the list rests where the wheel left it
      expect((await scrollBoxOf(menu)).scrollTop).toBeLessThanOrEqual(301);
      expect(await page.evaluate(() => window.scrollY)).toBe(pageScroll);
      expect(Math.abs((await rectOf(menu)).top - m.top)).toBeLessThanOrEqual(0.5);
    });

    test('with clampHeight the items stay inside the clamped box', async ({ page }) => {
      // a tall window, so the size cap is what limits the menu, not the room on screen
      await page.setViewportSize({ width: 1280, height: 900 });
      const trigger = page.locator(T('ob-clamp-trigger'));
      const menu = page.locator(T('ob-clamp-menu'));
      await moveToViewportY(trigger, 60);
      await openMenuWithKeyboard(page, trigger, menu);

      const m = await rectOf(menu);
      const maxHeight = await menu.evaluate((el) => parseFloat(getComputedStyle(el).maxHeight));
      expect(maxHeight).toBeGreaterThan(0);
      expect(m.height).toBeLessThanOrEqual(maxHeight + 0.5);
      expect(m.height).toBeGreaterThanOrEqual(maxHeight - 0.5);

      const box = await scrollBoxOf(menu);
      expect(box.scrollHeight).toBeGreaterThan(box.clientHeight);
      await expect(page.locator(T('ob-clamp-item-39'))).not.toBeInViewport();

      await page.keyboard.press('End');
      await expect(page.locator(T('ob-clamp-item-39'))).toBeFocused();
      const last = await focusedItem(page);
      expect(last.bottom).toBeLessThanOrEqual(m.bottom);
      expect(last.top).toBeGreaterThanOrEqual(m.top);
      await expect(page.locator(T('ob-clamp-item-39'))).toBeInViewport({ ratio: 1 });
    });

    test('a menu that fits is not capped: no scrolling, items where the padding puts them', async ({ page }) => {
      const trigger = page.locator(T('ob-short-trigger'));
      const menu = page.locator(T('ob-short-menu'));
      await moveToViewportY(trigger, 60);
      await openMenuWithKeyboard(page, trigger, menu);

      const box = await scrollBoxOf(menu);
      expect(box.scrollHeight).toBe(box.clientHeight);

      // the popup is exactly its items plus its own padding and border
      const m = await rectOf(menu);
      const inset = await menu.evaluate((el) => {
        const cs = getComputedStyle(el);
        return {
          top: parseFloat(cs.paddingTop) + parseFloat(cs.borderTopWidth),
          bottom: parseFloat(cs.paddingBottom) + parseFloat(cs.borderBottomWidth),
          left: parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth),
          right: parseFloat(cs.paddingRight) + parseFloat(cs.borderRightWidth),
        };
      });
      const first = await rectOf(page.locator(T('ob-short-item-0')));
      const last = await rectOf(page.locator(T('ob-short-item-2')));
      expect(Math.abs(first.top - (m.top + inset.top))).toBeLessThanOrEqual(0.5);
      expect(Math.abs(first.left - (m.left + inset.left))).toBeLessThanOrEqual(0.5);
      expect(Math.abs(first.right - (m.right - inset.right))).toBeLessThanOrEqual(0.5);
      expect(Math.abs(last.bottom - (m.bottom - inset.bottom))).toBeLessThanOrEqual(0.5);
      expect(Math.abs(m.height - (last.bottom - first.top + inset.top + inset.bottom))).toBeLessThanOrEqual(0.5);
    });
  });

  test.describe(`Two popups on one anchor (${path})`, () => {
    test.beforeEach(async ({ page, testPage }) => {
      if (path === 'js-fallback') {
        await forceJsPositioning(page);
        await page.goto(testPage);
        await page.waitForSelector(T('overlay-behavior-section'));
      }
    });

    test('a Menu stays attached to its trigger after the trigger\'s Tooltip closes', async ({ page }) => {
      const trigger = page.locator(T('ob-anchor-trigger'));
      const menu = page.locator(T('ob-anchor-menu'));
      const tooltip = page.locator(T('ob-anchor-tooltip'));
      await trigger.scrollIntoViewIfNeeded();

      await trigger.hover();
      await expect(tooltip).toBeVisible();
      const anchor = await rectOf(trigger);

      // opening the menu moves focus into it, which closes the tooltip; both popups share the anchor meanwhile
      await trigger.click();
      await expect(menu).toHaveAttribute('data-state', 'entered');
      await expect(tooltip).toHaveCount(0);

      // bottom-start: still under the trigger with start edges aligned, not dropped to the page corner
      const m = await rectOf(menu);
      expect(Math.abs(m.left - anchor.left)).toBeLessThanOrEqual(1);
      expect(m.top).toBeGreaterThanOrEqual(anchor.bottom);
      expect(m.top - anchor.bottom).toBeLessThanOrEqual(8);
      await expect(page.locator(T('ob-anchor-item'))).toBeVisible();
    });
  });
}
