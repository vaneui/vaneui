import { test, expect, getBg, TRANSPARENT } from './base';

// Label/List/ListItem are text components: applying an appearance (e.g.
// `tertiary`) colors the text only and must not paint a background box. Label
// has no background mapper at all; List and ListItem default to `transparent`.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid]');
});

test.describe('Label appearance background', () => {
  test('outline tertiary Label has transparent background', async ({ page }) => {
    expect(await getBg(page.locator('[data-testid="label-outline-tertiary"]'))).toBe(TRANSPARENT);
  });

  test('filled Label still has transparent background (labels never fill)', async ({ page }) => {
    expect(await getBg(page.locator('[data-testid="label-filled-success"]'))).toBe(TRANSPARENT);
  });
});

test.describe('List appearance background', () => {
  test('tertiary List has transparent background (colors text only)', async ({ page }) => {
    expect(await getBg(page.locator('[data-testid="list-outline-tertiary"]'))).toBe(TRANSPARENT);
  });
});

test.describe('ListItem appearance background', () => {
  test('tertiary ListItem has transparent background (colors text only)', async ({ page }) => {
    expect(await getBg(page.locator('[data-testid="list-item-outline-tertiary"]'))).toBe(TRANSPARENT);
  });
});
