import { test, expect, type Locator } from './base';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get a resolved computed style property from an element */
async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="border-color-inherit"]');
});

test.describe('Border-color inheritance via CSS variables', () => {

  test('Divider inside Card danger filled differs from standalone divider', async ({ page }) => {
    const standalone = page.locator('[data-testid="divider-standalone"]');
    const inherited = page.locator('[data-testid="divider-inherit-danger"]');

    const standaloneBg = await getStyle(standalone, 'background-color');
    const inheritedBg = await getStyle(inherited, 'background-color');

    // Divider uses bg-(--divider-color). Inside a danger filled Card,
    // --divider-color is alpha-white (oklch(1 0 0 / 15%)), different from
    // standalone divider which uses --color-border-primary (gray-200).
    expect(inheritedBg).not.toBe(standaloneBg);
  });

  test('Divider inside Card danger filled is visible (not transparent)', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-inherit-danger"]');

    const dividerBg = await getStyle(divider, 'background-color');

    // Filled Card sets --border-color to transparent, but --divider-color
    // uses alpha-white so the divider remains visible.
    expect(dividerBg).not.toBe('rgba(0, 0, 0, 0)');
    expect(dividerBg).not.toBe('transparent');
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

    // For outline variant, --divider-color equals --border-color (same token)
    expect(dividerBg).toBe(cardBorderColor);
  });

  test('Divider inside Card success filled inherits success border color', async ({ page }) => {
    const standalone = page.locator('[data-testid="divider-standalone"]');
    const inherited = page.locator('[data-testid="divider-inherit-success"]');

    const standaloneBg = await getStyle(standalone, 'background-color');
    const inheritedBg = await getStyle(inherited, 'background-color');

    expect(inheritedBg).not.toBe(standaloneBg);
  });

  test('outline appearance produces different Divider bg from filled', async ({ page }) => {
    const brandOutlineBg = await getStyle(page.locator('[data-testid="divider-inherit-brand"]'), 'background-color');
    const dangerFilledBg = await getStyle(page.locator('[data-testid="divider-inherit-danger"]'), 'background-color');
    const successFilledBg = await getStyle(page.locator('[data-testid="divider-inherit-success"]'), 'background-color');

    // Outline divider (brand) uses --color-border-brand, which differs from
    // filled dividers that use alpha-white --divider-color.
    expect(brandOutlineBg).not.toBe(dangerFilledBg);

    // Both filled dividers use the same alpha-white --divider-color
    expect(dangerFilledBg).toBe(successFilledBg);
  });
});
