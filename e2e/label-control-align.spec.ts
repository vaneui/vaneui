import { test, expect } from './base';

// A checkbox inside a Label must stay centered on the FIRST text row, even when
// the label text wraps or stacks across multiple rows. An Input label, by
// contrast, must stay vertically centered. This is driven purely by props: the
// checkbox wrapper defaults to `selfStart` (align-self), the Label keeps
// `itemsCenter`. These tests assert the rendered geometry on the reported
// samples.

/** Vertical center of an element's border box. */
async function centerY(page: import('@playwright/test').Page, testId: string): Promise<number> {
  return page.locator(`[data-testid="${testId}"]`).evaluate((el) => {
    const r = el.getBoundingClientRect();
    return r.top + r.height / 2;
  });
}

/** Vertical center of the FIRST rendered line of an (inline) element's text. */
async function firstLineCenterY(page: import('@playwright/test').Page, testId: string): Promise<number> {
  return page.locator(`[data-testid="${testId}"]`).evaluate((el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const rects = range.getClientRects();
    const first = rects[0];
    return first.top + first.height / 2;
  });
}

// Centered "on the first row" — allow a small drift for font-size mismatches
// between the row text and the checkbox (e.g. md Text beside an sm label).
const ROW_TOLERANCE = 5;
// Centered with a single-line label beside an input — should be near-exact.
const CENTER_TOLERANCE = 3;

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="label-align-section"]');
});

test.describe('Checkbox aligns to the first text row', () => {
  test('sample 1: checkbox centered on first line of wrapping text', async ({ page }) => {
    const checkbox = await centerY(page, 's1-checkbox');
    const firstLine = await firstLineCenterY(page, 's1-text');
    expect(Math.abs(checkbox - firstLine)).toBeLessThanOrEqual(ROW_TOLERANCE);
  });

  test('sample 2: checkbox centered on the first of two stacked rows', async ({ page }) => {
    const checkbox = await centerY(page, 's2-checkbox');
    const firstRow = await centerY(page, 's2-text-first');
    expect(Math.abs(checkbox - firstRow)).toBeLessThanOrEqual(ROW_TOLERANCE);
  });

  test('sample 2: checkbox is NOT centered across both rows (regression guard)', async ({ page }) => {
    // If it were centered across both rows (the bug), its center would sit well
    // below the first row's center — at least ~half a line lower.
    const checkbox = await centerY(page, 's2-checkbox');
    const firstRow = await centerY(page, 's2-text-first');
    expect(checkbox).toBeLessThan(firstRow + ROW_TOLERANCE);
  });
});

test.describe('Input label stays vertically centered', () => {
  test('sample 3: input and its label text share a vertical center', async ({ page }) => {
    const input = await centerY(page, 's3-input');
    const labelText = await centerY(page, 's3-label-text');
    expect(Math.abs(input - labelText)).toBeLessThanOrEqual(CENTER_TOLERANCE);
  });
});
