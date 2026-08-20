import { test, expect, getStyle } from './base';

// Label was the only form component without the `disabled` category, so a disabled field
// kept a full-strength label. It now dims both ways: explicitly, and by containing a
// disabled control — the author disables the field, not its label.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="text-appearance-bg-section"]');
});

test.describe('Label disabled', () => {
  test('dims when disabled and stays full strength otherwise', async ({ page }) => {
    expect(await getStyle(page.locator('[data-testid="label-disabled"]'), 'opacity')).toBe('0.5');
    expect(await getStyle(page.locator('[data-testid="label-enabled"]'), 'opacity')).toBe('1');
  });

  test('emits data-disabled without leaking the attribute onto the <label>', async ({ page }) => {
    const label = page.locator('[data-testid="label-disabled"]');
    await expect(label).toHaveAttribute('data-disabled', 'true');
    // <label> has no native disabled attribute; a leaked one is invalid HTML
    expect(await label.evaluate((el) => el.hasAttribute('disabled'))).toBe(false);
  });

  test('follows a disabled control it wraps', async ({ page }) => {
    expect(await getStyle(page.locator('[data-testid="label-has-disabled"]'), 'opacity')).toBe('0.5');
  });

  // 0.5 on the wrapper times 0.5 on the control renders the field at a quarter strength
  test('does not dim the wrapped control a second time', async ({ page }) => {
    const input = page.locator('[data-testid="label-disabled-input"]');
    expect(await getStyle(input, 'opacity')).toBe('1');
    // the control still carries the state, it just does not re-apply the fade
    await expect(input).toHaveAttribute('data-disabled', 'true');
  });

  // Select stacks the same way: an opacity-dimmed wrapper around an opacity-dimmed field
  test('a disabled Select fades once, not twice', async ({ page }) => {
    const field = page.locator('[data-testid="select-disabled"]');
    const wrapper = page.locator('.vane-select-wrapper', { has: field });
    expect(await getStyle(wrapper, 'opacity')).toBe('0.5');
    expect(await getStyle(field, 'opacity')).toBe('1');
  });
});
