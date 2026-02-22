import { test, expect, type Locator } from '@playwright/test';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get a resolved computed style property from an element */
async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

/** Get computed color (resolved to rgb) */
async function getColor(locator: Locator): Promise<string> {
  return getStyle(locator, 'color');
}

/** Get computed font-size in px */
async function getFontSize(locator: Locator): Promise<number> {
  const fs = await getStyle(locator, 'font-size');
  return parseFloat(fs);
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page }) => {
  await page.goto('/test.html');
  await page.waitForSelector('[data-testid]');
});

// ── Blockquote ──────────────────────────────────────────────────────────────

test.describe('Blockquote', () => {
  test('renders as <blockquote> tag', async ({ page }) => {
    const el = page.locator('[data-testid="blockquote-default"]');
    const tagName = await el.evaluate(e => e.tagName.toLowerCase());
    expect(tagName).toBe('blockquote');
  });

  test('has left border', async ({ page }) => {
    const el = page.locator('[data-testid="blockquote-default"]');
    const borderWidth = parseFloat(await getStyle(el, 'border-left-width'));
    const borderStyle = await getStyle(el, 'border-left-style');

    expect(borderWidth).toBeGreaterThan(0);
    expect(borderStyle).toBe('solid');
  });

  test('has padding-left', async ({ page }) => {
    const el = page.locator('[data-testid="blockquote-default"]');
    const paddingLeft = parseFloat(await getStyle(el, 'padding-left'));
    expect(paddingLeft).toBeGreaterThan(0);
  });

  test('inherits parent color when inside a colored Card', async ({ page }) => {
    const blockquote = page.locator('[data-testid="blockquote-inherit-brand"]');
    const text = page.locator('[data-testid="blockquote-inherit-brand-text"]');

    const blockquoteColor = await getColor(blockquote);
    const textColor = await getColor(text);

    // Both should inherit the same brand color from the Card
    expect(blockquoteColor).toBe(textColor);
  });

  test('size variants xs→xl produce strictly increasing font-sizes', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const fontSizes: number[] = [];

    for (const size of sizes) {
      fontSizes.push(await getFontSize(page.locator(`[data-testid="blockquote-${size}"]`)));
    }

    for (let i = 1; i < fontSizes.length; i++) {
      expect(fontSizes[i]).toBeGreaterThan(fontSizes[i - 1]);
    }
  });
});

// ── Kbd ─────────────────────────────────────────────────────────────────────

test.describe('Kbd', () => {
  test('renders as <kbd> tag', async ({ page }) => {
    const el = page.locator('[data-testid="kbd-default"]');
    const tagName = await el.evaluate(e => e.tagName.toLowerCase());
    expect(tagName).toBe('kbd');
  });

  test('has border', async ({ page }) => {
    const el = page.locator('[data-testid="kbd-default"]');
    const borderBottom = parseFloat(await getStyle(el, 'border-bottom-width'));
    expect(borderBottom).toBeGreaterThanOrEqual(1);
  });

  test('uses monospace font', async ({ page }) => {
    const el = page.locator('[data-testid="kbd-default"]');
    const fontFamily = await getStyle(el, 'font-family');
    expect(fontFamily.toLowerCase()).toContain('mono');
  });

  test('size variants xs→xl produce strictly increasing font-sizes', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const fontSizes: number[] = [];

    for (const size of sizes) {
      fontSizes.push(await getFontSize(page.locator(`[data-testid="kbd-${size}"]`)));
    }

    for (let i = 1; i < fontSizes.length; i++) {
      expect(fontSizes[i]).toBeGreaterThan(fontSizes[i - 1]);
    }
  });
});

// ── Mark ────────────────────────────────────────────────────────────────────

test.describe('Mark', () => {
  test('renders as <mark> tag', async ({ page }) => {
    const el = page.locator('[data-testid="mark-default"]');
    const tagName = await el.evaluate(e => e.tagName.toLowerCase());
    expect(tagName).toBe('mark');
  });

  test('has background color set', async ({ page }) => {
    const el = page.locator('[data-testid="mark-default"]');
    const bg = await getStyle(el, 'background-color');
    // Should not be transparent or fully absent
    expect(bg).not.toBe('rgba(0, 0, 0, 0)');
    expect(bg).not.toBe('transparent');
  });

  test('default warning color differs from danger color', async ({ page }) => {
    const defaultMark = page.locator('[data-testid="mark-default"]');
    const dangerMark = page.locator('[data-testid="mark-danger"]');

    const defaultBg = await getStyle(defaultMark, 'background-color');
    const dangerBg = await getStyle(dangerMark, 'background-color');

    expect(defaultBg).not.toBe(dangerBg);
  });

  test('size variants xs→xl produce strictly increasing font-sizes', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const fontSizes: number[] = [];

    for (const size of sizes) {
      fontSizes.push(await getFontSize(page.locator(`[data-testid="mark-${size}"]`)));
    }

    for (let i = 1; i < fontSizes.length; i++) {
      expect(fontSizes[i]).toBeGreaterThan(fontSizes[i - 1]);
    }
  });
});
