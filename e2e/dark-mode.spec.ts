import { test, expect, getBg, getColor, getContrastRatio, type Locator } from './base';

// Dark mode contract (P2-1): the [data-theme="dark"] block in tokens.css
// re-declares the color tokens; components re-resolve against them through
// the :root, [data-theme] consumer-variable defaults in rules.css. This spec
// runs on BOTH pipelines (see DUAL_PIPELINE_SPECS) — the dark block must
// survive the raw tokens.css passthrough AND the Tailwind-compiled artifacts.

// ── Helpers (single-spec) ─────────────────────────────────────────────────────

/** Dark-scheme page surface / primary bg token (gray-950) — must match the
 *  --color-bg-primary literal in the tokens.css dark block. */
const DARK_BG_PRIMARY = 'oklch(13% 0.028 261.692)';

/** Assert an element's computed property renders as the given CSS color.
 *  A probe element is styled with the expected color in the same document,
 *  so both values go through the same engine serialization — robust against
 *  oklch/rgb formatting differences. */
async function rendersAs(
  locator: Locator,
  property: 'background-color' | 'color',
  expectedCss: string,
): Promise<boolean> {
  return locator.evaluate((el, arg) => {
    const probe = document.createElement('div');
    probe.style.setProperty(arg.property, arg.expectedCss);
    document.body.appendChild(probe);
    const expected = getComputedStyle(probe).getPropertyValue(arg.property);
    probe.remove();
    return getComputedStyle(el).getPropertyValue(arg.property) === expected;
  }, { property, expectedCss });
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="dark-mode-section"]');
});

// =========================================================================
// Token flip: dark-section colors differ from light and match dark tokens
// =========================================================================

test.describe('Dark mode token flip', () => {
  test('primary outline Button background flips and matches the dark bg token', async ({ page }) => {
    const lightButton = page.locator('[data-testid="dm-light-button-primary"]');
    const darkButton = page.locator('[data-testid="dm-dark-button-primary"]');

    const lightBg = await getBg(lightButton);
    const darkBg = await getBg(darkButton);

    expect(darkBg).not.toBe(lightBg);
    expect(await rendersAs(darkButton, 'background-color', DARK_BG_PRIMARY)).toBe(true);
  });

  test('primary Card surface paints the dark page surface (gray-950)', async ({ page }) => {
    const lightSurface = page.locator('[data-testid="dm-light-surface"]');
    const darkSurface = page.locator('[data-testid="dm-dark-surface"]');

    expect(await getBg(darkSurface)).not.toBe(await getBg(lightSurface));
    expect(await rendersAs(darkSurface, 'background-color', DARK_BG_PRIMARY)).toBe(true);
  });

  test('inherited Text color flips inside the dark surface', async ({ page }) => {
    const lightText = page.locator('[data-testid="dm-light-text"]');
    const darkText = page.locator('[data-testid="dm-dark-text"]');

    expect(await getColor(darkText)).not.toBe(await getColor(lightText));
  });

  test('unchecked Checkbox field flips to the dark form background (not white)', async ({ page }) => {
    const checkbox = page.locator('[data-testid="dm-dark-checkbox"]');

    // bg-(--color-bg-form): white in light, gray-950 in dark
    expect(await getBg(checkbox)).not.toBe('rgb(255, 255, 255)');
    expect(await rendersAs(checkbox, 'background-color', DARK_BG_PRIMARY)).toBe(true);
  });
});

// =========================================================================
// Inherit-mode re-resolution (architect's regression case): a bare Text
// inside div[data-theme="dark"] with NO appearance-bearing wrapper must
// re-resolve --text-color against the dark tokens at the theme boundary,
// not render the root-resolved light color.
// =========================================================================

test.describe('Inherit-mode re-resolution at the theme boundary', () => {
  test('bare Text in a dark subtree does NOT keep the light root-resolved color', async ({ page }) => {
    const lightBare = page.locator('[data-testid="dm-light-bare-text"]');
    const darkBare = page.locator('[data-testid="dm-dark-bare-text"]');

    expect(await getColor(darkBare)).not.toBe(await getColor(lightBare));
  });

  test('bare Text in a dark subtree is light-on-dark readable', async ({ page }) => {
    const darkBare = page.locator('[data-testid="dm-dark-bare-text"]');
    const darkSurface = page.locator('[data-testid="dm-dark-surface"]');

    // Text color vs the dark page surface (gray-950): AA normal text
    const ratio = await getContrastRatio(darkBare, darkSurface);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});

// =========================================================================
// Contrast gate (dark scheme): same policy as filled-contrast.spec.ts —
// 3:1 minimum (WCAG AA large text) — extended to BOTH variants, since dark
// outline surfaces are colored (950-level), not white.
// =========================================================================

const WCAG_AA_LARGE_TEXT = 3;
const appearances = ['primary', 'brand', 'accent', 'secondary', 'tertiary', 'link', 'success', 'danger', 'warning', 'info'] as const;

test.describe('Dark filled text contrast (WCAG)', () => {
  for (const appearance of appearances) {
    test(`${appearance} filled: text has at least 3:1 contrast against dark background`, async ({ page }) => {
      const card = page.locator(`[data-testid="dm-contrast-filled-${appearance}"]`);
      const text = page.locator(`[data-testid="dm-contrast-filled-text-${appearance}"]`);

      const ratio = await getContrastRatio(text, card);

      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE_TEXT);
    });
  }
});

test.describe('Dark outline text contrast (WCAG)', () => {
  for (const appearance of appearances) {
    test(`${appearance} outline: text has at least 3:1 contrast against dark background`, async ({ page }) => {
      const card = page.locator(`[data-testid="dm-contrast-outline-${appearance}"]`);
      const text = page.locator(`[data-testid="dm-contrast-outline-text-${appearance}"]`);

      const ratio = await getContrastRatio(text, card);

      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE_TEXT);
    });
  }
});
