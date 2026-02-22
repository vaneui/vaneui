import { test, expect, type Page, type Locator } from '@playwright/test';

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
async function getFontSize(locator: Locator): Promise<string> {
  return getStyle(locator, 'font-size');
}

/** Get the first SVG's computed width inside a locator */
async function getSvgWidth(locator: Locator): Promise<string> {
  return locator.locator('svg').first().evaluate(
    (el) => getComputedStyle(el).getPropertyValue('width'),
  );
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page }) => {
  await page.goto('/test.html');
  // Wait for React to render
  await page.waitForSelector('[data-testid]');
});

// ── 1. Appearance inheritance: Card → child Text/Title ──

test.describe('Appearance inheritance', () => {
  test('Card primary outline → Text inherits text color', async ({ page }) => {
    const card = page.locator('[data-testid="inherit-primary-outline"] [data-appearance="primary"]');
    const text = page.locator('[data-testid="inherit-primary-outline-text"]');

    const cardColor = await getColor(card);
    const textColor = await getColor(text);

    expect(textColor).toBe(cardColor);
  });

  test('Card primary outline → Title inherits text color', async ({ page }) => {
    const card = page.locator('[data-testid="inherit-primary-outline"] [data-appearance="primary"]');
    const title = page.locator('[data-testid="inherit-primary-outline-title"]');

    const cardColor = await getColor(card);
    const titleColor = await getColor(title);

    expect(titleColor).toBe(cardColor);
  });

  test('Card danger filled → Text inherits filled text color', async ({ page }) => {
    const card = page.locator('[data-testid="inherit-danger-filled"] [data-variant="filled"]');
    const text = page.locator('[data-testid="inherit-danger-filled-text"]');

    const cardColor = await getColor(card);
    const textColor = await getColor(text);

    expect(textColor).toBe(cardColor);
  });

  test('Card danger filled → Title inherits filled text color', async ({ page }) => {
    const card = page.locator('[data-testid="inherit-danger-filled"] [data-variant="filled"]');
    const title = page.locator('[data-testid="inherit-danger-filled-title"]');

    const cardColor = await getColor(card);
    const titleColor = await getColor(title);

    expect(titleColor).toBe(cardColor);
  });

  test('Card brand outline → Text inherits brand color', async ({ page }) => {
    const card = page.locator('[data-testid="inherit-brand-outline"] [data-appearance="brand"]');
    const text = page.locator('[data-testid="inherit-brand-outline-text"]');

    const cardColor = await getColor(card);
    const textColor = await getColor(text);

    expect(textColor).toBe(cardColor);
  });

  test('Card success filled → Text inherits success filled color', async ({ page }) => {
    const card = page.locator('[data-testid="inherit-success-filled"] [data-variant="filled"]');
    const text = page.locator('[data-testid="inherit-success-filled-text"]');

    const cardColor = await getColor(card);
    const textColor = await getColor(text);

    expect(textColor).toBe(cardColor);
  });

  test('filled danger text color differs from outline danger', async ({ page }) => {
    const brandOutlineText = page.locator('[data-testid="inherit-brand-outline-text"]');
    const dangerFilledText = page.locator('[data-testid="inherit-danger-filled-text"]');

    const outlineColor = await getColor(brandOutlineText);
    const filledColor = await getColor(dangerFilledText);

    // Outline text (brand-colored) must differ from filled text (light on dark)
    expect(outlineColor).not.toBe(filledColor);
  });
});

// ── 2. Nested appearance override ──

test.describe('Nested appearance override', () => {
  test('Badge danger inside Card primary has different color than Card text', async ({ page }) => {
    const badge = page.locator('[data-testid="nested-override-badge"]');
    const text = page.locator('[data-testid="nested-override-text"]');

    const badgeColor = await getColor(badge);
    const textColor = await getColor(text);

    // Badge with danger appearance overrides Card's primary
    expect(badgeColor).not.toBe(textColor);
  });
});

// ── 3. Size variants produce different font sizes ──

