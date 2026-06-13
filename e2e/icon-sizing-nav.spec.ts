import { test, expect, getSvgWidth } from './base';

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid]');
});

// ── NavLink icon sizing ──

test.describe('NavLink icon sizing', () => {
  test('SVG width is non-zero at each size', async ({ page }) => {
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
      const width = await getSvgWidth(page.locator(`[data-testid="navlink-icon-${size}"]`));
      expect(width, `NavLink ${size} SVG should have non-zero width`).toBeGreaterThan(0);
    }
  });

  test('SVG width scales xs < md < xl', async ({ page }) => {
    const xsWidth = await getSvgWidth(page.locator('[data-testid="navlink-icon-xs"]'));
    const mdWidth = await getSvgWidth(page.locator('[data-testid="navlink-icon-md"]'));
    const xlWidth = await getSvgWidth(page.locator('[data-testid="navlink-icon-xl"]'));

    expect(mdWidth).toBeGreaterThan(xsWidth);
    expect(xlWidth).toBeGreaterThan(mdWidth);
  });
});

// ── MenuItem icon sizing ──

test.describe('MenuItem icon sizing', () => {
  test('SVG width is non-zero at each size', async ({ page }) => {
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
      const width = await getSvgWidth(page.locator(`[data-testid="menu-item-icon-${size}"]`));
      expect(width, `MenuItem ${size} SVG should have non-zero width`).toBeGreaterThan(0);
    }
  });

  test('SVG width scales xs < md < xl', async ({ page }) => {
    const xsWidth = await getSvgWidth(page.locator('[data-testid="menu-item-icon-xs"]'));
    const mdWidth = await getSvgWidth(page.locator('[data-testid="menu-item-icon-md"]'));
    const xlWidth = await getSvgWidth(page.locator('[data-testid="menu-item-icon-xl"]'));

    expect(mdWidth).toBeGreaterThan(xsWidth);
    expect(xlWidth).toBeGreaterThan(mdWidth);
  });
});
