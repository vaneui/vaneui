import { test, expect } from './base';
import type { Page } from '@playwright/test';

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="icon-button-section"]');
});

async function box(page: Page, testid: string): Promise<{ width: number; height: number }> {
  const b = await page.locator(`[data-testid="${testid}"]`).boundingBox();
  return b ?? { width: 0, height: 0 };
}

test.describe('IconButton: square footprint + size scaling', () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  test('each size renders a square (width == height)', async ({ page }) => {
    for (const size of sizes) {
      const b = await box(page, `icon-button-${size}`);
      expect(Math.abs(b.width - b.height)).toBeLessThanOrEqual(1);
    }
  });

  test('heights are strictly increasing xs -> xl', async ({ page }) => {
    const heights: number[] = [];
    for (const size of sizes) heights.push((await box(page, `icon-button-${size}`)).height);
    for (let i = 1; i < heights.length; i++) {
      expect(heights[i]).toBeGreaterThan(heights[i - 1]);
    }
  });
});

test.describe('IconButton vs Button height (xs)', () => {
  // IconButton height is driven by its icon + square constraint, while Button
  // height is driven by its text line-box. They are NOT equal at xs: the
  // icon-only square is shorter than the text button. This test documents the
  // current relationship (see the size investigation report).
  test('iconbutton xs is shorter than a text button xs', async ({ page }) => {
    const ib = await box(page, 'icon-button-xs');
    const btn = await box(page, 'button-xs');
    // eslint-disable-next-line no-console
    console.log(`[height-check] IconButton xs = ${ib.width}x${ib.height}, Button xs = ${btn.width}x${btn.height}`);
    expect(ib.height).toBeGreaterThan(0);
    expect(btn.height).toBeGreaterThan(0);
    expect(ib.height).toBeLessThan(btn.height);
  });
});
