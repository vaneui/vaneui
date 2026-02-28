import { test, expect, type Locator } from '@playwright/test';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get the first SVG's computed width inside a locator */
async function getSvgWidth(locator: Locator): Promise<string> {
  return locator.locator('svg').first().evaluate(
    (el) => getComputedStyle(el).getPropertyValue('width'),
  );
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page }) => {
  await page.goto('/test.html');
  await page.waitForSelector('[data-testid]');
});

// ── NavLink icon sizing ──

test.describe('NavLink icon sizing', () => {
  test('SVG width is non-zero at each size', async ({ page }) => {
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
      const width = await getSvgWidth(page.locator(`[data-testid="navlink-icon-${size}"]`));
      expect(parseFloat(width), `NavLink ${size} SVG should have non-zero width`).toBeGreaterThan(0);
    }
  });

  test('SVG width scales xs < md < xl', async ({ page }) => {
    const xsWidth = parseFloat(await getSvgWidth(page.locator('[data-testid="navlink-icon-xs"]')));
    const mdWidth = parseFloat(await getSvgWidth(page.locator('[data-testid="navlink-icon-md"]')));
    const xlWidth = parseFloat(await getSvgWidth(page.locator('[data-testid="navlink-icon-xl"]')));

    expect(mdWidth).toBeGreaterThan(xsWidth);
    expect(xlWidth).toBeGreaterThan(mdWidth);
  });
});

// ── MenuItem icon sizing ──

test.describe('MenuItem icon sizing', () => {
  test('SVG width is non-zero at each size', async ({ page }) => {
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
      const width = await getSvgWidth(page.locator(`[data-testid="menu-item-icon-${size}"]`));
      expect(parseFloat(width), `MenuItem ${size} SVG should have non-zero width`).toBeGreaterThan(0);
    }
  });

  test('SVG width scales xs < md < xl', async ({ page }) => {
    const xsWidth = parseFloat(await getSvgWidth(page.locator('[data-testid="menu-item-icon-xs"]')));
    const mdWidth = parseFloat(await getSvgWidth(page.locator('[data-testid="menu-item-icon-md"]')));
    const xlWidth = parseFloat(await getSvgWidth(page.locator('[data-testid="menu-item-icon-xl"]')));

    expect(mdWidth).toBeGreaterThan(xsWidth);
    expect(xlWidth).toBeGreaterThan(mdWidth);
  });
});
