import { test, expect, getStyle, type Locator } from './base';

// --aspect-ratio is the declared ratio of inline to block padding. It is consumed only through
// calc() in a custom property, so a declaration that loses the cascade fails silently: the class
// list is identical either way. These assert the computed pixels instead.

const WIDE = { width: 1440, height: 900 };
const TABLET = { width: 900, height: 900 };
const PHONE = { width: 390, height: 844 };

const padX = (l: Locator) => getStyle(l, 'padding-left').then(parseFloat);
const padY = (l: Locator) => getStyle(l, 'padding-top').then(parseFloat);

// Every component that declares a ratio, and what it declares in rules.css.
const RATIOS: ReadonlyArray<readonly [string, number]> = [
  ['button', 2],
  ['icon-button', 1],
  ['badge', 2],
  ['chip', 2],
  ['code', 3],
  ['kbd', 5],
  ['input', 2],
  ['nav-link', 2],
  ['card', 1],
  ['stack', 1],
  ['container', 2],
  ['divider', 1],
  ['td', 2],
];

test.beforeEach(async ({ page, testPage }) => {
  await page.setViewportSize(WIDE);
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="ratio-section"]');
});

test.describe('Declared --aspect-ratio reaches the computed padding', () => {
  for (const [name, ratio] of RATIOS) {
    test(`${name} renders inline padding ${ratio}x its block padding`, async ({ page }) => {
      const el = page.locator(`[data-testid="ratio-${name}"]`);
      const [x, y] = [await padX(el), await padY(el)];
      expect(y).toBeGreaterThan(0);
      expect(x / y).toBeCloseTo(ratio, 2);
    });
  }
});

test.describe('Container padding ramp', () => {
  // md: py-unit 8/6/4 desktop/tablet/mobile, gutter capped at px-unit 4 tablet and 2 mobile.
  test('md scales the block axis and caps the gutter', async ({ page }) => {
    const el = page.locator('[data-testid="surface-container-md"]');

    await page.setViewportSize(WIDE);
    expect(await padY(el)).toBe(32);
    expect(await padX(el)).toBe(64);

    await page.setViewportSize(TABLET);
    expect(await padY(el)).toBe(24);
    expect(await padX(el)).toBe(32);

    await page.setViewportSize(PHONE);
    expect(await padY(el)).toBe(16);
    expect(await padX(el)).toBe(16);
  });

  test('xl keeps its desktop generosity but shares the mobile gutter with md', async ({ page }) => {
    const md = page.locator('[data-testid="surface-container-md"]');
    const xl = page.locator('[data-testid="surface-container-xl"]');

    await page.setViewportSize(WIDE);
    expect(await padX(xl)).toBe(128);
    expect(await padY(xl)).toBe(64);

    await page.setViewportSize(PHONE);
    expect(await padX(xl)).toBe(await padX(md));
    expect(await padY(xl)).toBe(32); // block axis still scales with the size prop
  });
});

test.describe('Floating surface padding ramps', () => {
  // Modal content is noPadding; its body carries the inset and re-inherits the Modal's ramp.
  test('Modal body and Popup shrink their inset on a phone', async ({ page }) => {
    await page.locator('[data-testid="mb-open"]').click();
    const body = page.locator('[data-testid="mb-modal"] .vane-modal-body');
    const popup = page.locator('[data-testid="mb-popup"]');
    await expect(body).toBeVisible();

    await page.setViewportSize(WIDE);
    expect(await padX(body)).toBe(24);
    expect(await padX(popup)).toBe(16);

    await page.setViewportSize(PHONE);
    expect(await padX(body)).toBe(16);
    expect(await padX(popup)).toBe(10);
  });
});
