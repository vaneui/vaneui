import { test, expect, getStyle, getFontSize, getBg, getColor, type Locator, type Page } from './base';

// Tooltip is a label, not a panel: its text, padding and radius follow its own size (one font step under
// a Button of the same size, Button's padding ramp), it does not shrink with the viewport, long hints wrap
// inside a width cap, it stays on screen next to an anchor at the viewport edge, and it is filled in ink.

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

type Rect = { left: number; top: number; right: number; bottom: number; width: number; height: number };
async function rectOf(loc: Locator): Promise<Rect> {
  return loc.evaluate((el) => {
    const b = el.getBoundingClientRect();
    return { left: b.left, top: b.top, right: b.right, bottom: b.bottom, width: b.width, height: b.height };
  });
}
async function settle(page: Page) {
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null)))));
  await page.waitForTimeout(50);
}
async function px(loc: Locator, property: string): Promise<number> {
  return parseFloat(await getStyle(loc, property));
}

test.beforeEach(async ({ page, testPage }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(testPage);
  await page.locator('[data-testid="tooltip-show"]').click();
  await page.locator('[data-testid="tooltip-section"]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-testid="tooltip-sm"]')).toBeVisible();
  await settle(page);
});

test.describe('Tooltip label scale', () => {
  test('text grows from xs to xl and sits one step under a Button of the same size', async ({ page }) => {
    const fontSizes: number[] = [];
    for (const size of sizes) {
      const tooltipFs = await getFontSize(page.locator(`[data-testid="tooltip-${size}"]`));
      const buttonFs = await getFontSize(page.locator(`[data-testid="tooltip-button-${size}"]`));
      expect(tooltipFs).toBeLessThan(buttonFs);
      fontSizes.push(tooltipFs);
    }
    for (let i = 1; i < fontSizes.length; i++) {
      expect(fontSizes[i]).toBeGreaterThan(fontSizes[i - 1]);
    }
  });

  test('padding and radius grow with size, padding twice as wide as tall', async ({ page }) => {
    const pads: number[] = [];
    const radii: number[] = [];
    for (const size of sizes) {
      const tooltip = page.locator(`[data-testid="tooltip-${size}"]`);
      const py = await px(tooltip, 'padding-top');
      expect(await px(tooltip, 'padding-left')).toBeCloseTo(py * 2, 1);
      pads.push(py);
      radii.push(await px(tooltip, 'border-top-left-radius'));
    }
    for (let i = 1; i < sizes.length; i++) {
      expect(pads[i]).toBeGreaterThan(pads[i - 1]);
      expect(radii[i]).toBeGreaterThan(radii[i - 1]);
    }
  });

  test('a one-line tooltip is about as tall as a Button of the same size', async ({ page }) => {
    for (const size of sizes) {
      const tooltip = await rectOf(page.locator(`[data-testid="tooltip-${size}"]`));
      const button = await rectOf(page.locator(`[data-testid="tooltip-button-${size}"]`));
      expect(Math.abs(tooltip.height - button.height)).toBeLessThanOrEqual(3);
    }
  });

  test('padding does not shrink on a phone', async ({ page }) => {
    const tooltip = page.locator('[data-testid="tooltip-sm"]');
    const desktop = await px(tooltip, 'padding-top');
    await page.setViewportSize({ width: 375, height: 800 });
    await settle(page);
    expect(await px(tooltip, 'padding-top')).toBe(desktop);
  });

  test('other popups keep inheriting their text from the page', async ({ page }) => {
    const popup = page.locator('[data-testid="arrow-flip-popup"]');
    const body = page.locator('body');
    expect(await getStyle(popup, 'font-size')).toBe(await getStyle(body, 'font-size'));
    expect(await getStyle(popup, 'line-height')).toBe(await getStyle(body, 'line-height'));
  });
});

test.describe('Tooltip width and screen edges', () => {
  test('a long hint wraps inside the width cap', async ({ page }) => {
    const tooltip = page.locator('[data-testid="tooltip-long"]');
    const box = await rectOf(tooltip);
    const lineHeight = await px(tooltip, 'line-height');
    // sm caps at 20rem
    expect(box.width).toBeLessThanOrEqual(321);
    expect(box.height).toBeGreaterThan(lineHeight * 2);
  });

  test('a tooltip on an anchor at the left edge stays on screen', async ({ page }) => {
    const tooltip = page.locator('[data-testid="tooltip-edge-left"]');
    const anchor = await rectOf(page.locator('[data-testid="tooltip-edge-left-anchor"]'));
    const box = await rectOf(tooltip);
    expect(box.left).toBeGreaterThanOrEqual(0);
    // still above its anchor
    expect(box.bottom).toBeLessThanOrEqual(anchor.top + 1);
    // edge-aligned with the anchor, so the arrow moves with it
    await expect.poll(async () => tooltip.getAttribute('data-placement')).toBe('top-start');
  });

  test('a tooltip on an anchor at the right edge stays on screen', async ({ page }) => {
    const tooltip = page.locator('[data-testid="tooltip-edge-right"]');
    const anchor = await rectOf(page.locator('[data-testid="tooltip-edge-right-anchor"]'));
    const box = await rectOf(tooltip);
    const vw = await page.evaluate(() => window.innerWidth);
    expect(box.right).toBeLessThanOrEqual(vw);
    expect(box.bottom).toBeLessThanOrEqual(anchor.top + 1);
    await expect.poll(async () => tooltip.getAttribute('data-placement')).toBe('top-end');
  });
});

test.describe('Tooltip colour', () => {
  test('a tooltip is filled in ink, like a filled primary Button', async ({ page }) => {
    const tooltip = page.locator('[data-testid="tooltip-sm"]');
    const ink = page.locator('[data-testid="tooltip-ink-reference"]');
    expect(await getBg(tooltip)).toBe(await getBg(ink));
    expect(await getColor(tooltip)).toBe(await getColor(ink));
  });
});
