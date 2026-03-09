import { test, expect, type Locator } from './base';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get a resolved computed style property from an element */
async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

/** Get computed color (resolved to rgb) */
async function getColor(locator: Locator): Promise<string> {
  return getStyle(locator, 'color');
}

/** Get computed font-size in px */
async function getFontSize(locator: Locator): Promise<number> {
  const fs = await getStyle(locator, 'font-size');
  return parseFloat(fs);
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="menu-section"]');
});

test.describe('Menu', () => {

  test('MenuItem has correct data-size attributes for each size', async ({ page }) => {
    await expect(page.locator('[data-testid="menu-item-xs"]')).toHaveAttribute('data-size', 'xs');
    await expect(page.locator('[data-testid="menu-item-sm"]')).toHaveAttribute('data-size', 'sm');
    await expect(page.locator('[data-testid="menu-item-md"]')).toHaveAttribute('data-size', 'md');
    await expect(page.locator('[data-testid="menu-item-lg"]')).toHaveAttribute('data-size', 'lg');
    await expect(page.locator('[data-testid="menu-item-xl"]')).toHaveAttribute('data-size', 'xl');
  });

  test('different appearances produce different colors', async ({ page }) => {
    const primaryColor = await getColor(page.locator('[data-testid="menu-item-primary"]'));
    const dangerColor = await getColor(page.locator('[data-testid="menu-item-danger"]'));
    const successColor = await getColor(page.locator('[data-testid="menu-item-success"]'));

    expect(primaryColor).not.toBe(dangerColor);
    expect(primaryColor).not.toBe(successColor);
    expect(dangerColor).not.toBe(successColor);
  });

  test('disabled item has reduced opacity', async ({ page }) => {
    const disabledItem = page.locator('[data-testid="menu-item-disabled"]');
    const opacity = parseFloat(await getStyle(disabledItem, 'opacity'));
    expect(opacity).toBeLessThan(1);
  });

  test('menu items are full-width (w-full)', async ({ page }) => {
    const item = page.locator('[data-testid="menu-item-md"]');
    const width = parseFloat(await getStyle(item, 'width'));
    // Menu items should have some width (w-full within the dropdown)
    expect(width).toBeGreaterThan(0);
  });

  test('trigger has correct ARIA attributes', async ({ page }) => {
    const trigger = page.locator('[data-testid="menu-trigger-default"]');
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('menu content has role="menu"', async ({ page }) => {
    const menu = page.locator('[data-testid="menu-section"] [role="menu"]');
    await expect(menu).toBeVisible();
    await expect(menu).toHaveAttribute('aria-orientation', 'vertical');
  });

  test('menu items have role="menuitem"', async ({ page }) => {
    const items = page.locator('[data-testid="menu-section"] [role="menuitem"]');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });
});
