import { test, expect, getBg, getColor, getContrastRatio, getStyle, type Locator, type Page } from './base';

// Dark mode contract (P2-1): the [data-theme="dark"] block in tokens.css
// re-declares the color tokens; components re-resolve against them through
// the :root, [data-theme] consumer-variable defaults in rules.css. This spec
// runs on BOTH pipelines (see DUAL_PIPELINE_SPECS) — the dark block must
// survive the raw tokens.css passthrough AND the Tailwind-compiled artifacts.

// ── Helpers (single-spec) ─────────────────────────────────────────────────────

/** Dark-scheme page surface / primary bg token (gray-950) — must match the
 *  --color-bg-primary literal in the tokens.css dark block. */
const DARK_BG_PRIMARY = 'oklch(13% 0.028 261.692)';

/** Dark-scheme overlay scrim — must match the --overlay-bg literal in the
 *  tokens.css dark block (stronger veil than the light 50% scrim). */
const DARK_OVERLAY_BG = 'oklch(0 0 0 / 70%)';

/** Flip the page into the PRIMARY documented dark mode: data-theme="dark"
 *  on <html>. Each test runs in a fresh page, so the flip never leaks. */
async function enableHtmlDark(page: Page): Promise<void> {
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
  });
}

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

  test('error input border + alert icon use the danger token (both flip under dark)', async ({ page }) => {
    const lightInput = page.locator('[data-testid="dm-light-error-input"]');
    const darkInput = page.locator('[data-testid="dm-dark-error-input"]');

    // the error border is border-(--color-border-danger) — frozen red-500 would NOT flip
    const lightBorder = await getStyle(lightInput, 'border-top-color');
    const darkBorder = await getStyle(darkInput, 'border-top-color');
    expect(darkBorder).not.toBe(lightBorder);

    // the alert icon is text-(--color-text-danger) — also token-driven, so it flips too
    const lightIcon = page.locator('.vane-input-wrapper', { has: lightInput }).locator('.vane-input-error-icon');
    const darkIcon = page.locator('.vane-input-wrapper', { has: darkInput }).locator('.vane-input-error-icon');
    expect(await getColor(darkIcon)).not.toBe(await getColor(lightIcon));
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

// =========================================================================
// html-level dark mode — the PRIMARY documented mode (<html data-theme="dark">).
// Unlike the subtree wrappers above, this is the only mode that themes
// PORTALED floating content: Modal/Popup/Overlay render at the end of
// <body>, so they resolve the theme of <html>/<body>, never an in-flow
// wrapper's (the documented portal caveat). The dark-portal-section fixtures
// keep portal ENABLED for exactly this reason. Every test captures the light
// value first, then flips the live page via enableHtmlDark — fresh page per
// test, so the order within a test is the only sequencing that matters.
// =========================================================================

test.describe('html-level dark mode (primary documented mode)', () => {
  test('flipping html re-themes in-flow content outside any data-theme wrapper', async ({ page }) => {
    const surface = page.locator('[data-testid="dm-light-surface"]');
    const text = page.locator('[data-testid="dm-light-text"]');
    const html = page.locator('html');

    const lightBg = await getBg(surface);
    const lightColor = await getColor(text);
    expect(await getStyle(html, 'color-scheme')).not.toBe('dark');

    await enableHtmlDark(page);

    // native controls (scrollbars, form fields) switch scheme...
    expect(await getStyle(html, 'color-scheme')).toBe('dark');
    // ...and the light-column fixtures — OUTSIDE any data-theme wrapper —
    // now resolve the dark tokens declared at :root[data-theme="dark"]
    expect(await getBg(surface)).not.toBe(lightBg);
    expect(await rendersAs(surface, 'background-color', DARK_BG_PRIMARY)).toBe(true);
    expect(await getColor(text)).not.toBe(lightColor);
  });

  test('portaled Modal content paints the dark surface', async ({ page }) => {
    const content = page.locator('[data-testid="dark-portal-modal-content"]');
    const text = page.locator('[data-testid="dark-portal-modal-text"]');

    const lightBg = await getBg(content);
    const lightColor = await getColor(text);

    await enableHtmlDark(page);

    // the modal lives in a portal at the end of <body> — only the html-level
    // attribute can reach it (a subtree wrapper never could)
    expect(await getBg(content)).not.toBe(lightBg);
    expect(await rendersAs(content, 'background-color', DARK_BG_PRIMARY)).toBe(true);
    expect(await getColor(text)).not.toBe(lightColor);
  });

  test('portaled Menu popup frame and item flip to dark values', async ({ page }) => {
    const popup = page.locator('[data-testid="dark-portal-menu-popup"]');
    const item = page.locator('[data-testid="dark-portal-menu-item"]');

    const lightBg = await getBg(popup);
    const lightColor = await getColor(item);

    await enableHtmlDark(page);

    // menu popup defaults are primary+outline, so its surface consumes the
    // same --color-bg-primary token as the page surface (gray-950 in dark)
    expect(await getBg(popup)).not.toBe(lightBg);
    expect(await rendersAs(popup, 'background-color', DARK_BG_PRIMARY)).toBe(true);
    expect(await getColor(item)).not.toBe(lightColor);
  });

  test('open Modal overlay scrim deepens to the dark --overlay-bg', async ({ page }) => {
    const overlay = page.locator('[data-testid="dark-portal-modal-overlay"]');

    const lightScrim = await getBg(overlay);

    await enableHtmlDark(page);

    // dark block re-declares --overlay-bg (50% → 70% black): a dark modal
    // over a dark page needs a stronger veil
    const darkScrim = await getBg(overlay);
    expect(darkScrim).not.toBe(lightScrim);
    expect(await rendersAs(overlay, 'background-color', DARK_OVERLAY_BG)).toBe(true);
  });

  test('data-theme="light" under html-dark pins color-scheme light but still inherits dark tokens', async ({ page }) => {
    const pin = page.locator('[data-testid="dm-light-pin"]');
    const pinText = page.locator('[data-testid="dm-light-pin-text"]');
    const darkBareText = page.locator('[data-testid="dm-dark-bare-text"]');

    const lightColor = await getColor(pinText);

    await enableHtmlDark(page);

    // explicit light marker: native-control scheme is pinned back to light...
    expect(await getStyle(pin, 'color-scheme')).toBe('light');
    // ...but [data-theme="light"] re-declares NO tokens (documented), so the
    // dark values inherited from <html> still apply — same computed color as
    // a bare Text inside an actual dark wrapper
    expect(await getColor(pinText)).not.toBe(lightColor);
    expect(await getColor(pinText)).toBe(await getColor(darkBareText));
  });
});
