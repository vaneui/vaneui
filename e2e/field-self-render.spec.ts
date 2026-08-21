import { test, expect, getStyle } from './base';

// Computed-style proof that a self-rendered control keeps its own radius/layout, not the wrapper's.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="field-self-render-section"]');
});

test.describe('Field self-rendering', () => {
  test('keeps the control own radius rather than the wrapper sharp default', async ({ page }) => {
    const input = page.getByTestId('field-self-input').locator('input');
    const radius = await getStyle(input, 'border-top-left-radius');
    expect(parseFloat(radius)).toBeGreaterThan(0);
  });

  test('centres an inline checkbox against its label', async ({ page }) => {
    const field = page.getByTestId('field-self-checkbox');
    const box = await field.locator('input').boundingBox();
    const label = await field.locator('label').boundingBox();
    const boxCentre = box!.y + box!.height / 2;
    const labelCentre = label!.y + label!.height / 2;
    // md checkbox vs sm label leaves ~3px drift; a stacked (non-inline) layout drifts 20px+.
    expect(Math.abs(boxCentre - labelCentre)).toBeLessThan(5);
  });
});
