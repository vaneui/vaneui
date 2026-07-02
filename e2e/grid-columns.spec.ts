import { test, expect, type Page } from './base';

// Desktop-first ramps with a tablet intermediate: grids step down in two stages
// (e.g. Grid6: 6 → 4 → 2) across the desktop / tablet (≤1024px) / mobile (≤768px) tiers.

async function columnCount(page: Page, testid: string): Promise<number> {
  return page.locator(`[data-testid="${testid}"]`).evaluate((el) => {
    return getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length;
  });
}

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="grid-section"]');
});

test.describe('Grid column counts', () => {
  test('full column counts on desktop (>1024px)', async ({ page }) => {
    await page.setViewportSize({ width: 1300, height: 800 });
    expect(await columnCount(page, 'grid4')).toBe(4);
    expect(await columnCount(page, 'grid6')).toBe(6);
  });

  test('intermediate column counts on tablet (≤1024px)', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 700 });
    expect(await columnCount(page, 'grid4')).toBe(3);
    expect(await columnCount(page, 'grid6')).toBe(4);
  });

  test('collapses on mobile (≤768px)', async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 700 });
    expect(await columnCount(page, 'grid4')).toBe(2);
    expect(await columnCount(page, 'grid6')).toBe(2);
  });
});
