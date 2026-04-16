import { test, expect, type Locator } from './base';

async function getFontSize(locator: Locator): Promise<number> {
  const fs = await locator.evaluate(
    (el) => getComputedStyle(el).getPropertyValue('font-size'),
  );
  return parseFloat(fs);
}

async function getColor(locator: Locator): Promise<string> {
  return locator.evaluate(
    (el) => getComputedStyle(el).getPropertyValue('color'),
  );
}

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="inherit-size-section"]');
});

test.describe('Font-size inheritance via inheritSize flag', () => {
  test('Link inside Title has same computed font-size as the Title', async ({ page }) => {
    const titleFs = await getFontSize(page.locator('[data-testid="inherit-size-title"]'));
    const linkFs = await getFontSize(page.locator('[data-testid="inherit-size-link"]'));
    expect(linkFs).toBe(titleFs);
  });

  test('Link inside Title keeps link-blue color (different from title)', async ({ page }) => {
    const titleColor = await getColor(page.locator('[data-testid="inherit-size-title"]'));
    const linkColor = await getColor(page.locator('[data-testid="inherit-size-link"]'));
    expect(linkColor).not.toBe(titleColor);
  });

  test('Code inside SectionTitle has same computed font-size', async ({ page }) => {
    const titleFs = await getFontSize(page.locator('[data-testid="inherit-size-section-title"]'));
    const codeFs = await getFontSize(page.locator('[data-testid="inherit-size-code"]'));
    expect(codeFs).toBe(titleFs);
  });
});
