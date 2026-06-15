import { test, expect, getColor } from './base';

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="link-section"]');
});

test.describe('Link external', () => {
  test('external link has target="_blank" and rel="noopener noreferrer"', async ({ page }) => {
    const link = page.locator('[data-testid="link-external"]');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('normal link has no target or rel attributes', async ({ page }) => {
    const link = page.locator('[data-testid="link-normal"]');
    await expect(link).not.toHaveAttribute('target');
    await expect(link).not.toHaveAttribute('rel');
  });
});

test.describe('Link appearance colors', () => {
  // Every explicit appearance must produce a distinct color. Regression test
  // for the bug where every appearance emitted the same `text-(--link-text)`
  // class, so all links rendered identical blue regardless of the prop.
  const explicitAppearances = [
    'primary', 'brand', 'accent', 'secondary', 'tertiary',
    'success', 'danger', 'warning', 'info',
  ] as const;

  test('each explicit appearance produces a distinct computed color', async ({ page }) => {
    const colors = new Map<string, string>();
    for (const appearance of explicitAppearances) {
      const link = page.locator(`[data-testid="link-appearance-${appearance}"]`);
      colors.set(appearance, await getColor(link));
    }

    const unique = new Set(colors.values());
    expect(
      unique.size,
      `expected 9 distinct colors, got: ${JSON.stringify(Object.fromEntries(colors))}`,
    ).toBe(explicitAppearances.length);
  });

  test('semantic-color appearances differ from each other', async ({ page }) => {
    // Tighter spot-check on the four semantic-meaning appearances. These
    // MUST NOT collide — `<Link success>` looking the same as `<Link danger>`
    // would be a serious accessibility/UX regression even if the broader
    // distinctness check were to drift.
    const semantic = ['success', 'danger', 'warning', 'info'] as const;
    const colors = await Promise.all(semantic.map((a) =>
      getColor(page.locator(`[data-testid="link-appearance-${a}"]`)),
    ));
    const unique = new Set(colors);
    expect(
      unique.size,
      `expected 4 distinct semantic colors, got: ${JSON.stringify(Object.fromEntries(semantic.map((a, i) => [a, colors[i]])))}`,
    ).toBe(semantic.length);
  });

  test('default Link picks up --link-text via cascade from a filled Card', async ({ page }) => {
    // The whole point of the default `link` appearance using `text-(--link-text)`
    // (instead of a hardcoded color) is the cascade story: a default Link inside
    // a filled Card should re-color itself to --color-text-filled-link via the
    // Card's [data-variant="filled"] rule. This test proves that cascade works
    // end-to-end in a real browser.
    const standalone = page.locator('[data-testid="link-appearance-default"]');
    const inFilledCard = page.locator('[data-testid="link-cascade-in-filled-card"]');

    const standaloneColor = await getColor(standalone);
    const cascadeColor = await getColor(inFilledCard);

    // Both must be real colors (catches regression to transparent/empty).
    expect(standaloneColor).toMatch(/^(oklch|rgb|hsl|#)/);
    expect(cascadeColor).toMatch(/^(oklch|rgb|hsl|#)/);
    expect(standaloneColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(cascadeColor).not.toBe('rgba(0, 0, 0, 0)');

    // The cascade must actually re-color the link — different --link-text
    // values from :root vs [data-variant="filled"] mean these strings must
    // differ. If they collide, either the cascade broke or the filled-link
    // and standard-link tokens are accidentally identical (a token-design
    // regression worth catching).
    expect(
      cascadeColor,
      `default <Link> inside <Card filled primary> (${cascadeColor}) should differ from a top-level default <Link> (${standaloneColor})`,
    ).not.toBe(standaloneColor);
  });
});
