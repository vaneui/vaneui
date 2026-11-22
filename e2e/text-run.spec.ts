import { test, expect, getStyle, type Locator, type Page } from './base';

// A boxed label wraps each run of its own text in a span (.vane-text-run) and the stylesheet trims
// that span to the capital height, then pads it back to one line. The capitals end up centered in
// the component and nothing changes size. Every case has a "-plain" twin whose text sits in a span
// of the fixture's own: the component leaves that alone, so the twin is the untrimmed layout.

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const RUN = '.vane-text-run';

type Box = { width: number; height: number; top: number; bottom: number; left: number; right: number };
async function boxOf(loc: Locator): Promise<Box> {
  return loc.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { width: r.width, height: r.height, top: r.top, bottom: r.bottom, left: r.left, right: r.right };
  });
}
async function px(loc: Locator, property: string): Promise<number> {
  return parseFloat(await getStyle(loc, property));
}
const byId = (page: Page, id: string) => page.locator(`[data-testid="${id}"]`);

/**
 * Space above the capitals minus space below the baseline, inside `root`. A probe as tall as a
 * capital and standing on the baseline goes into the element that holds the text, is measured and
 * taken out again.
 */
async function capitalOffset(root: Locator, textHolder: string): Promise<number> {
  return root.evaluate((el, selector) => {
    const holder = el.querySelector(selector) as HTMLElement;
    const probe = document.createElement('span');
    probe.style.cssText = 'display:inline-block;width:0;height:1cap;vertical-align:baseline';
    holder.appendChild(probe);
    const box = el.getBoundingClientRect();
    const cap = probe.getBoundingClientRect();
    const result = (cap.top - box.top) - (box.bottom - cap.bottom);
    probe.remove();
    return result;
  }, textHolder);
}

const pairs = [
  ...sizes.map(size => `text-run-button-${size}`),
  'text-run-badge',
  'text-run-chip',
  'text-run-icon-button',
  'text-run-menu-item',
  'text-run-menu-label',
  'text-run-alert',
  'text-run-wrapped',
];

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="text-run-section"]');
  // the rule sits in an @supports block: a browser without text-box keeps the old layout
  const supported = await page.evaluate(() => CSS.supports('text-box', 'trim-both cap alphabetic'));
  test.skip(!supported, 'this browser has no text-box');
});

test.describe('Text run', () => {
  for (const id of pairs) {
    test(`${id} trims its text and pads it back to a line`, async ({ page }) => {
      const run = byId(page, id).locator(RUN);
      await expect(run).toHaveCount(1);
      expect(await getStyle(run, 'text-box-trim')).toBe('trim-both');
      expect(await getStyle(run, 'text-box-edge')).toBe('cap alphabetic');
      const top = await px(run, 'padding-top');
      const bottom = await px(run, 'padding-bottom');
      expect(top).toBeGreaterThan(0);
      expect(top).toBeCloseTo(bottom, 2);
    });

    test(`${id} is the size of its untrimmed twin`, async ({ page }) => {
      const trimmed = await boxOf(byId(page, id));
      const plain = await boxOf(byId(page, `${id}-plain`));
      // One line is the same height to the layout unit: a difference of 1/64px per label adds up in a
      // long menu and moves the end of its scroll range. Several lines keep the rounding of the trim.
      const tolerance = id === 'text-run-wrapped' ? 0.05 : 0;
      expect(Math.abs(trimmed.height - plain.height)).toBeLessThanOrEqual(tolerance);
      expect(Math.abs(trimmed.width - plain.width)).toBeLessThanOrEqual(0.05);
    });

    test(`${id} centers its capitals`, async ({ page }) => {
      if (id === 'text-run-wrapped') return; // several lines: the first line is not the middle
      const trimmed = Math.abs(await capitalOffset(byId(page, id), RUN));
      const plain = Math.abs(await capitalOffset(byId(page, `${id}-plain`), 'span'));
      // the padding is the same above and below, so only sub-pixel rounding is left
      expect(trimmed).toBeLessThanOrEqual(0.5);
      expect(trimmed).toBeLessThanOrEqual(plain + 0.05);
    });
  }

  test('the text box of a single line is one line tall', async ({ page }) => {
    for (const size of sizes) {
      const run = byId(page, `text-run-button-${size}`).locator(RUN);
      const plain = byId(page, `text-run-button-${size}-plain`).locator('span');
      expect((await boxOf(run)).height).toBe((await boxOf(plain)).height);
    }
  });

  test('text between two icons keeps the same gap on both sides', async ({ page }) => {
    const button = byId(page, 'text-run-icons');
    await expect(button.locator(RUN)).toHaveCount(1);
    const [first, second] = [await boxOf(button.locator('svg').first()), await boxOf(button.locator('svg').last())];
    const run = await boxOf(button.locator(RUN));
    const gap = await px(button, 'column-gap');
    expect(run.left - first.right).toBeCloseTo(gap, 1);
    expect(second.left - run.right).toBeCloseTo(gap, 1);
  });

  test('text and a value next to it share one text box', async ({ page }) => {
    const runs = byId(page, 'text-run-count').locator(RUN);
    await expect(runs).toHaveCount(1);
    await expect(runs).toHaveText('3 items');
  });
});

