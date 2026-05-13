import { test, expect, type Locator } from './base';

async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

async function getBg(locator: Locator): Promise<string> {
  return getStyle(locator, 'background-color');
}

async function getBorderColor(locator: Locator): Promise<string> {
  return getStyle(locator, 'border-top-color');
}

async function getColor(locator: Locator): Promise<string> {
  return getStyle(locator, 'color');
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="icon-container-section"]');
});

test.describe('Icon container mode — computed styles', () => {
  test('inline Icon inherits parent color (no background paint)', async ({ page }) => {
    const icon = page.locator('[data-testid="icon-inline-inherit"]');

    // Parent wrapper sets color: rgb(255, 0, 0); inline Icon should inherit.
    const color = await getColor(icon);
    expect(color).toBe('rgb(255, 0, 0)');

    // No background painted on inline Icon.
    const bg = await getBg(icon);
    expect(bg).toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
  });

  test('filled primary pill paints the primary background token', async ({ page }) => {
    const icon = page.locator('[data-testid="icon-filled-primary"]');
    const reference = page.locator('[data-testid="icon-bg-reference"]');

    const iconBg = await getBg(icon);
    const refBg = await getBg(reference);

    // Both should resolve to the same primary-filled token; assert non-transparent.
    expect(iconBg).not.toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
    expect(iconBg).toBe(refBg);
  });

  test('bordered primary rounded paints a border color (outline surface, not filled)', async ({ page }) => {
    const icon = page.locator('[data-testid="icon-bordered-primary"]');
    const filled = page.locator('[data-testid="icon-filled-primary"]');

    // Border color must be painted (primary token).
    const borderColor = await getBorderColor(icon);
    expect(borderColor).not.toMatch(/rgba\(0, 0, 0, 0\)|transparent/);

    // Outline variant paints the outline surface, not the filled-primary token.
    // Assert bg differs from the filled-primary icon's bg to prove the variant
    // is "outline" (border-only emphasis), not "filled".
    const bg = await getBg(icon);
    const filledBg = await getBg(filled);
    expect(bg).not.toBe(filledBg);
  });
});
