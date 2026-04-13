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

test.describe('Non-inherit components use their own CSS rule', () => {

  test('Button inside filled Card keeps its own outline-primary colors (does not inherit)', async ({ page }) => {
    const standalone = page.locator('[data-testid="vi-standalone-button"]');
    const inFilled = page.locator('[data-testid="vi-button-in-filled"]');

    // Both use their own outline-primary rule → same color
    const standaloneColor = await getColor(standalone);
    const inFilledColor = await getColor(inFilled);
    expect(standaloneColor).toBe(inFilledColor);
  });

  test('Button inside filled Card has different color than Card', async ({ page }) => {
    const card = page.locator('[data-testid="vi-filled-card"]');
    const button = page.locator('[data-testid="vi-button-in-filled"]');

    // Card is filled (white-ish text), Button has its own outline (dark text)
    const cardColor = await getColor(card);
    const buttonColor = await getColor(button);
    expect(buttonColor).not.toBe(cardColor);
  });

  test('Code inside filled Card keeps its own colors', async ({ page }) => {
    const card = page.locator('[data-testid="vi-filled-card"]');
    const code = page.locator('[data-testid="vi-code-in-filled"]');

    const cardColor = await getColor(card);
    const codeColor = await getColor(code);
    expect(codeColor).not.toBe(cardColor);
  });

  test('Badge inside filled Card keeps its own colors', async ({ page }) => {
    const card = page.locator('[data-testid="vi-filled-card"]');
    const badge = page.locator('[data-testid="vi-badge-in-filled"]');

    const cardColor = await getColor(card);
    const badgeColor = await getColor(badge);
    expect(badgeColor).not.toBe(cardColor);
  });

  test('Button with explicit success in danger Card uses success colors', async ({ page }) => {
    const buttonDefault = page.locator('[data-testid="vi-button-in-danger"]');
    const buttonSuccess = page.locator('[data-testid="vi-button-success-in-danger"]');

    // Default Button uses primary-outline; success Button uses success-outline
    const defaultColor = await getColor(buttonDefault);
    const successColor = await getColor(buttonSuccess);
    // Both have their own rules, so they differ from each other
    expect(defaultColor).not.toBe(successColor);
  });

  test('Row is transparent — Button through Row matches Button in Card', async ({ page }) => {
    const cardDirect = page.locator('[data-testid="vi-button-in-filled"]');
    const throughRow = page.locator('[data-testid="vi-button-through-row"]');

    // Both Buttons use their own outline-primary rule
    const directColor = await getColor(cardDirect);
    const rowColor = await getColor(throughRow);
    expect(rowColor).toBe(directColor);
  });

  test('Divider inside filled Card uses alpha-white divider color (not transparent)', async ({ page }) => {
    const divider = page.locator('[data-testid="vi-divider-filled"]');

    // Divider defaults to inherit → reads --divider-color from filled Card
    // which is oklch(1 0 0 / 15%), not transparent
    const dividerBg = await getBg(divider);
    expect(dividerBg).not.toBe('rgba(0, 0, 0, 0)');
    expect(dividerBg).not.toBe('transparent');
  });

  test('nested outline Card inside filled Card uses its own colors', async ({ page }) => {
    const outerCard = page.locator('[data-testid="vi-nested-outer"]');
    const innerCard = page.locator('[data-testid="vi-nested-inner"]');

    // Inner Card has its own outline-primary rule → white bg, not filled
    const outerBg = await getBg(outerCard);
    const innerBg = await getBg(innerCard);
    expect(innerBg).not.toBe(outerBg);
  });

  test('Button nested inside inner Card also uses its own colors', async ({ page }) => {
    const outerCard = page.locator('[data-testid="vi-nested-outer"]');
    const nestedButton = page.locator('[data-testid="vi-button-nested"]');

    // Nested Button has its own outline-primary rule
    const outerColor = await getColor(outerCard);
    const buttonColor = await getColor(nestedButton);
    expect(buttonColor).not.toBe(outerColor);
  });

  test('explicit filled Button matches filled Card colors', async ({ page }) => {
    const card = page.locator('[data-testid="vi-filled-card"]');
    const explicitButton = page.locator('[data-testid="vi-button-explicit-filled"]');

    // <Button filled> gets filled-primary rule → matches Card's filled colors
    const cardColor = await getColor(card);
    const buttonColor = await getColor(explicitButton);
    expect(buttonColor).toBe(cardColor);
  });
});
