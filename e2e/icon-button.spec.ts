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

test.describe('IconButton stays square inside a flex-stretch parent', () => {
  // A flex-column parent with the default align-items: stretch (the docs demo
  // harness shape) would stretch an auto-width IconButton to the full container
  // width. wFit pins the width to fit-content so the button keeps its square
  // footprint at every size instead of rendering as a full-width bar.
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  test('each size renders square (not stretched to the 320px container)', async ({ page }) => {
    for (const size of sizes) {
      const b = await box(page, `icon-button-stretch-${size}`);
      expect(Math.abs(b.width - b.height)).toBeLessThanOrEqual(1);
      // Guard against the regression directly: a stretched button would be ~320px wide.
      expect(b.width).toBeLessThan(200);
    }
  });

  test('stretch-parent footprint matches the normal-flow footprint per size', async ({ page }) => {
    for (const size of sizes) {
      const stretched = await box(page, `icon-button-stretch-${size}`);
      const normal = await box(page, `icon-button-${size}`);
      expect(Math.abs(stretched.width - normal.width)).toBeLessThanOrEqual(1);
      expect(Math.abs(stretched.height - normal.height)).toBeLessThanOrEqual(1);
    }
  });
});

test.describe('IconButton and Button height parity (per size)', () => {
  // Both Button and IconButton pin min-height to the shared --min-h control
  // height, so an icon-only IconButton lines up with a text Button of the same
  // size when mixed in a row. (Before this, IconButton was icon-driven and ran
  // ~0.3*fs shorter than the text-line-driven Button at every size.)
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  test('iconbutton height equals button height at every size', async ({ page }) => {
    for (const size of sizes) {
      const ib = await box(page, `icon-button-${size}`);
      const btn = await box(page, `button-${size}`);
      expect(Math.abs(ib.height - btn.height)).toBeLessThanOrEqual(1);
    }
  });
});
