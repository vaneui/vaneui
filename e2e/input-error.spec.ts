import { test, expect, getStyle } from './base';

// A5: an error-state input shows a non-color cue (an alert-icon ELEMENT, not a
// CSS background-image) in addition to the red border (SC 1.4.1), and is marked
// aria-invalid. The icon is the customizable `inputErrorIcon` sub-theme.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="err-input"]');
});

test.describe('Error input cue (A5)', () => {
  test('renders a non-color alert-icon element the normal input lacks', async ({ page }) => {
    // the error input is wrapped so the icon can overlay it; the icon is a real
    // <svg> element, not a background image
    const errWrapper = page.locator('.vane-input-wrapper', { has: page.locator('[data-testid="err-input"]') });
    await expect(errWrapper.locator('.vane-input-error-icon svg')).toBeVisible();

    // the OK input is not wrapped and has no icon
    await expect(
      page.locator('.vane-input-wrapper', { has: page.locator('[data-testid="ok-input"]') })
    ).toHaveCount(0);
  });

  test('the error icon is decorative (aria-hidden) and shares the error color', async ({ page }) => {
    const icon = page.locator('.vane-input-error-icon').first();
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    // the icon color (text-red-500, inherited by the svg via fill=currentColor)
    // matches the input's error border — a cue that tracks the error styling
    // rather than a hardcoded hex
    const iconColor = await getStyle(icon, 'color');
    const borderColor = await getStyle(page.locator('[data-testid="err-input"]'), 'border-top-color');
    expect(iconColor).toBe(borderColor);
  });

  test('error input is marked aria-invalid', async ({ page }) => {
    await expect(page.locator('[data-testid="err-input"]')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('[data-testid="ok-input"]')).not.toHaveAttribute('aria-invalid');
  });
});
