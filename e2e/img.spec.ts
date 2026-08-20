import { test, expect, getStyle } from './base';

// An appearance is only a palette until a variant maps it onto --border-color.
// Img declared the variant category but set no variant default, so it emitted no
// data-variant and every appearance drew the same neutral border. The class list
// is identical either way, which is why only a computed colour catches it.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="img-section"]');
});

test.describe('Img appearance', () => {
  test('paints a different border for each appearance', async ({ page }) => {
    const border = (testid: string) =>
      getStyle(page.locator(`[data-testid="${testid}"]`), 'border-top-color');

    const [base, success, danger] = await Promise.all([
      border('img-default'),
      border('img-success'),
      border('img-danger'),
    ]);

    expect(success).not.toBe(base);
    expect(danger).not.toBe(base);
    expect(danger).not.toBe(success);
  });

  test('resolves a variant so the appearance can reach the border', async ({ page }) => {
    await expect(page.locator('[data-testid="img-success"]')).toHaveAttribute('data-variant', 'outline');
    await expect(page.locator('[data-testid="img-filled"]')).toHaveAttribute('data-variant', 'filled');
  });

  test('a plain Img stays neutral, emitting neither attribute', async ({ page }) => {
    const el = page.locator('[data-testid="img-default"]');
    await expect(el).not.toHaveAttribute('data-appearance', /.+/);
    await expect(el).not.toHaveAttribute('data-variant', /.+/);
  });
});
