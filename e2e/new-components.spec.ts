import { test, expect, getStyle, getColor, getFontSize } from './base';

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
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

  test('size variants xs→xl produce strictly increasing start-indent (--py-unit scales)', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const indents: number[] = [];

    for (const size of sizes) {
      indents.push(parseFloat(await getStyle(page.locator(`[data-testid="blockquote-${size}"]`), 'padding-inline-start')));
    }

    for (let i = 1; i < indents.length; i++) {
      expect(indents[i]).toBeGreaterThan(indents[i - 1]);
    }
  });

  test('cite source line is a themed <cite>: muted (tertiary token, opacity 1), block, not italic', async ({ page }) => {
    const quote = page.locator('[data-testid="blockquote-cited"]');
    const cite = quote.locator('.vane-blockquote-cite');

    expect(await (await cite.elementHandle())!.evaluate((e) => e.tagName.toLowerCase())).toBe('cite');
    // muted via the tertiary color token — NOT an opacity literal
    expect(await getStyle(cite, 'opacity')).toBe('1');
    const citeColor = await getColor(cite);
    const quoteColor = await getColor(quote);
    expect(citeColor).not.toBe(quoteColor);              // distinct muted color
    // block + not-italic come from props
    expect(await getStyle(cite, 'display')).toBe('block');
    expect(await getStyle(cite, 'font-style')).toBe('normal');
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
    // Kbd no longer defaults to inheritSize — its --spacing: 0.25em override
    // makes --fs resolve in em (xs=0.625em → xl=1.125em), so the size prop
    // controls font-size relative to parent context.
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

  test('size variants all inherit the same font-size from parent', async ({ page }) => {
    // Mark defaults to inheritSize: true — font-size cascades from parent
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const fontSizes: number[] = [];

    for (const size of sizes) {
      fontSizes.push(await getFontSize(page.locator(`[data-testid="mark-${size}"]`)));
    }

    for (let i = 1; i < fontSizes.length; i++) {
      expect(fontSizes[i]).toBe(fontSizes[0]);
    }
  });
});
