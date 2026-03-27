import { test, expect, type Locator } from './base';

// ── Helpers ──────────────────────────────────────────────────────────────────

async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

async function getBorderColor(locator: Locator): Promise<string> {
  return getStyle(locator, 'border-color');
}

async function getBgColor(locator: Locator): Promise<string> {
  return getStyle(locator, 'background-color');
}

/** Check if a color is "visible" (not transparent, not fully transparent) */
function isVisible(color: string): boolean {
  if (color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return false;
  // Check for rgba with 0 alpha
  const rgbaMatch = color.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/);
  if (rgbaMatch && parseFloat(rgbaMatch[1]) === 0) return false;
  return true;
}

/** Check if a background is white or near-white */
function isWhiteish(color: string): boolean {
  // rgb(255, 255, 255) or close
  const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return false;
  return parseInt(match[1]) > 240 && parseInt(match[2]) > 240 && parseInt(match[3]) > 240;
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="checkbox-section"]');
});

test.describe('Checkbox: unchecked border visibility', () => {
  test('default unchecked checkbox has a visible border color', async ({ page }) => {
    const input = page.locator('[data-testid="checkbox-default"]');
    const borderColor = await getBorderColor(input);
    expect(isVisible(borderColor)).toBe(true);
  });

  test('filled primary unchecked checkbox has visible border', async ({ page }) => {
    const input = page.locator('[data-testid="checkbox-primary"]');
    const borderColor = await getBorderColor(input);
    expect(isVisible(borderColor)).toBe(true);
  });

  test('filled success unchecked checkbox has visible border', async ({ page }) => {
    const input = page.locator('[data-testid="checkbox-success"]');
    const borderColor = await getBorderColor(input);
    expect(isVisible(borderColor)).toBe(true);
  });

  test('filled danger unchecked checkbox has visible border', async ({ page }) => {
    const input = page.locator('[data-testid="checkbox-danger"]');
    const borderColor = await getBorderColor(input);
    expect(isVisible(borderColor)).toBe(true);
  });

  test('outline unchecked checkbox has visible border', async ({ page }) => {
    const input = page.locator('[data-testid="checkbox-outline"]');
    const borderColor = await getBorderColor(input);
    expect(isVisible(borderColor)).toBe(true);
  });
});

test.describe('Checkbox: unchecked background', () => {
  test('unchecked checkbox has white/light background', async ({ page }) => {
    const input = page.locator('[data-testid="checkbox-default"]');
    const bgColor = await getBgColor(input);
    expect(isWhiteish(bgColor)).toBe(true);
  });

  test('outline unchecked checkbox has white/light background', async ({ page }) => {
    const input = page.locator('[data-testid="checkbox-outline"]');
    const bgColor = await getBgColor(input);
    expect(isWhiteish(bgColor)).toBe(true);
  });
});

test.describe('Checkbox: checked state', () => {
  test('filled checked checkbox has colored (non-white) background', async ({ page }) => {
    const input = page.locator('[data-testid="checkbox-checked-filled"]');
    const bgColor = await getBgColor(input);
    // Checked filled should NOT be white — it should fill with the appearance color
    expect(isWhiteish(bgColor)).toBe(false);
    expect(isVisible(bgColor)).toBe(true);
  });

  test('outline checked checkbox has colored border', async ({ page }) => {
    const input = page.locator('[data-testid="checkbox-checked-outline"]');
    const borderColor = await getBorderColor(input);
    expect(isVisible(borderColor)).toBe(true);
  });
});

test.describe('Checkbox: visibility on dark backgrounds', () => {
  test('checkbox inside filled primary Card has visible border', async ({ page }) => {
    const input = page.locator('[data-testid="checkbox-on-dark"]');
    const borderColor = await getBorderColor(input);
    expect(isVisible(borderColor)).toBe(true);
  });

  test('checkbox inside filled primary Card has white background', async ({ page }) => {
    const input = page.locator('[data-testid="checkbox-on-dark"]');
    const bgColor = await getBgColor(input);
    expect(isWhiteish(bgColor)).toBe(true);
  });
});
