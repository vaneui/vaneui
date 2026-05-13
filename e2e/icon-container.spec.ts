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

  test('size scaling: icon-size (SVG width) strictly increases xs → xl in container mode', async ({ page }) => {
    // Note: Icon's CSS rule (.vane-icon[data-size="*"]) only sets --fs-unit
    // per size — it deliberately does NOT set --py-unit per size like Button,
    // Badge, Chip, etc. This is by design: Icon's container padding is a fixed
    // ratio of --spacing (--py-unit stays at the inherited default of 1), and
    // size scales the SVG (via --icon-size = calc(--fs * --lh)) instead of the
    // padding box. So padding-top is identical across sizes; the inner SVG is
    // what visibly scales.
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const iconSizes: number[] = [];
    for (const size of sizes) {
      const svg = page.locator(`[data-testid="icon-size-${size}"] svg`);
      const width = await svg.evaluate(el => getComputedStyle(el).getPropertyValue('width'));
      iconSizes.push(parseFloat(width));
    }
    for (let i = 1; i < iconSizes.length; i++) {
      expect(
        iconSizes[i],
        `icon-size for ${sizes[i]} (${iconSizes[i]}px) should exceed ${sizes[i-1]} (${iconSizes[i-1]}px)`
      ).toBeGreaterThan(iconSizes[i - 1]);
    }
  });

  test('shape: border-radius pill > rounded > sharp at the same size', async ({ page }) => {
    const radii = {
      sharp: parseFloat(await getStyle(page.locator('[data-testid="icon-shape-sharp"]'), 'border-top-left-radius')),
      rounded: parseFloat(await getStyle(page.locator('[data-testid="icon-shape-rounded"]'), 'border-top-left-radius')),
      pill: parseFloat(await getStyle(page.locator('[data-testid="icon-shape-pill"]'), 'border-top-left-radius')),
    };
    expect(radii.sharp, `sharp should be 0 (got ${radii.sharp}px)`).toBe(0);
    expect(radii.rounded, `rounded (${radii.rounded}px) should exceed sharp (${radii.sharp}px)`).toBeGreaterThan(radii.sharp);
    expect(radii.pill, `pill (${radii.pill}px) should exceed rounded (${radii.rounded}px)`).toBeGreaterThan(radii.rounded);
  });

  test('appearance: filled bg differs across primary, danger, success', async ({ page }) => {
    const primary = await getBg(page.locator('[data-testid="icon-filled-primary"]'));
    const danger = await getBg(page.locator('[data-testid="icon-app-danger"]'));
    const success = await getBg(page.locator('[data-testid="icon-app-success"]'));
    // All three should be non-transparent and pairwise distinct.
    for (const [name, color] of [['primary', primary], ['danger', danger], ['success', success]] as const) {
      expect(color, `${name} filled bg should not be transparent`).not.toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
    }
    expect(primary).not.toBe(danger);
    expect(primary).not.toBe(success);
    expect(danger).not.toBe(success);
  });

  test('ring: box-shadow is painted when ring prop is set', async ({ page }) => {
    const withRing = await getStyle(page.locator('[data-testid="icon-with-ring"]'), 'box-shadow');
    const noRing = await getStyle(page.locator('[data-testid="icon-no-ring"]'), 'box-shadow');

    // Ring uses Tailwind's ring-* utility which compiles to box-shadow.
    // With ring: box-shadow is non-empty / non-"none".
    // Without ring: box-shadow is either "none" or empty.
    expect(withRing, `Icon with ring should have a non-empty box-shadow (got "${withRing}")`).not.toBe('none');
    expect(withRing).not.toBe('');
    expect(withRing).not.toBe(noRing);
  });

  test('inline mode: padding is 0 when no padding prop is set', async ({ page }) => {
    const padding = await getStyle(page.locator('[data-testid="icon-inline-inherit"]'), 'padding-top');
    expect(parseFloat(padding)).toBe(0);
  });
});
