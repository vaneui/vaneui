import { test, expect, type Page } from './base';

// B10: desktop-first ramps — full column counts hold at laptop/tablet widths
// (incl. the 1000px case the report flagged), collapsing only on mobile.

async function columnCount(page: Page, testid: string): Promise<number> {
  return page.locator(`[data-testid="${testid}"]`).evaluate((el) => {
    return getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length;
  });
}

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="grid-section"]');
});

test.describe('Grid column counts (B10)', () => {
  test('full column counts at a 1000px laptop width (the reported case)', async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 700 });
    expect(await columnCount(page, 'grid4')).toBe(4);
    expect(await columnCount(page, 'grid6')).toBe(6);
  });

  test('full column counts at 1100px', async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 700 });
    expect(await columnCount(page, 'grid4')).toBe(4);
    expect(await columnCount(page, 'grid6')).toBe(6);
  });

  test('collapses on mobile (≤768px)', async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 700 });
    expect(await columnCount(page, 'grid4')).toBe(2);
    expect(await columnCount(page, 'grid6')).toBe(3);
  });
});
