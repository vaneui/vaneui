import { test, expect } from './base';

// Label/List/ListItem are text components: applying an appearance (e.g.
// `tertiary`) colors the text only and must not paint a background box. Label
// has no background mapper at all; List and ListItem default to `transparent`.

/** Computed background-color of an element */
async function getBgColor(page: import('@playwright/test').Page, testId: string): Promise<string> {
  return page.locator(`[data-testid="${testId}"]`).evaluate(
    (el) => getComputedStyle(el).getPropertyValue('background-color'),
  );
}

const TRANSPARENT = 'rgba(0, 0, 0, 0)';

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid]');
});

test.describe('Label appearance background', () => {
  test('outline tertiary Label has transparent background', async ({ page }) => {
    expect(await getBgColor(page, 'label-outline-tertiary')).toBe(TRANSPARENT);
  });

  test('filled Label still has transparent background (labels never fill)', async ({ page }) => {
    expect(await getBgColor(page, 'label-filled-success')).toBe(TRANSPARENT);
  });
});

test.describe('List appearance background', () => {
  test('tertiary List has transparent background (colors text only)', async ({ page }) => {
    expect(await getBgColor(page, 'list-outline-tertiary')).toBe(TRANSPARENT);
  });
});

test.describe('ListItem appearance background', () => {
  test('tertiary ListItem has transparent background (colors text only)', async ({ page }) => {
    expect(await getBgColor(page, 'list-item-outline-tertiary')).toBe(TRANSPARENT);
  });
});
