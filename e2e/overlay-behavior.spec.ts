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

for (const path of ['css-anchor', 'js-fallback'] as const) {
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
