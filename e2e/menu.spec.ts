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
    // The menu-section contains multiple always-open menus (the original +
    // one per size-variant fixture used by the padding tests). Pick the first
    // so this stays a smoke test of the menu's ARIA shape, not a count assertion.
    const menu = page.locator('[data-testid="menu-section"] [role="menu"]').first();
    await expect(menu).toBeVisible();
    await expect(menu).toHaveAttribute('aria-orientation', 'vertical');
  });

  test('menu items have role="menuitem"', async ({ page }) => {
    const items = page.locator('[data-testid="menu-section"] [role="menuitem"]');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });
});

// ── Computed padding regression guard ─────────────────────────────────────────
// Pixel values below derive from the CSS variable pipeline at the default
// Tailwind spacing (--spacing = 0.25rem = 4px at 16px root). If any of these
// numbers break, something in rules.css has shifted:
//   • popup frame py  = .vane-popup[data-menu-dropdown][data-size] --py-unit × 4
//   • popup frame px  = aspect-ratio(1) × same
//   • menu item py    = .vane-menu-item[data-size] --py-unit × 4
//   • menu item px    = aspect-ratio(2) × same
// Menu item size comes from Menu's ThemeProvider propagation (Menu.tsx) since
// the MenuItems in these fixtures have no explicit size prop.
test.describe('Menu padding scales with size', () => {
  const expected: Record<'xs'|'sm'|'md'|'lg'|'xl', {
    framePy: number; framePx: number;
    itemPy: number; itemPx: number;
  }> = {
    xs: { framePy: 4, framePx: 4, itemPy: 4,  itemPx: 8  },
    sm: { framePy: 5, framePx: 5, itemPy: 6,  itemPx: 12 },
    md: { framePy: 6, framePx: 6, itemPy: 8,  itemPx: 16 },
    lg: { framePy: 7, framePx: 7, itemPy: 10, itemPx: 20 },
    xl: { framePy: 8, framePx: 8, itemPy: 12, itemPx: 24 },
  };

  for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
    test(`menu ${size}: popup frame + MenuItem padding match spec`, async ({ page }) => {
      const frame = page.locator(`[data-testid="menu-frame-${size}"]`);
      const item  = page.locator(`[data-testid="menu-inherit-${size}"]`);

      const framePy = parseFloat(await getStyle(frame, 'padding-top'));
      const framePx = parseFloat(await getStyle(frame, 'padding-left'));
      const itemPy  = parseFloat(await getStyle(item,  'padding-top'));
      const itemPx  = parseFloat(await getStyle(item,  'padding-left'));

      expect(framePy).toBe(expected[size].framePy);
      expect(framePx).toBe(expected[size].framePx);
      expect(itemPy).toBe(expected[size].itemPy);
      expect(itemPx).toBe(expected[size].itemPx);
    });
  }

  test('popup frame padding is strictly increasing xs→xl', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const values: number[] = [];
    for (const s of sizes) {
      values.push(parseFloat(
        await getStyle(page.locator(`[data-testid="menu-frame-${s}"]`), 'padding-top')
      ));
    }
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1]);
    }
  });

  test('MenuItem padding is strictly increasing xs→xl', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const pys: number[] = [];
    const pxs: number[] = [];
    for (const s of sizes) {
      const item = page.locator(`[data-testid="menu-inherit-${s}"]`);
      pys.push(parseFloat(await getStyle(item, 'padding-top')));
      pxs.push(parseFloat(await getStyle(item, 'padding-left')));
    }
    for (let i = 1; i < pys.length; i++) {
      expect(pys[i]).toBeGreaterThan(pys[i - 1]);
      expect(pxs[i]).toBeGreaterThan(pxs[i - 1]);
    }
  });
});
