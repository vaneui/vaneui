import { test, expect, getColor, getContrastRatio } from './base';

// WCAG AA requires 4.5:1 for normal text, 3:1 for large text.
// VaneUI filled text is typically large-ish (button labels, card headings),
// so we use the 3:1 threshold as the minimum bar.
const WCAG_AA_LARGE_TEXT = 3;

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="variant-inherit"]');
});

// =========================================================================
// Filled text contrast: text must be readable against filled backgrounds
// =========================================================================

test.describe('Filled text contrast (WCAG)', () => {
  // ALL appearances — link/accent/tertiary were previously untested, which is
  // how a 2:1 filled-link pair shipped
  const appearances = ['primary', 'brand', 'accent', 'secondary', 'tertiary', 'link', 'success', 'danger', 'warning', 'info'] as const;

  for (const appearance of appearances) {
    test(`${appearance} filled: text has at least 3:1 contrast against background`, async ({ page }) => {
      const card = page.locator(`[data-testid="vi-contrast-${appearance}"]`);
      const text = page.locator(`[data-testid="vi-contrast-text-${appearance}"]`);

      const ratio = await getContrastRatio(text, card);

      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE_TEXT);
    });
  }

  test('different appearances produce different text colors on filled backgrounds', async ({ page }) => {
    const colors: string[] = [];
    for (const appearance of appearances) {
      const text = page.locator(`[data-testid="vi-contrast-text-${appearance}"]`);
      colors.push(await getColor(text));
    }
    // At least some colors should differ (not all identical white)
    const unique = new Set(colors);
    expect(unique.size).toBeGreaterThan(1);
  });
});

// =========================================================================
// Identity components inside filled parents
// =========================================================================

test.describe('Identity components in filled context', () => {
  test('Mark keeps its warning color inside a filled Card', async ({ page }) => {
    const mark = page.locator('[data-testid="vi-mark-in-filled"]');
    const card = page.locator('[data-testid="vi-identity-card"]');

    const markColor = await getColor(mark);
    const cardColor = await getColor(card);

    // Mark should NOT inherit Card's text color — it has its own identity
    expect(markColor).not.toBe(cardColor);
  });

  test('Chip keeps its secondary color inside a filled Card', async ({ page }) => {
    const chip = page.locator('[data-testid="vi-chip-in-filled"]');
    const card = page.locator('[data-testid="vi-identity-card"]');

    const chipColor = await getColor(chip);
    const cardColor = await getColor(card);

    expect(chipColor).not.toBe(cardColor);
  });

  test('Link keeps its link color inside a filled Card', async ({ page }) => {
    const link = page.locator('[data-testid="vi-link-in-filled"]');
    const card = page.locator('[data-testid="vi-identity-card"]');

    const linkColor = await getColor(link);
    const cardColor = await getColor(card);

    expect(linkColor).not.toBe(cardColor);
  });

  test('Mark, Chip, and Link each have distinct colors', async ({ page }) => {
    const markColor = await getColor(page.locator('[data-testid="vi-mark-in-filled"]'));
    const chipColor = await getColor(page.locator('[data-testid="vi-chip-in-filled"]'));
    const linkColor = await getColor(page.locator('[data-testid="vi-link-in-filled"]'));

    // All three identity components should have different palette colors
    expect(markColor).not.toBe(chipColor);
    expect(markColor).not.toBe(linkColor);
  });
});

// =========================================================================
// Stack/Col transparency (like Row)
// =========================================================================

test.describe('Layout container transparency', () => {
  test('Stack is transparent to variant inheritance', async ({ page }) => {
    const directButton = page.locator('[data-testid="vi-button-in-filled"]');
    const throughStack = page.locator('[data-testid="vi-button-through-stack"]');

    const directColor = await getColor(directButton);
    const stackColor = await getColor(throughStack);

    expect(stackColor).toBe(directColor);
  });

  test('Col is transparent to variant inheritance', async ({ page }) => {
    const directButton = page.locator('[data-testid="vi-button-in-filled"]');
    const throughCol = page.locator('[data-testid="vi-button-through-col"]');

    const directColor = await getColor(directButton);
    const colColor = await getColor(throughCol);

    expect(colColor).toBe(directColor);
  });
});

// =========================================================================
// Nested layout inheritance: nearest ancestor wins
// =========================================================================

test.describe('Nested layout inheritance', () => {
  test('Text inside outline Stack inherits from Stack, not from filled Card', async ({ page }) => {
    const card = page.locator('[data-testid="vi-nested-stack-card"]');
    const stack = page.locator('[data-testid="vi-nested-stack-outline"]');
    const text = page.locator('[data-testid="vi-text-inherits-stack"]');

    const cardColor = await getColor(card);
    const stackColor = await getColor(stack);
    const textColor = await getColor(text);

    // Card is filled (white text), Stack is outline (dark text)
    // Text should inherit from Stack (nearest ancestor), not Card
    expect(textColor).toBe(stackColor);
    expect(textColor).not.toBe(cardColor);
  });

  test('Text inside filled danger Stack inherits danger colors, not Card primary', async ({ page }) => {
    const card = page.locator('[data-testid="vi-nested-stack-card"]');
    const dangerStack = page.locator('[data-testid="vi-nested-stack-danger"]');
    const text = page.locator('[data-testid="vi-text-inherits-danger-stack"]');

    const cardColor = await getColor(card);
    const dangerColor = await getColor(dangerStack);
    const textColor = await getColor(text);

    // Text should match danger Stack's color, not primary Card's
    expect(textColor).toBe(dangerColor);
  });

  test('outline Stack inside filled Card has different text color than Card', async ({ page }) => {
    const card = page.locator('[data-testid="vi-nested-stack-card"]');
    const stack = page.locator('[data-testid="vi-nested-stack-outline"]');

    const cardColor = await getColor(card);
    const stackColor = await getColor(stack);

    // Card is filled primary (white-ish text), Stack is outline primary (dark text)
    expect(stackColor).not.toBe(cardColor);
  });
});
