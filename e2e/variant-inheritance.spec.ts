import { test, expect, type Locator } from './base';

// ── Helpers ──────────────────────────────────────────────────────────────────

async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

async function getColor(locator: Locator): Promise<string> {
  return getStyle(locator, 'color');
}

async function getBg(locator: Locator): Promise<string> {
  return getStyle(locator, 'background-color');
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="variant-inherit"]');
});

test.describe('Variant inheritance: filled layout → outline children', () => {

  test('standalone Button keeps outline colors', async ({ page }) => {
    const standalone = page.locator('[data-testid="vi-standalone-button"]');
    const inFilled = page.locator('[data-testid="vi-button-in-filled"]');

    const standaloneColor = await getColor(standalone);
    const inFilledColor = await getColor(inFilled);

    // Standalone outline Button has dark text; inside filled it should be light
    expect(standaloneColor).not.toBe(inFilledColor);
  });

  test('Button inside filled Card gets filled text color', async ({ page }) => {
    const card = page.locator('[data-testid="vi-filled-card"]');
    const button = page.locator('[data-testid="vi-button-in-filled"]');

    // Button text color should match the filled Card's text color
    const cardColor = await getColor(card);
    const buttonColor = await getColor(button);
    expect(buttonColor).toBe(cardColor);
  });

  test('Button inside filled Card gets filled background color', async ({ page }) => {
    const card = page.locator('[data-testid="vi-filled-card"]');
    const button = page.locator('[data-testid="vi-button-in-filled"]');

    // Button background should match the filled Card's background
    const cardBg = await getBg(card);
    const buttonBg = await getBg(button);
    expect(buttonBg).toBe(cardBg);
  });

  test('Code inside filled Card gets filled colors', async ({ page }) => {
    const card = page.locator('[data-testid="vi-filled-card"]');
    const code = page.locator('[data-testid="vi-code-in-filled"]');

    const cardColor = await getColor(card);
    const codeColor = await getColor(code);
    expect(codeColor).toBe(cardColor);
  });

  test('Badge inside filled Card gets filled colors', async ({ page }) => {
    const card = page.locator('[data-testid="vi-filled-card"]');
    const badge = page.locator('[data-testid="vi-badge-in-filled"]');

    const cardColor = await getColor(card);
    const badgeColor = await getColor(badge);
    expect(badgeColor).toBe(cardColor);
  });

  test('Button with different appearance inside filled Card gets its own filled colors', async ({ page }) => {
    const buttonDefault = page.locator('[data-testid="vi-button-in-danger"]');
    const buttonSuccess = page.locator('[data-testid="vi-button-success-in-danger"]');

    // Both should have filled text (light), but different specific colors
    const defaultColor = await getColor(buttonDefault);
    const successColor = await getColor(buttonSuccess);

    // Both should differ from a standalone outline Button
    const standalone = page.locator('[data-testid="vi-standalone-button"]');
    const standaloneColor = await getColor(standalone);
    expect(defaultColor).not.toBe(standaloneColor);
    expect(successColor).not.toBe(standaloneColor);
  });

  test('Row is transparent to variant inheritance', async ({ page }) => {
    const cardDirect = page.locator('[data-testid="vi-button-in-filled"]');
    const throughRow = page.locator('[data-testid="vi-button-through-row"]');

    // Button through Row should have the same color as Button directly in Card
    const directColor = await getColor(cardDirect);
    const rowColor = await getColor(throughRow);
    expect(rowColor).toBe(directColor);
  });

  test('Divider inside filled Card uses alpha-white divider color (not transparent)', async ({ page }) => {
    const divider = page.locator('[data-testid="vi-divider-filled"]');

    // Divider uses bg-(--divider-color). Inside filled Card, --divider-color
    // should be an alpha-white value (oklch(1 0 0 / 15%)), not transparent.
    // Card's --border-color is transparent, but --divider-color is separate.
    const dividerBg = await getBg(divider);
    expect(dividerBg).not.toBe('rgba(0, 0, 0, 0)'); // not transparent
    expect(dividerBg).not.toBe('transparent');
  });

  test('nested outline Card inside filled Card gets filled colors', async ({ page }) => {
    const outerCard = page.locator('[data-testid="vi-nested-outer"]');
    const innerCard = page.locator('[data-testid="vi-nested-inner"]');

    // Inner Card (outline) should get filled background from outer Card
    const outerBg = await getBg(outerCard);
    const innerBg = await getBg(innerCard);
    expect(innerBg).toBe(outerBg);
  });

  test('Button nested inside inner Card also gets filled colors', async ({ page }) => {
    const outerCard = page.locator('[data-testid="vi-nested-outer"]');
    const nestedButton = page.locator('[data-testid="vi-button-nested"]');

    const outerColor = await getColor(outerCard);
    const buttonColor = await getColor(nestedButton);
    expect(buttonColor).toBe(outerColor);
  });

  test('explicit filled on child still works normally', async ({ page }) => {
    const explicitButton = page.locator('[data-testid="vi-button-explicit-filled"]');
    const inheritedButton = page.locator('[data-testid="vi-button-in-filled"]');

    // Both should have the same filled colors
    const explicitColor = await getColor(explicitButton);
    const inheritedColor = await getColor(inheritedButton);
    expect(explicitColor).toBe(inheritedColor);
  });
});