test.describe('Size variants', () => {
  test('Button sizes produce strictly increasing font-size', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const fontSizes: number[] = [];

    for (const size of sizes) {
      const fs = await getFontSize(page.locator(`[data-testid="button-${size}"]`));
      fontSizes.push(parseFloat(fs));
    }

    // Each size must be strictly larger than the previous
    for (let i = 1; i < fontSizes.length; i++) {
      expect(fontSizes[i]).toBeGreaterThan(fontSizes[i - 1]);
    }
  });

  test('Text sizes produce strictly increasing font-size', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const fontSizes: number[] = [];

    for (const size of sizes) {
      const fs = await getFontSize(page.locator(`[data-testid="text-${size}"]`));
      fontSizes.push(parseFloat(fs));
    }

    for (let i = 1; i < fontSizes.length; i++) {
      expect(fontSizes[i]).toBeGreaterThan(fontSizes[i - 1]);
    }
  });

  test('Button md font-size matches expected 16px (1rem)', async ({ page }) => {
    const fs = await getFontSize(page.locator('[data-testid="button-md"]'));
    expect(parseFloat(fs)).toBe(16);
  });

  test('Text md font-size matches expected 16px (1rem)', async ({ page }) => {
    const fs = await getFontSize(page.locator('[data-testid="text-md"]'));
    expect(parseFloat(fs)).toBe(16);
  });
});

// ── 4. Icon sizing consistency: bare SVG vs Icon component ──

test.describe('Icon sizing consistency', () => {
  test('bare SVG and Icon-wrapped SVG same size at xs', async ({ page }) => {
    const bareWidth = await getSvgWidth(page.locator('[data-testid="icon-bare-xs"]'));
    const wrappedWidth = await getSvgWidth(page.locator('[data-testid="icon-wrapped-xs"]'));

    expect(parseFloat(bareWidth)).toBeGreaterThan(0);
    expect(bareWidth).toBe(wrappedWidth);
  });

  test('bare SVG and Icon-wrapped SVG same size at md', async ({ page }) => {
    const bareWidth = await getSvgWidth(page.locator('[data-testid="icon-bare-md"]'));
    const wrappedWidth = await getSvgWidth(page.locator('[data-testid="icon-wrapped-md"]'));

    expect(parseFloat(bareWidth)).toBeGreaterThan(0);
    expect(bareWidth).toBe(wrappedWidth);
  });

  test('bare SVG and Icon-wrapped SVG same size at xl', async ({ page }) => {
    const bareWidth = await getSvgWidth(page.locator('[data-testid="icon-bare-xl"]'));
    const wrappedWidth = await getSvgWidth(page.locator('[data-testid="icon-wrapped-xl"]'));

    expect(parseFloat(bareWidth)).toBeGreaterThan(0);
    expect(bareWidth).toBe(wrappedWidth);
  });

  test('SVG size scales with button size', async ({ page }) => {
    const xsWidth = await getSvgWidth(page.locator('[data-testid="icon-bare-xs"]'));
    const mdWidth = await getSvgWidth(page.locator('[data-testid="icon-bare-md"]'));
    const xlWidth = await getSvgWidth(page.locator('[data-testid="icon-bare-xl"]'));

    expect(parseFloat(mdWidth)).toBeGreaterThan(parseFloat(xsWidth));
    expect(parseFloat(xlWidth)).toBeGreaterThan(parseFloat(mdWidth));
  });
});

// ── 5. Explicit appearance overrides parent ──

test.describe('Explicit appearance override', () => {
  test('Text without appearance inherits Card danger color', async ({ page }) => {
    const section = page.locator('[data-testid="explicit-override"]');
    const card = section.locator('[data-appearance="danger"]');
    const inheritText = page.locator('[data-testid="explicit-override-inherit"]');

    const cardColor = await getColor(card);
    const textColor = await getColor(inheritText);

    expect(textColor).toBe(cardColor);
  });

  test('Text with explicit primary inside Card danger uses its own color', async ({ page }) => {
    const card = page.locator('[data-testid="explicit-override"] [data-appearance="danger"]');
    const primaryText = page.locator('[data-testid="explicit-override-primary"]');

    const cardColor = await getColor(card);
    const textColor = await getColor(primaryText);

    // Primary text color should differ from danger
    expect(textColor).not.toBe(cardColor);
  });
});
