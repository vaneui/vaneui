import { test, expect } from './base';

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="link-section"]');
});

test.describe('Link external', () => {
  test('external link has target="_blank" and rel="noopener noreferrer"', async ({ page }) => {
    const link = page.locator('[data-testid="link-external"]');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('normal link has no target or rel attributes', async ({ page }) => {
    const link = page.locator('[data-testid="link-normal"]');
    await expect(link).not.toHaveAttribute('target');
    await expect(link).not.toHaveAttribute('rel');
  });
});
