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

function isTransparent(color: string): boolean {
  return color === 'rgba(0, 0, 0, 0)' || color === 'transparent';
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="ghost-variant"]');
});

test.describe('Ghost variant: computed styles', () => {

  test('ghost button has transparent background', async ({ page }) => {
    const button = page.locator('[data-testid="ghost-primary"]');
    const bg = await getBg(button);
    expect(isTransparent(bg)).toBe(true);
  });

  test('ghost sets --border-color to transparent', async ({ page }) => {
    const button = page.locator('[data-testid="ghost-primary"]');
    // Check the CSS variable (not the computed border-color property,
    // because Button defaults to noBorder and no border class is emitted)
    const borderVar = await button.evaluate(el =>
      getComputedStyle(el).getPropertyValue('--border-color').trim()
    );
    expect(borderVar).toBe('transparent');
  });

  test('ghost text color matches outline text color for same appearance', async ({ page }) => {
    const ghostPrimary = page.locator('[data-testid="ghost-primary"]');
    const outlinePrimary = page.locator('[data-testid="outline-primary-control"]');

    const ghostColor = await getColor(ghostPrimary);
    const outlineColor = await getColor(outlinePrimary);
    expect(ghostColor).toBe(outlineColor);
  });

  test('different ghost appearances produce different text colors', async ({ page }) => {
    const primary = await getColor(page.locator('[data-testid="ghost-primary"]'));
    const danger = await getColor(page.locator('[data-testid="ghost-danger"]'));
    const success = await getColor(page.locator('[data-testid="ghost-success"]'));
    const brand = await getColor(page.locator('[data-testid="ghost-brand"]'));

    // At least primary and danger should differ
    expect(primary).not.toBe(danger);
    // At least 3 distinct colors across 4 appearances
    const unique = new Set([primary, danger, success, brand]);
    expect(unique.size).toBeGreaterThanOrEqual(3);
  });

  test('ghost hover produces visible (non-transparent) background', async ({ page }) => {
    const button = page.locator('[data-testid="ghost-primary"]');

    // Before hover: transparent
    const bgBefore = await getBg(button);
    expect(isTransparent(bgBefore)).toBe(true);

    // Hover and check
    await button.hover();
    const bgAfter = await getBg(button);
    expect(isTransparent(bgAfter)).toBe(false);
  });

  test('ghost badge has transparent background', async ({ page }) => {
    const badge = page.locator('[data-testid="ghost-badge"]');
    const bg = await getBg(badge);
    expect(isTransparent(bg)).toBe(true);
  });

  test('Text inside ghost Card inherits ghost text color', async ({ page }) => {
    const card = page.locator('[data-testid="ghost-card"]');
    const text = page.locator('[data-testid="ghost-card-text"]');

    const cardColor = await getColor(card);
    const textColor = await getColor(text);

    // Text (inherit mode) should pick up the ghost Card's text color
    expect(textColor).toBe(cardColor);
  });

  test('ghost inside filled parent uses its own ghost rule', async ({ page }) => {
    const filledParent = page.locator('[data-testid="ghost-in-filled-parent"]');
    const ghostChild = page.locator('[data-testid="ghost-button-in-filled"]');

    const parentBg = await getBg(filledParent);
    const childBg = await getBg(ghostChild);

    // Parent has filled bg (non-transparent), ghost child has transparent bg
    expect(isTransparent(parentBg)).toBe(false);
    expect(isTransparent(childBg)).toBe(true);
  });
});
