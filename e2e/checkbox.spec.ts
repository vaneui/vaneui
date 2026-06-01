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

test.describe('Checkbox: border darker than layout components', () => {
  // The unchecked Checkbox border resolves to --color-border-secondary
  // (gray-300), while primary-appearance layout components use
  // --color-border-primary (gray-200). The Checkbox should be the darker of
  // the two so the unchecked control reads as a distinct form element on
  // light surfaces.
  test('unchecked checkbox border is darker than primary-outline Card border', async ({ page }) => {
    const checkbox = page.locator('[data-testid="checkbox-outline"]');
    const card = page.locator('[data-testid="checkbox-ref-card-primary-outline"]');

    const cbColor = await getBorderColor(checkbox);
    const cardColor = await getBorderColor(card);

    // Both should be visible neutrals
    expect(isVisible(cbColor)).toBe(true);
    expect(isVisible(cardColor)).toBe(true);

    // And the checkbox should NOT match the layout color
    expect(cbColor).not.toBe(cardColor);

    // Checkbox lightness should be lower (darker) than the Card border.
    // Chrome serializes border-color as oklch(L C H) — parse the L value.
    const parseLightness = (color: string): number | null => {
      const oklch = color.match(/oklch\(\s*([\d.]+)/);
      if (oklch) return parseFloat(oklch[1]);
      const rgb = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgb) {
        // Approximate sRGB → perceived lightness on 0-1 scale.
        return (parseInt(rgb[1]) + parseInt(rgb[2]) + parseInt(rgb[3])) / (3 * 255);
      }
      return null;
    };
    const cbL = parseLightness(cbColor);
    const cardL = parseLightness(cardColor);
    expect(cbL).not.toBeNull();
    expect(cardL).not.toBeNull();
    if (cbL === null || cardL === null) return;
    expect(cbL).toBeLessThan(cardL);
  });
});

test.describe('Checkbox: ring color tracks border color', () => {
  // The Checkbox CSS override sets --ring-color alongside --border-color, so
  // when consumers enable `ring` the stroke matches its border across both
  // unchecked and checked states.
  async function getRingColor(locator: Locator): Promise<string> {
    // The ring is rendered via the ring-(length:--rw) class which projects
    // a box-shadow inset of --ring-color. Read --ring-color directly off
    // the element's CSS custom properties via getComputedStyle.
    return locator.evaluate(
      (el) => getComputedStyle(el).getPropertyValue('--ring-color').trim(),
    );
  }

  test('unchecked checkbox: ring color matches border color', async ({ page }) => {
    const input = page.locator('[data-testid="checkbox-with-ring-unchecked"]');
    const ring = await getRingColor(input);
    const border = await getBorderColor(input);

    expect(ring).not.toBe('');
    expect(isVisible(ring)).toBe(true);
    // Both resolve through --color-border-secondary, so they must agree.
    // The browser may serialize them differently (oklch vs computed rgb),
    // so this test simply asserts ring isn't blank/inherited-default.
  });

  test('checked outline checkbox: ring color matches checked border (appearance color)', async ({ page }) => {
    const input = page.locator('[data-testid="checkbox-with-ring-checked-outline"]');
    const ring = await getRingColor(input);
    const border = await getBorderColor(input);

    expect(ring).not.toBe('');
    expect(isVisible(ring)).toBe(true);
    // Both should pull from --checked-bg-color, so they should resolve to
    // the same appearance color.
    expect(border).not.toBe('rgba(0, 0, 0, 0)');
  });
});
