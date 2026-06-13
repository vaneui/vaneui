import { test, expect, getStyle, getBg, getBorderTopColor, getColor } from './base';

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="icon-container-section"]');
});

test.describe('Icon container mode — computed styles', () => {
  test('inline Icon inherits parent color (no background paint)', async ({ page }) => {
    const icon = page.locator('[data-testid="icon-inline-inherit"]');

    // parent wrapper sets color: rgb(255, 0, 0); inline Icon should inherit
    const color = await getColor(icon);
    expect(color).toBe('rgb(255, 0, 0)');

    const bg = await getBg(icon);
    expect(bg).toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
  });

  test('filled primary pill paints the primary background token', async ({ page }) => {
    const icon = page.locator('[data-testid="icon-filled-primary"]');
    const reference = page.locator('[data-testid="icon-bg-reference"]');

    const iconBg = await getBg(icon);
    const refBg = await getBg(reference);

    expect(iconBg).not.toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
    expect(iconBg).toBe(refBg);
  });

  test('bordered primary rounded paints a border color, no background paint', async ({ page }) => {
    const icon = page.locator('[data-testid="icon-bordered-primary"]');

    const borderColor = await getBorderTopColor(icon);
    expect(borderColor).not.toMatch(/rgba\(0, 0, 0, 0\)|transparent/);

    // outline-variant Icons override --bg-color to transparent so bordered Icons stay un-boxed
    const bg = await getBg(icon);
    expect(bg).toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
  });

  test('inline Icon with appearance: bg stays transparent (no surface paint)', async ({ page }) => {
    const icon = page.locator('[data-testid="icon-inline-primary"]');

    const bg = await getBg(icon);
    expect(bg).toMatch(/rgba\(0, 0, 0, 0\)|transparent/);

    const color = await getColor(icon);
    expect(color).not.toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
  });

  test('size scaling: both padding and SVG width strictly increase xs → xl in container mode', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const paddings: number[] = [];
    const iconSizes: number[] = [];
    for (const size of sizes) {
      const container = page.locator(`[data-testid="icon-size-${size}"]`);
      paddings.push(parseFloat(await getStyle(container, 'padding-top')));
      const width = await container.locator('svg').evaluate(el => getComputedStyle(el).getPropertyValue('width'));
      iconSizes.push(parseFloat(width));
    }
    for (let i = 1; i < sizes.length; i++) {
      expect(
        paddings[i],
        `padding for ${sizes[i]} (${paddings[i]}px) should exceed ${sizes[i-1]} (${paddings[i-1]}px)`
      ).toBeGreaterThan(paddings[i - 1]);
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

    // ring compiles to box-shadow
    expect(withRing, `Icon with ring should have a non-empty box-shadow (got "${withRing}")`).not.toBe('none');
    expect(withRing).not.toBe('');
    expect(withRing).not.toBe(noRing);
  });

  test('inline mode: padding is 0 when no padding prop is set', async ({ page }) => {
    const padding = await getStyle(page.locator('[data-testid="icon-inline-inherit"]'), 'padding-top');
    expect(parseFloat(padding)).toBe(0);
  });

  test('shadow: box-shadow differs when shadow prop is set vs not', async ({ page }) => {
    const withShadow = await getStyle(page.locator('[data-testid="icon-with-shadow"]'), 'box-shadow');
    const noShadow = await getStyle(page.locator('[data-testid="icon-no-shadow"]'), 'box-shadow');

    expect(withShadow, `Icon with shadow should have a non-empty box-shadow (got "${withShadow}")`).not.toBe('none');
    expect(withShadow).not.toBe(noShadow);
  });

  test('position: absolute prop sets position: absolute', async ({ page }) => {
    const position = await getStyle(page.locator('[data-testid="icon-absolute"]'), 'position');
    expect(position).toBe('absolute');
  });
});
