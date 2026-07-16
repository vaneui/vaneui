import { test, expect, getStyle, getColor, getFontSize } from './base';

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="table-section"]');
});

test.describe('Table', () => {
  test('Table renders as <table> with border-collapse', async ({ page }) => {
    const el = page.locator('[data-testid="table-el"]');
    expect(await el.evaluate(e => e.tagName.toLowerCase())).toBe('table');
    expect(await getStyle(el, 'border-collapse')).toBe('collapse');
  });

  test('Th renders as <th>, Td renders as <td>', async ({ page }) => {
    const th = page.locator('[data-testid="table-th"]');
    const td = page.locator('[data-testid="table-td"]');
    expect(await th.evaluate(e => e.tagName.toLowerCase())).toBe('th');
    expect(await td.evaluate(e => e.tagName.toLowerCase())).toBe('td');
  });

  test('cells have a 1px bottom row-rule border', async ({ page }) => {
    const th = page.locator('[data-testid="table-th"]');
    const td = page.locator('[data-testid="table-td"]');

    expect(parseFloat(await getStyle(th, 'border-bottom-width'))).toBe(1);
    expect(await getStyle(th, 'border-bottom-style')).toBe('solid');
    expect(parseFloat(await getStyle(td, 'border-bottom-width'))).toBe(1);
    expect(await getStyle(td, 'border-bottom-style')).toBe('solid');
  });

  test('header cell is semibold (font-weight >= 600)', async ({ page }) => {
    const th = page.locator('[data-testid="table-th"]');
    const weight = parseInt(await getStyle(th, 'font-weight'), 10);
    expect(weight).toBeGreaterThanOrEqual(600);
  });

  test('body cell keeps normal weight (lighter than the header)', async ({ page }) => {
    const th = parseInt(await getStyle(page.locator('[data-testid="table-th"]'), 'font-weight'), 10);
    const td = parseInt(await getStyle(page.locator('[data-testid="table-td"]'), 'font-weight'), 10);
    expect(td).toBeLessThan(th);
  });

  test('cell padding grows strictly from xs to xl', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const paddings: number[] = [];
    for (const size of sizes) {
      paddings.push(parseFloat(await getStyle(page.locator(`[data-testid="table-cell-${size}"]`), 'padding-top')));
    }
    for (let i = 1; i < paddings.length; i++) {
      expect(paddings[i]).toBeGreaterThan(paddings[i - 1]);
    }
  });

  test('cell font-size grows strictly from xs to xl', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const fontSizes: number[] = [];
    for (const size of sizes) {
      fontSizes.push(await getFontSize(page.locator(`[data-testid="table-cell-${size}"]`)));
    }
    for (let i = 1; i < fontSizes.length; i++) {
      expect(fontSizes[i]).toBeGreaterThan(fontSizes[i - 1]);
    }
  });

  test('muted header color differs from the default body cell color', async ({ page }) => {
    const headerColor = await getColor(page.locator('[data-testid="table-th"]'));
    const bodyColor = await getColor(page.locator('[data-testid="table-td"]'));
    expect(headerColor).not.toBe(bodyColor);
  });
});
