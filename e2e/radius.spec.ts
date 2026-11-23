import { test, expect, getStyle, type Locator, type Page } from './base';

// Border radius (fixtures: RadiusFixtures in e2e/fixtures/test-fixtures.tsx): the surface scale,
// the --br-scale setting, an Img on a Card's edge, Icon corners and the Select list.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="radius-section"]');
});

const px = async (locator: Locator, property = 'border-top-left-radius') => parseFloat(await getStyle(locator, property));
const byId = (page: Page, id: string) => page.getByTestId(id);
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

test.describe('Surface corners', () => {
  test('a Card runs 8 to 16px over its sizes', async ({ page }) => {
    const want = { xs: 8, sm: 10, md: 12, lg: 14, xl: 16 };
    for (const size of SIZES) expect(await px(byId(page, `radius-card-${size}`))).toBeCloseTo(want[size], 1);
    expect(await px(byId(page, 'radius-img-md'))).toBeCloseTo(12, 1);
  });

  test('a md Card is between one and two times the corners of the Button inside it', async ({ page }) => {
    const card = await px(byId(page, 'radius-card-md'));
    const button = await px(byId(page, 'radius-scale-default-button'));
    expect(card / button).toBeGreaterThan(1);
    expect(card / button).toBeLessThan(2);
  });
});

test.describe('--br-scale', () => {
  const ROUNDED = ['button', 'input', 'checkbox', 'avatar', 'badge', 'progress', 'icon', 'skeleton', 'card'];

  test('0 squares the corners of every component', async ({ page }) => {
    for (const part of ROUNDED) {
      expect(await px(byId(page, `radius-scale-0-${part}`)), part).toBe(0);
      expect(await px(byId(page, `radius-scale-default-${part}`)), part).toBeGreaterThan(0);
    }
  });

  test('2 doubles them, and a pill stays a pill', async ({ page }) => {
    for (const part of ROUNDED) {
      const base = await px(byId(page, `radius-scale-default-${part}`));
      expect(await px(byId(page, `radius-scale-2-${part}`)), part).toBeCloseTo(base * 2, 1);
    }
    const pill = await px(byId(page, 'radius-scale-0-pill'));
    expect(pill).toBe(await px(byId(page, 'radius-scale-default-pill')));
    expect(pill).toBeGreaterThan(100);
  });
});

test.describe('Card media', () => {
  test('an Img on the top edge of a Card of parts takes its corners there and is square below', async ({ page }) => {
    const card = await px(byId(page, 'radius-media-top'));
    const img = byId(page, 'radius-media-top-img');
    expect(await px(img, 'border-top-left-radius')).toBeCloseTo(card - 1, 1);
    expect(await px(img, 'border-top-right-radius')).toBeCloseTo(card - 1, 1);
    expect(await px(img, 'border-bottom-left-radius')).toBe(0);
    expect(await px(img, 'border-bottom-right-radius')).toBe(0);
    const [cardBox, imgBox] = await Promise.all([byId(page, 'radius-media-top').boundingBox(), img.boundingBox()]);
    expect(imgBox!.y - cardBox!.y).toBeCloseTo(1, 0);
  });

  test('an Img on the bottom edge takes the bottom corners', async ({ page }) => {
    const card = await px(byId(page, 'radius-media-bottom'));
    const img = byId(page, 'radius-media-bottom-img');
    expect(await px(img, 'border-bottom-left-radius')).toBeCloseTo(card - 1, 1);
    expect(await px(img, 'border-bottom-right-radius')).toBeCloseTo(card - 1, 1);
    expect(await px(img, 'border-top-left-radius')).toBe(0);
  });

  test('an inset Img and a sharp Img keep their own corners', async ({ page }) => {
    const padded = byId(page, 'radius-media-padded-img');
    const own = await px(padded, 'border-top-left-radius');
    expect(own).toBeGreaterThan(0);
    expect(await px(padded, 'border-bottom-left-radius')).toBe(own);
    expect(await px(byId(page, 'radius-media-sharp-img'), 'border-top-left-radius')).toBe(0);
  });
});

test.describe('Icon corners', () => {
  test('a filled Icon has the corners of a Button for its own size', async ({ page }) => {
    for (const size of SIZES) {
      const icon = byId(page, `radius-icon-${size}`);
      const box = await icon.boundingBox();
      expect((await px(icon)) / box!.width, size).toBeCloseTo(0.2174, 2);
    }
  });
});

test.describe('Select list', () => {
  test('a sm field opens a list with the corners and inset of the default Menu', async ({ page }) => {
    const supported = await page.evaluate(() => CSS.supports('appearance', 'base-select'));
    test.skip(!supported, 'this engine draws the native picker');
    const select = byId(page, 'select-default');
    const picker = (property: string) =>
      select.evaluate((el, p) => getComputedStyle(el, '::picker(select)').getPropertyValue(p), property);
    expect(parseFloat(await picker('border-top-left-radius'))).toBeCloseTo(10, 1);
    expect(parseFloat(await picker('padding-top'))).toBeCloseTo(6, 1);
    // the radius of a sm MenuItem: (7 * 0.5 * 1.6 + 2 * 1.5) * 4px * 0.15
    expect(await px(select.locator('option').first())).toBeCloseTo(5.16, 1);
  });
});
