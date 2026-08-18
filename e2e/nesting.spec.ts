import { test, expect, getStyle, type Locator } from './base';

// Nested surfaces compound: each padded level is chrome subtracted from content width.
// The viewport bounds the inline axis, so every layout surface ramps its padding down
// on small screens. Vertical rhythm is free to keep scaling and is asserted separately.

const PHONE = { width: 390, height: 844 };
const WIDE = { width: 1440, height: 900 };

const padX = (l: Locator) => getStyle(l, 'padding-left').then(parseFloat);
const padY = (l: Locator) => getStyle(l, 'padding-top').then(parseFloat);
const contentWidth = (l: Locator) => l.evaluate((el) => el.clientWidth - parseFloat(getComputedStyle(el).paddingLeft) * 2);

test.beforeEach(async ({ page, testPage }) => {
  await page.setViewportSize(WIDE);
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="nesting-section"]');
});

test.describe('Nested surface padding', () => {
  test('each level of the chain shrinks its gutter on a phone', async ({ page }) => {
    await page.setViewportSize(PHONE);
    expect(await padX(page.locator('[data-testid="nesting-outer"]'))).toBe(16); // Section xl, capped
    expect(await padX(page.locator('[data-testid="nesting-card"]'))).toBe(20);  // Card lg, 36 -> 20
    expect(await padX(page.locator('[data-testid="nesting-inner"]'))).toBe(8);  // Stack md, 16 -> 8
  });

  // Measured against the width the chain is handed, not the viewport: the harness shell
  // adds its own 16px inset, so a 390px phone gives the outermost Section 358px.
  test('the full chain spends little of the width it is given on chrome', async ({ page }) => {
    await page.setViewportSize(PHONE);
    const outer = await page.locator('[data-testid="nesting-outer"]').evaluate((el) => el.clientWidth);
    const content = await contentWidth(page.locator('[data-testid="nesting-inner"]'));
    expect(outer - content).toBeLessThanOrEqual(92); // was 140 before the ramp
    expect(content).toBeGreaterThanOrEqual(260);
  });

  test('desktop padding is unchanged by the ramp', async ({ page }) => {
    await page.setViewportSize(WIDE);
    expect(await padX(page.locator('[data-testid="nesting-outer"]'))).toBe(96); // Section xl
    expect(await padX(page.locator('[data-testid="nesting-card"]'))).toBe(36);  // Card lg
    expect(await padX(page.locator('[data-testid="nesting-inner"]'))).toBe(16); // Stack md
  });

  test('Card keeps a square box: both axes step down together', async ({ page }) => {
    const card = page.locator('[data-testid="nesting-card"]');
    await page.setViewportSize(PHONE);
    expect(await padY(card)).toBe(await padX(card));
    await page.setViewportSize(WIDE);
    expect(await padY(card)).toBe(await padX(card));
  });
});

test.describe('Compound Card sub-parts', () => {
  const parts = ['header', 'body', 'footer'] as const;

  test('sub-parts inherit the Card ramp on a phone', async ({ page }) => {
    await page.setViewportSize(PHONE);
    for (const part of parts) {
      expect(await padX(page.locator(`[data-testid="nesting-compound-${part}"]`))).toBe(20);
    }
  });

  test('sub-parts match the Card curve on desktop', async ({ page }) => {
    await page.setViewportSize(WIDE);
    for (const part of parts) {
      expect(await padX(page.locator(`[data-testid="nesting-compound-${part}"]`))).toBe(36);
    }
  });

  test('the compound Card itself stays unpadded so the inset is not applied twice', async ({ page }) => {
    await page.setViewportSize(PHONE);
    expect(await padX(page.locator('[data-testid="nesting-compound"]'))).toBe(0);
  });
});
