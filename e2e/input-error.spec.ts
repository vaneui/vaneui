import { test, expect, getStyle } from './base';

// A5: an error-state input shows a non-color cue (alert icon via background
// image), not just the red border (SC 1.4.1), and is marked aria-invalid.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="err-input"]');
});

test.describe('Error input cue (A5)', () => {
  test('shows an alert icon (background image) the normal input lacks', async ({ page }) => {
    const err = await getStyle(page.locator('[data-testid="err-input"]'), 'background-image');
    const ok = await getStyle(page.locator('[data-testid="ok-input"]'), 'background-image');
    expect(err).toContain('svg');
    expect(ok).toBe('none');
  });

  test('error input is marked aria-invalid', async ({ page }) => {
    await expect(page.locator('[data-testid="err-input"]')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('[data-testid="ok-input"]')).not.toHaveAttribute('aria-invalid');
  });
});
