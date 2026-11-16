import { test, expect, getStyle, getFontSize, type Page } from './base';

// A responsive component repeats its padding, gap and font size in `max-tablet:` and
// `max-mobile:` classes. A className that overrides one of those values has to hold below
// the breakpoints too, not on desktop only.

const WIDTHS = [
  { name: 'desktop', width: 1440 },
  { name: 'tablet', width: 800 },
  { name: 'mobile', width: 400 },
] as const;

const byId = (page: Page, id: string) => page.locator(`[data-testid="${id}"]`);
const px = (page: Page, id: string, property: string) => getStyle(byId(page, id), property).then(parseFloat);

test.beforeEach(async ({ page, testPage }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="theme-engine-section"]');
});

test('without a className the Section and the PageTitle still scale down', async ({ page }) => {
  // guards the tests below: the responsive classes are live in this build
  const desktop = { py: await px(page, 'rp-section-plain', 'padding-top'), fs: await getFontSize(byId(page, 'rp-title-plain')) };
  await page.setViewportSize({ width: 400, height: 900 });
  expect(await px(page, 'rp-section-plain', 'padding-top')).toBeLessThan(desktop.py);
  expect(await getFontSize(byId(page, 'rp-title-plain'))).toBeLessThan(desktop.fs);
});

for (const vp of WIDTHS) {
  test.describe(`className overrides at ${vp.name} width`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: 900 });
    });

    test('Section className="py-8 gap-2" keeps its padding and gap', async ({ page }) => {
      expect(await px(page, 'rp-section', 'padding-top')).toBe(32);
      expect(await px(page, 'rp-section', 'padding-bottom')).toBe(32);
      expect(await px(page, 'rp-section', 'row-gap')).toBe(8);
      expect(await px(page, 'rp-section', 'column-gap')).toBe(8);
    });

    test('the horizontal padding it did not override still follows the theme', async ({ page }) => {
      expect(await px(page, 'rp-section', 'padding-left')).toBe(await px(page, 'rp-section-plain', 'padding-left'));
      expect(await px(page, 'rp-section', 'padding-right')).toBe(await px(page, 'rp-section-plain', 'padding-right'));
    });

    test('PageTitle className="text-5xl" keeps its font size', async ({ page }) => {
      expect(await getFontSize(byId(page, 'rp-title'))).toBe(48);
    });

    test('a className with its own mobile class applies that one on mobile only', async ({ page }) => {
      const expected = vp.name === 'mobile' ? await px(page, 'rp-section-plain', 'padding-top') : 32;
      expect(await px(page, 'rp-section-own', 'padding-top')).toBe(expected);
    });
  });
}
