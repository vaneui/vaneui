import { test, expect, type Locator } from '@playwright/test';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get a resolved computed style property from an element */
async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page }) => {
  await page.goto('/test.html');
  await page.waitForSelector('[data-testid="border-color-inherit"]');
});

test.describe('Border-color inheritance via CSS variables', () => {

  test('Divider inside Card danger filled inherits danger border color', async ({ page }) => {
    const standalone = page.locator('[data-testid="divider-standalone"]');
    const inherited = page.locator('[data-testid="divider-inherit-danger"]');

    const standaloneBg = await getStyle(standalone, 'background-color');
    const inheritedBg = await getStyle(inherited, 'background-color');

    // Divider uses bg-(--border-color). Inside a danger filled Card,
    // --border-color should be the filled-danger border color, NOT primary.
    expect(inheritedBg).not.toBe(standaloneBg);
  });

  test('Divider inside Card danger filled matches Card border-color', async ({ page }) => {
    const section = page.locator('[data-testid="border-color-inherit"]');
    const card = section.locator('[data-variant="filled"][data-appearance="danger"]');
    const divider = page.locator('[data-testid="divider-inherit-danger"]');

    const cardBorderColor = await getStyle(card, 'border-color');
    const dividerBg = await getStyle(divider, 'background-color');

    // Divider bg should match the Card's border-color (both use --border-color)
    expect(dividerBg).toBe(cardBorderColor);
  });

  test('Divider inside Card brand outline inherits brand border color', async ({ page }) => {
    const standalone = page.locator('[data-testid="divider-standalone"]');
    const inherited = page.locator('[data-testid="divider-inherit-brand"]');

    const standaloneBg = await getStyle(standalone, 'background-color');
    const inheritedBg = await getStyle(inherited, 'background-color');

    // Brand border color should differ from default primary border color
    expect(inheritedBg).not.toBe(standaloneBg);
  });

  test('Divider inside Card brand outline matches Card border-color', async ({ page }) => {
    const section = page.locator('[data-testid="border-color-inherit"]');
    const card = section.locator('[data-appearance="brand"]');
    const divider = page.locator('[data-testid="divider-inherit-brand"]');

    const cardBorderColor = await getStyle(card, 'border-color');
    const dividerBg = await getStyle(divider, 'background-color');

    expect(dividerBg).toBe(cardBorderColor);
  });

  test('Divider inside Card success filled inherits success border color', async ({ page }) => {
    const standalone = page.locator('[data-testid="divider-standalone"]');
    const inherited = page.locator('[data-testid="divider-inherit-success"]');

    const standaloneBg = await getStyle(standalone, 'background-color');
    const inheritedBg = await getStyle(inherited, 'background-color');

    expect(inheritedBg).not.toBe(standaloneBg);
  });

  test('each appearance produces a different Divider background', async ({ page }) => {
    const dangerBg = await getStyle(page.locator('[data-testid="divider-inherit-danger"]'), 'background-color');
    const brandBg = await getStyle(page.locator('[data-testid="divider-inherit-brand"]'), 'background-color');
    const successBg = await getStyle(page.locator('[data-testid="divider-inherit-success"]'), 'background-color');

    // All three should be different colors
    expect(dangerBg).not.toBe(brandBg);
    expect(dangerBg).not.toBe(successBg);
    expect(brandBg).not.toBe(successBg);
  });
});
