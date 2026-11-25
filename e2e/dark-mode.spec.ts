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

/** Dark-scheme raised surface (gray-900): Cards, Modals, Popups and outline
 *  Buttons sit one step above the page — must match the --color-bg-raised
 *  literal in the tokens.css dark block. */
const DARK_BG_RAISED = 'oklch(21% 0.034 264.665)';

/** Dark-scheme primary hover (gray-800) and press (gray-700): one and two
 *  steps above a raised surface, so they show on a Card or in a menu. */
const DARK_BG_HOVER = 'oklch(27.8% 0.033 256.848)';
const DARK_BG_ACTIVE = 'oklch(37.3% 0.034 259.733)';

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
  test('primary outline Button background flips and matches the dark raised token', async ({ page }) => {
    const lightButton = page.locator('[data-testid="dm-light-button-primary"]');
    const darkButton = page.locator('[data-testid="dm-dark-button-primary"]');

    const lightBg = await getBg(lightButton);
    const darkBg = await getBg(darkButton);

    expect(darkBg).not.toBe(lightBg);
    expect(await rendersAs(darkButton, 'background-color', DARK_BG_RAISED)).toBe(true);
  });

  test('primary Card surface paints the dark raised surface (gray-900)', async ({ page }) => {
    const lightSurface = page.locator('[data-testid="dm-light-surface"]');
    const darkSurface = page.locator('[data-testid="dm-dark-surface"]');

    expect(await getBg(darkSurface)).not.toBe(await getBg(lightSurface));
    expect(await rendersAs(darkSurface, 'background-color', DARK_BG_RAISED)).toBe(true);
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
// Raised surfaces: in the dark scheme a surface in the page color looked
// sunken on a gray panel, so Cards, Modals, Popups and outline Buttons take
// --color-bg-raised (white / gray-900). A Section keeps the page color, and
// the primary hover and press step above the raised surface.
// =========================================================================

test.describe('Raised surfaces in the dark scheme', () => {
  test('a Card and an outline Button sit one step above the page; a Section keeps the page color', async ({ page }) => {
    const section = page.locator('[data-testid="dm-dark-page-section"]');
    expect(await rendersAs(section, 'background-color', DARK_BG_PRIMARY)).toBe(true);
    expect(await rendersAs(page.locator('[data-testid="dm-dark-page-card"]'), 'background-color', DARK_BG_RAISED)).toBe(true);
    expect(await rendersAs(page.locator('[data-testid="dm-dark-page-button"]'), 'background-color', DARK_BG_RAISED)).toBe(true);
    // fields stay on the form color, the page color
    expect(await rendersAs(page.locator('[data-testid="dm-dark-input"]'), 'background-color', DARK_BG_PRIMARY)).toBe(true);
  });

  test('the light scheme keeps raised surfaces white', async ({ page }) => {
    expect(await getBg(page.locator('[data-testid="dm-light-surface"]'))).toBe('rgb(255, 255, 255)');
    expect(await getBg(page.locator('[data-testid="dm-light-button-primary"]'))).toBe('rgb(255, 255, 255)');
    expect(await getBg(page.locator('[data-testid="dm-light-island-surface"]'))).toBe('rgb(255, 255, 255)');
  });

  test('a scoped --color-bg-primary still reaches Cards and Buttons in the light scheme', async ({ page }) => {
    // the light scheme leaves --color-bg-raised unset, and the fallback resolves on each component
    await page.locator('[data-testid="dm-light"]').evaluate(el => el.style.setProperty('--color-bg-primary', 'rgb(1, 2, 3)'));
    expect(await getBg(page.locator('[data-testid="dm-light-surface"]'))).toBe('rgb(1, 2, 3)');
    expect(await getBg(page.locator('[data-testid="dm-light-button-primary"]'))).toBe('rgb(1, 2, 3)');
  });

  test('an outline Button steps lighter on hover and again on press', async ({ page }) => {
    const button = page.locator('[data-testid="dm-dark-page-button"]');
    await button.hover();
    await expect.poll(() => rendersAs(button, 'background-color', DARK_BG_HOVER)).toBe(true);
    await page.mouse.down();
    await expect.poll(() => rendersAs(button, 'background-color', DARK_BG_ACTIVE)).toBe(true);
    await page.mouse.up();
  });

  test('a ghost Button hover shows on a raised Card', async ({ page }) => {
    const card = page.locator('[data-testid="dm-dark-page-card"]');
    const ghost = page.locator('[data-testid="dm-dark-page-ghost"]');
    await ghost.hover();
    await expect.poll(() => rendersAs(ghost, 'background-color', DARK_BG_HOVER)).toBe(true);
    expect(await getBg(ghost)).not.toBe(await getBg(card));
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
// Contrast gate (dark scheme): filled text is held to 4.5:1, the same policy
// as filled-contrast.spec.ts. The gate also covers the outline variant, at
// 3:1 (WCAG AA large text), since dark outline surfaces are colored
// (950-level), not white.
// =========================================================================

const WCAG_AA_TEXT = 4.5;
const WCAG_AA_LARGE_TEXT = 3;
const appearances = ['primary', 'accent', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'] as const;

test.describe('Dark filled text contrast (WCAG)', () => {
  for (const appearance of appearances) {
    test(`${appearance} filled: text has at least 4.5:1 contrast against dark background`, async ({ page }) => {
      const card = page.locator(`[data-testid="dm-contrast-filled-${appearance}"]`);
      const text = page.locator(`[data-testid="dm-contrast-filled-text-${appearance}"]`);

      const ratio = await getContrastRatio(text, card);

      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_TEXT);
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

test.describe('Shadows follow data-theme', () => {
  // The shadow tokens were composed once on :root, so a subtree kept the alphas of the page
  // around it: a dark subtree drew light shadows and a light island in a dark page dark ones.
  const shadow = (page: Page, id: string) => getStyle(page.locator(`[data-testid="${id}"]`), 'box-shadow');

  test('a page without data-theme keeps the light shadow', async ({ page }) => {
    const light = await shadow(page, 'dm-light-shadow');
    expect(light).toContain('0.1)');
    expect(light).toContain('0.06)');
  });

  test('a dark subtree draws the shadow of a dark page', async ({ page }) => {
    const light = await shadow(page, 'dm-light-shadow');
    const subtree = await shadow(page, 'dm-dark-shadow');
    expect(subtree).not.toBe(light);
    await enableHtmlDark(page);
    expect(await shadow(page, 'dm-light-shadow')).toBe(subtree);
  });

  test('a light subtree draws the light shadow, inside a dark wrapper and under a dark page', async ({ page }) => {
    const light = await shadow(page, 'dm-light-shadow');
    expect(await shadow(page, 'dm-light-island-shadow')).toBe(light);
    await enableHtmlDark(page);
    expect(await shadow(page, 'dm-light-shadow')).not.toBe(light);
    expect(await shadow(page, 'dm-light-pin-shadow')).toBe(light);
  });
});

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
    expect(await rendersAs(surface, 'background-color', DARK_BG_RAISED)).toBe(true);
    expect(await getColor(text)).not.toBe(lightColor);
  });

  test('portaled Modal content paints the dark raised surface', async ({ page }) => {
    const content = page.locator('[data-testid="dark-portal-modal-content"]');
    const text = page.locator('[data-testid="dark-portal-modal-text"]');

    const lightBg = await getBg(content);
    const lightColor = await getColor(text);

    await enableHtmlDark(page);

    // the modal lives in a portal at the end of <body> — only the html-level
    // attribute can reach it (a subtree wrapper never could)
    expect(await getBg(content)).not.toBe(lightBg);
    expect(await rendersAs(content, 'background-color', DARK_BG_RAISED)).toBe(true);
    expect(await getColor(text)).not.toBe(lightColor);
  });

  test('portaled Menu popup frame and item flip to dark values', async ({ page }) => {
    const popup = page.locator('[data-testid="dark-portal-menu-popup"]');
    const item = page.locator('[data-testid="dark-portal-menu-item"]');

    const lightBg = await getBg(popup);
    const lightColor = await getColor(item);

    await enableHtmlDark(page);

    // menu popup defaults are primary+outline, so its surface consumes
    // --color-bg-raised like a Card: one step above the page (gray-900 in dark)
    expect(await getBg(popup)).not.toBe(lightBg);
    expect(await rendersAs(popup, 'background-color', DARK_BG_RAISED)).toBe(true);
    expect(await getColor(item)).not.toBe(lightColor);
  });

  test('a menu item hover shows on the raised menu', async ({ page }) => {
    const popup = page.locator('[data-testid="dark-portal-menu-popup"]');
    const item = page.locator('[data-testid="dark-portal-menu-item"]');

    await enableHtmlDark(page);
    // the menu is fixed to its trigger at the end of the page: bring the trigger into view first
    await page.locator('[data-testid="dark-portal-menu-trigger"]').evaluate(el => el.scrollIntoView({ block: 'center' }));
    await item.hover();

    // the hover was gray-900, the color the menu now has; it is gray-800
    await expect.poll(() => rendersAs(item, 'background-color', DARK_BG_HOVER)).toBe(true);
    expect(await getBg(item)).not.toBe(await getBg(popup));
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

  test('data-theme="light" under html-dark is a light island: scheme and tokens go back to light', async ({ page }) => {
    const pin = page.locator('[data-testid="dm-light-pin"]');
    const pinText = page.locator('[data-testid="dm-light-pin-text"]');
    const darkBareText = page.locator('[data-testid="dm-dark-bare-text"]');

    const lightColor = await getColor(pinText);

    await enableHtmlDark(page);

    expect(await getStyle(pin, 'color-scheme')).toBe('light');
    expect(await getColor(pinText)).toBe(lightColor);
    expect(await getColor(pinText)).not.toBe(await getColor(darkBareText));
  });

  test('data-theme="light" inside a dark wrapper paints the light surface', async ({ page }) => {
    const island = page.locator('[data-testid="dm-light-island-surface"]');
    expect(await getBg(island)).toBe(await getBg(page.locator('[data-testid="dm-light-surface"]')));
    expect(await getBg(island)).not.toBe(await getBg(page.locator('[data-testid="dm-dark-surface"]')));
    expect(await getBg(page.locator('[data-testid="dm-light-island-button"]')))
      .toBe(await getBg(page.locator('[data-testid="dm-light-button-primary"]')));
    expect(await getColor(page.locator('[data-testid="dm-light-island-text"]')))
      .toBe(await getColor(page.locator('[data-testid="dm-light-text"]')));
  });

  test('data-theme="light" on html keeps the root tokens', async ({ page }) => {
    const text = page.locator('[data-testid="dm-light-text"]');
    const before = await getColor(text);
    await page.evaluate(() => {
      document.documentElement.style.setProperty('--color-text-primary', 'rgb(1, 2, 3)');
      document.documentElement.dataset.theme = 'light';
    });
    expect(await getColor(text)).not.toBe(before);
    expect(await getColor(text)).toBe('rgb(1, 2, 3)');
  });
});
