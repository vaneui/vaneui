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
    // The row now carries the label's own metrics, so this is near-exact; it used to drift ~3px.
    expect(Math.abs(boxCentre - labelCentre)).toBeLessThanOrEqual(1);
  });

  test('centres an inline switch against its label', async ({ page }) => {
    const field = page.getByTestId('field-self-switch');
    const track = await field.locator('input').boundingBox();
    const label = await field.locator('label').boundingBox();
    const trackCentre = track!.y + track!.height / 2;
    const labelCentre = label!.y + label!.height / 2;
    expect(Math.abs(trackCentre - labelCentre)).toBeLessThanOrEqual(1);
  });

  test("sizes the inline control's line box to the label's, not the page root", async ({ page }) => {
    const field = page.getByTestId('field-self-checkbox');
    const wrapper = field.locator('.vane-field-control-row > span').first();
    const label = field.locator('label');
    const wrapperH = (await wrapper.boundingBox())!.height;
    const labelH = (await label.boundingBox())!.height;
    // Resolved against the page root instead, the wrapper would be 16px against a 25.6px label.
    expect(Math.abs(wrapperH - labelH)).toBeLessThanOrEqual(1);
  });

  test('scales the control-row gap with the Field size instead of a fixed 16px', async ({ page }) => {
    const xsRow = page.getByTestId('field-self-checkbox-xs').locator('.vane-field-control-row');
    const xlRow = page.getByTestId('field-self-checkbox-xl').locator('.vane-field-control-row');
    expect(await xsRow.getAttribute('data-size')).toBe('xs');
    expect(await xlRow.getAttribute('data-size')).toBe('xl');
    const xsGap = parseFloat(await getStyle(xsRow, 'column-gap'));
    const xlGap = parseFloat(await getStyle(xlRow, 'column-gap'));
    expect(xsGap).toBeLessThan(xlGap);
    // curve mirrors .vane-field[data-size]: gap-unit 1 (xs) to 2.5 (xl) at --spacing 0.25rem
    expect(xsGap).toBeCloseTo(4, 0);
    expect(xlGap).toBeCloseTo(10, 0);
  });
});

test.describe('Field size reaches every slot', () => {
  test('scales the label and help text with the field', async ({ page }) => {
    const fs = async (testId: string, selector: string) =>
      parseFloat(await getStyle(page.getByTestId(testId).locator(selector), 'font-size'));

    const xsLabel = await fs('field-size-xs', 'label');
    const xlLabel = await fs('field-size-xl', 'label');
    expect(xlLabel).toBeGreaterThan(xsLabel);

    // the label matches its own control, and the help text sits one step below it
    const xlInput = await fs('field-size-xl', 'input');
    expect(xlLabel).toBeCloseTo(xlInput, 1);
    const xlHelp = await fs('field-size-xl', '.vane-field-description');
    expect(xlHelp).toBeLessThan(xlLabel);
    expect(await fs('field-size-xl', '.vane-field-error')).toBeCloseTo(xlHelp, 1);
  });
});

test.describe('Field text on a filled surface', () => {
  test('help and error take the card colour instead of their light-page pins', async ({ page }) => {
    const card = page.getByTestId('field-on-filled-card');
    const label = await getStyle(card.locator('label'), 'color');
    const help = await getStyle(card.locator('.vane-field-description'), 'color');
    const error = await getStyle(card.locator('.vane-field-error'), 'color');
    // all three read off the same filled surface, so they resolve to the card's text colour
    expect(help).toBe(label);
    expect(error).toBe(label);
  });

});
