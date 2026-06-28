import { test, expect, getStyle } from './base';

// S5: a read-only input is muted (opacity) so it reads as non-editable, and
// exposes aria-readonly; an editable input is not muted.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="ro-input"]');
});

test.describe('Read-only input (S5)', () => {
  test('is visually muted while the editable input is not', async ({ page }) => {
    const ro = parseFloat(await getStyle(page.locator('[data-testid="ro-input"]'), 'opacity'));
    const rw = parseFloat(await getStyle(page.locator('[data-testid="rw-input"]'), 'opacity'));
    expect(ro).toBeLessThan(1);
    expect(rw).toBe(1);
  });

  test('exposes aria-readonly', async ({ page }) => {
    await expect(page.locator('[data-testid="ro-input"]')).toHaveAttribute('aria-readonly', 'true');
    await expect(page.locator('[data-testid="rw-input"]')).not.toHaveAttribute('aria-readonly');
  });
});