test.describe('Text run next to scrolling', () => {
  test('NavLink trims its label', async ({ page }) => {
    const label = byId(page, 'text-run-nav-link').locator('.vane-nav-link-label');
    expect(await getStyle(label, 'text-box-trim')).toBe('trim-both');
    expect(Math.abs(await capitalOffset(byId(page, 'text-run-nav-link'), '.vane-nav-link-label'))).toBeLessThanOrEqual(0.5);
  });

  test('a truncated NavLink label keeps its ellipsis and cannot be scrolled', async ({ page }) => {
    const label = byId(page, 'text-run-nav-link-truncated').locator('.vane-nav-link-label');
    // clip, not hidden: a hidden box scrolls for a text search or a selection drag
    expect(await getStyle(label, 'overflow-x')).toBe('clip');
    expect(await getStyle(label, 'overflow-y')).toBe('clip');
    expect(await getStyle(label, 'text-overflow')).toBe('ellipsis');
    expect(await label.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
    const scrolled = await label.evaluate((el) => {
      el.scrollTop = 50;
      el.scrollLeft = 50;
      return [el.scrollTop, el.scrollLeft];
    });
    expect(scrolled).toEqual([0, 0]);
    // the label is one line tall, so tails and accents stay inside the box that clips
    const lineHeight = await px(byId(page, 'text-run-nav-link-truncated'), 'line-height');
    expect(Math.abs((await boxOf(label)).height - lineHeight)).toBeLessThanOrEqual(0.05);
  });

  test('an icon between two pieces of NavLink text stays in place on the label line', async ({ page }) => {
    const link = byId(page, 'text-run-nav-link-inline-icon');
    const label = link.locator('.vane-nav-link-label');
    const icon = label.locator('svg');
    const labelBox = await boxOf(label);
    const iconBox = await boxOf(icon);
    // the icon stays between the words: it used to move after all of the text
    expect(iconBox.left).toBeGreaterThan(labelBox.left + 10);
    expect(iconBox.right).toBeLessThan(labelBox.right - 10);
    // one line: a block-level icon would break the label into three
    expect(Math.abs(labelBox.height - await px(link, 'line-height'))).toBeLessThanOrEqual(0.05);
    expect(iconBox.top).toBeGreaterThanOrEqual(labelBox.top - 1);
    expect(iconBox.bottom).toBeLessThanOrEqual(labelBox.bottom + 1);
    expect(await label.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(false);
  });

  test('a Label keeps its text bare and adds nothing to scroll', async ({ page }) => {
    await expect(byId(page, 'text-run-label').locator(RUN)).toHaveCount(0);
    const box = byId(page, 'text-run-scroll-box');
    expect(await box.evaluate((el) => el.scrollHeight - el.clientHeight)).toBe(0);
  });

  test('a Tooltip trims its text and its scroll box stays still', async ({ page }) => {
    await byId(page, 'tooltip-show').click();
    await byId(page, 'tooltip-section').scrollIntoViewIfNeeded();
    for (const size of sizes) {
      const tooltip = byId(page, `tooltip-${size}`);
      await expect(tooltip).toBeVisible();
      await expect(tooltip.locator(RUN)).toHaveCount(1);
      expect(await getStyle(tooltip.locator(RUN), 'text-box-trim')).toBe('trim-both');
      const scrollBox = tooltip.locator('.vane-popup-scroll');
      // the trimmed line reaches a little past its span; the scroll box holds that room itself
      const scrolled = await scrollBox.evaluate((el) => {
        el.scrollTop = 50;
        return [el.scrollTop, el.scrollHeight - el.clientHeight];
      });
      expect(scrolled).toEqual([0, 0]);
      expect(await px(scrollBox, 'padding-bottom')).toBeCloseTo(-(await px(scrollBox, 'margin-bottom')), 2);
    }
  });
});
