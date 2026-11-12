import { test, expect } from './base';

// Field wires its own controls. A control the library does not ship takes the same wiring from
// `useFieldControlProps`; the fixture is a plain <input> that spreads the hook's result. The
// browser has to agree that the Field's label, help text and error belong to that input.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="plain-field-input"]');
});

test('the Field label names the plain input and focuses it on click', async ({ page }) => {
  const input = page.locator('[data-testid="plain-field-input"]');
  await expect(input).toHaveAccessibleName('Start date');
  await page.locator('label', { hasText: 'Start date' }).click();
  await expect(input).toBeFocused();
});

test('the Field help text and error describe the plain input, which is invalid', async ({ page }) => {
  const input = page.locator('[data-testid="plain-field-input"]');
  await expect(input).toHaveAccessibleDescription('Any weekday Pick a date');
  await expect(input).toHaveAttribute('aria-invalid', 'true');
});

test('a plain input in a valid Field is named, not invalid and not described', async ({ page }) => {
  const input = page.locator('[data-testid="plain-field-input-valid"]');
  await expect(input).toHaveAccessibleName('End date');
  await expect(input).toHaveAccessibleDescription('');
  await expect(input).not.toHaveAttribute('aria-invalid');
  await expect(input).not.toHaveAttribute('aria-describedby');
});
