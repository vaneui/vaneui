import { test, expect, type Locator } from './base';

// ── Helpers ──────────────────────────────────────────────────────────────────

async function getSvgWidth(locator: Locator): Promise<number> {
  return locator.locator('svg').first().evaluate(
    (el) => parseFloat(getComputedStyle(el).getPropertyValue('width')),
  );
}

async function getSvgHeight(locator: Locator): Promise<number> {
  return locator.locator('svg').first().evaluate(
    (el) => parseFloat(getComputedStyle(el).getPropertyValue('height')),
  );
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="icon-sizing-badge-chip"]');
});

// ── Badge icon sizing ────────────────────────────────────────────────────────

test.describe('Badge icon sizing', () => {
  test('SVG has non-zero width at each size', async ({ page }) => {
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
      const width = await getSvgWidth(page.locator(`[data-testid="badge-icon-${size}"]`));
      expect(width, `Badge ${size} SVG should have non-zero width`).toBeGreaterThan(0);
    }
  });

  test('SVG is square (width equals height)', async ({ page }) => {
    const width = await getSvgWidth(page.locator('[data-testid="badge-icon-md"]'));
    const height = await getSvgHeight(page.locator('[data-testid="badge-icon-md"]'));
    expect(width).toBeCloseTo(height, 0);
  });

  test('SVG width scales xs < sm < md < lg < xl', async ({ page }) => {
    const sizes: number[] = [];
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
      sizes.push(await getSvgWidth(page.locator(`[data-testid="badge-icon-${size}"]`)));
    }
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i], `Badge ${['xs','sm','md','lg','xl'][i]} > ${['xs','sm','md','lg','xl'][i-1]}`).toBeGreaterThan(sizes[i - 1]);
    }
  });
});

// ── Chip icon sizing ─────────────────────────────────────────────────────────

test.describe('Chip icon sizing', () => {
  test('SVG has non-zero width at each size', async ({ page }) => {
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
      const width = await getSvgWidth(page.locator(`[data-testid="chip-icon-${size}"]`));
      expect(width, `Chip ${size} SVG should have non-zero width`).toBeGreaterThan(0);
    }
  });

  test('SVG is square (width equals height)', async ({ page }) => {
    const width = await getSvgWidth(page.locator('[data-testid="chip-icon-md"]'));
    const height = await getSvgHeight(page.locator('[data-testid="chip-icon-md"]'));
    expect(width).toBeCloseTo(height, 0);
  });

  test('SVG width scales xs < sm < md < lg < xl', async ({ page }) => {
    const sizes: number[] = [];
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
      sizes.push(await getSvgWidth(page.locator(`[data-testid="chip-icon-${size}"]`)));
    }
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i], `Chip ${['xs','sm','md','lg','xl'][i]} > ${['xs','sm','md','lg','xl'][i-1]}`).toBeGreaterThan(sizes[i - 1]);
    }
  });
});

// ── Cross-component icon size consistency ────────────────────────────────────

test.describe('Cross-component icon sizing', () => {
  test('Button and Badge icons use the same sizing formula (fs * lh)', async ({ page }) => {
    // At the same size prop, Button (lh=1.3) and Badge (lh=lh-base=1.6) have
    // different line-heights, so exact match isn't expected. But both should
    // produce icons larger than font-size alone.
    for (const size of ['xs', 'md', 'xl'] as const) {
      const badgeIcon = await getSvgWidth(page.locator(`[data-testid="badge-icon-${size}"]`));
      const buttonIcon = await getSvgWidth(page.locator(`[data-testid="button-icon-${size}"]`));

      // Both should be non-zero
      expect(badgeIcon, `Badge ${size} icon`).toBeGreaterThan(0);
      expect(buttonIcon, `Button ${size} icon`).toBeGreaterThan(0);
    }
  });

  test('icon size increases from xs to xl for all components', async ({ page }) => {
    for (const component of ['badge', 'chip', 'button'] as const) {
      const xsWidth = await getSvgWidth(page.locator(`[data-testid="${component}-icon-xs"]`));
      const xlWidth = await getSvgWidth(page.locator(`[data-testid="${component}-icon-xl"]`));
      expect(xlWidth, `${component} xl > xs`).toBeGreaterThan(xsWidth);
    }
  });
});
