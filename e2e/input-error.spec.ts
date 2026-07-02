import { test, expect, getStyle, getSvgWidth } from './base';

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

  test('the error icon is decorative (aria-hidden) and uses the danger color token', async ({ page }) => {
    const icon = page.locator('.vane-input-error-icon').first();
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    // the icon color is text-(--color-text-danger) (svg follows via fill=currentColor):
    // a distinct danger color, NOT the normal input text color — token-driven, not hardcoded
    const iconColor = await getStyle(icon, 'color');
    const normalText = await getStyle(page.locator('[data-testid="ok-input"]'), 'color');
    expect(iconColor).not.toBe(normalText);
  });

  test('error input is marked aria-invalid', async ({ page }) => {
    await expect(page.locator('[data-testid="err-input"]')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('[data-testid="ok-input"]')).not.toHaveAttribute('aria-invalid');
  });

  test('the error icon scales with the input size prop (no fixed size)', async ({ page }) => {
    // the icon svg sizes to h-1/2 of the input-height overlay box, so it scales
    // with the input's size (no per-size CSS block, no fixed value)
    const xsWidth = await getSvgWidth(page.locator('.vane-input-wrapper', { has: page.locator('[data-testid="err-input-xs"]') }));
    const xlWidth = await getSvgWidth(page.locator('.vane-input-wrapper', { has: page.locator('[data-testid="err-input-xl"]') }));
    expect(xlWidth).toBeGreaterThan(xsWidth);
  });
});
