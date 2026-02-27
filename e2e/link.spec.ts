import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/test.html');
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
