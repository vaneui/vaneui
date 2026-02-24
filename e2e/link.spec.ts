import { test, expect, type Locator } from '@playwright/test';

/** Get a resolved computed style property from an element */
async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

test.beforeEach(async ({ page }) => {
  await page.goto('/test.html');
  await page.waitForSelector('[data-testid="link-section"]');
});

test.describe('Link external', () => {
  test('external link renders SVG icon', async ({ page }) => {
    const link = page.locator('[data-testid="link-external"]');
    const svg = link.locator('svg');
    await expect(svg).toBeVisible();
  });

  test('normal link has no SVG icon', async ({ page }) => {
    const link = page.locator('[data-testid="link-normal"]');
    const svg = link.locator('svg');
    await expect(svg).toHaveCount(0);
  });

  test('external link has target="_blank" and rel="noopener noreferrer"', async ({ page }) => {
    const link = page.locator('[data-testid="link-external"]');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('icon container height matches the text line-height', async ({ page }) => {
    const link = page.locator('[data-testid="link-external"]');
    const iconSpan = link.locator('.vane-link-end-icon');

    const lineHeight = parseFloat(await getStyle(link, 'line-height'));
    const spanHeight = await iconSpan.evaluate(el => el.getBoundingClientRect().height);

    // Icon container fills the line box (line-height), not the font metrics box
    expect(spanHeight).toBeCloseTo(lineHeight, 0);
  });

  test('icon container height matches text line-height at all sizes', async ({ page }) => {
    for (const size of ['xs', 'xl'] as const) {
      const link = page.locator(`[data-testid="link-external-${size}"]`);
      const iconSpan = link.locator('.vane-link-end-icon');

      const lineHeight = parseFloat(await getStyle(link, 'line-height'));
      const spanHeight = await iconSpan.evaluate(el => el.getBoundingClientRect().height);

      expect(spanHeight).toBeCloseTo(lineHeight, 0);
    }
  });

  test('icon scales with text size (xs < xl)', async ({ page }) => {
    const xsSvg = page.locator('[data-testid="link-external-xs"] svg');
    const xlSvg = page.locator('[data-testid="link-external-xl"] svg');

    const xsWidth = parseFloat(await getStyle(xsSvg, 'width'));
    const xlWidth = parseFloat(await getStyle(xlSvg, 'width'));

    expect(xlWidth).toBeGreaterThan(xsWidth);
  });
});
