import { test, expect, getStyle, getFontSize, type Locator } from './base';

// ── Helpers (single-spec) ─────────────────────────────────────────────────────

async function getDisplay(locator: Locator): Promise<string> {
  return getStyle(locator, 'display');
}

async function getFlexDirection(locator: Locator): Promise<string> {
  return getStyle(locator, 'flex-direction');
}

// Breakpoints from tokens.css:
//   mobile:  48rem = 768px
//   tablet:  64rem = 1024px
//   desktop: 80rem = 1280px

const WIDE = { width: 1440, height: 900 };       // above desktop (1280)
const DESKTOP = { width: 1200, height: 900 };     // below desktop, above tablet
const TABLET = { width: 900, height: 900 };       // below tablet, above mobile
const MOBILE = { width: 375, height: 812 };       // below mobile

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  // Start at wide viewport so all elements are visible for the selector wait
  await page.setViewportSize(WIDE);
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="responsive-section"]');
});

// ── mobileCol ────────────────────────────────────────────────────────────────

test.describe('mobileCol', () => {
  test('row direction at wide viewport', async ({ page }) => {
    await page.setViewportSize(WIDE);
    const el = page.locator('[data-testid="responsive-mobileCol"]');
    expect(await getFlexDirection(el)).toBe('row');
  });

  test('column direction at mobile viewport', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    const el = page.locator('[data-testid="responsive-mobileCol"]');
    expect(await getFlexDirection(el)).toBe('column');
  });

  test('row direction at tablet viewport (above mobile breakpoint)', async ({ page }) => {
    await page.setViewportSize(TABLET);
    const el = page.locator('[data-testid="responsive-mobileCol"]');
    expect(await getFlexDirection(el)).toBe('row');
  });
});

// ── tabletCol ────────────────────────────────────────────────────────────────

test.describe('tabletCol', () => {
  test('row direction at wide viewport', async ({ page }) => {
    await page.setViewportSize(WIDE);
    const el = page.locator('[data-testid="responsive-tabletCol"]');
    expect(await getFlexDirection(el)).toBe('row');
  });

  test('column direction at tablet viewport', async ({ page }) => {
    await page.setViewportSize(TABLET);
    const el = page.locator('[data-testid="responsive-tabletCol"]');
    expect(await getFlexDirection(el)).toBe('column');
  });

  test('column direction at mobile viewport', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    const el = page.locator('[data-testid="responsive-tabletCol"]');
    expect(await getFlexDirection(el)).toBe('column');
  });
});

// ── mobileHide ───────────────────────────────────────────────────────────────

test.describe('mobileHide', () => {
  test('visible at wide viewport', async ({ page }) => {
    await page.setViewportSize(WIDE);
    const el = page.locator('[data-testid="responsive-mobileHide"]');
    expect(await getDisplay(el)).not.toBe('none');
  });

  test('hidden at mobile viewport', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    const el = page.locator('[data-testid="responsive-mobileHide"]');
    expect(await getDisplay(el)).toBe('none');
  });
});

// ── tabletHide ───────────────────────────────────────────────────────────────

test.describe('tabletHide', () => {
  test('visible at wide viewport', async ({ page }) => {
    await page.setViewportSize(WIDE);
    const el = page.locator('[data-testid="responsive-tabletHide"]');
    expect(await getDisplay(el)).not.toBe('none');
  });

  test('hidden at tablet viewport', async ({ page }) => {
    await page.setViewportSize(TABLET);
    const el = page.locator('[data-testid="responsive-tabletHide"]');
    expect(await getDisplay(el)).toBe('none');
  });

  test('hidden at mobile viewport', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    const el = page.locator('[data-testid="responsive-tabletHide"]');
    expect(await getDisplay(el)).toBe('none');
  });
});

// ── desktopHide ──────────────────────────────────────────────────────────────

test.describe('desktopHide', () => {
  test('visible at wide viewport (above 1280px)', async ({ page }) => {
    await page.setViewportSize(WIDE);
    const el = page.locator('[data-testid="responsive-desktopHide"]');
    expect(await getDisplay(el)).not.toBe('none');
  });

  test('hidden at desktop viewport (below 1280px)', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    const el = page.locator('[data-testid="responsive-desktopHide"]');
    expect(await getDisplay(el)).toBe('none');
  });
});

// ── Responsive typography ────────────────────────────────────────────────────

test.describe('Responsive typography scaling', () => {
  test('PageTitle font-size decreases at smaller viewports', async ({ page }) => {
    const el = page.locator('[data-testid="responsive-pagetitle"]');

    await page.setViewportSize(WIDE);
    const wideFs = await getFontSize(el);

    await page.setViewportSize(TABLET);
    const tabletFs = await getFontSize(el);

    await page.setViewportSize(MOBILE);
    const mobileFs = await getFontSize(el);

    expect(wideFs).toBeGreaterThan(tabletFs);
    expect(tabletFs).toBeGreaterThan(mobileFs);
  });

  test('SectionTitle font-size decreases at smaller viewports', async ({ page }) => {
    const el = page.locator('[data-testid="responsive-sectiontitle"]');

    await page.setViewportSize(WIDE);
    const wideFs = await getFontSize(el);

    await page.setViewportSize(TABLET);
    const tabletFs = await getFontSize(el);

    await page.setViewportSize(MOBILE);
    const mobileFs = await getFontSize(el);

    expect(wideFs).toBeGreaterThan(tabletFs);
    expect(tabletFs).toBeGreaterThan(mobileFs);
  });

  test('Title font-size decreases at smaller viewports', async ({ page }) => {
    const el = page.locator('[data-testid="responsive-title"]');

    await page.setViewportSize(WIDE);
    const wideFs = await getFontSize(el);

    await page.setViewportSize(TABLET);
    const tabletFs = await getFontSize(el);

    await page.setViewportSize(MOBILE);
    const mobileFs = await getFontSize(el);

    expect(wideFs).toBeGreaterThan(tabletFs);
    expect(tabletFs).toBeGreaterThan(mobileFs);
  });
});

// ── Bug-fix regressions (2026-08-10) ──────────────────────────────────────────

test.describe('Responsive bug fixes (2026-08-10)', () => {
  // BUG-08: the breakpoint is exclusive (< N), not inclusive — 768px is desktop.
  test('mobileStack boundary is exclusive: row at 768px, column at 767px', async ({ page }) => {
    const el = page.locator('[data-testid="responsive-mobileCol"]');
    await page.setViewportSize({ width: 768, height: 800 });
    expect(await getFlexDirection(el)).toBe('row');
    await page.setViewportSize({ width: 767, height: 800 });
    expect(await getFlexDirection(el)).toBe('column');
  });

  // BUG-11: combining mobileStack + tabletStack resolves to the union (< 1024px).
  test('mobileStack + tabletStack stack as their union (column below 1024px)', async ({ page }) => {
    const el = page.locator('[data-testid="responsive-combo-stack"]');
    await page.setViewportSize({ width: 1100, height: 800 });
    expect(await getFlexDirection(el)).toBe('row');
    await page.setViewportSize({ width: 900, height: 800 });
    expect(await getFlexDirection(el)).toBe('column');
    await page.setViewportSize({ width: 700, height: 800 });
    expect(await getFlexDirection(el)).toBe('column');
  });

  // BUG-07: a long unbreakable token wraps inside its Card instead of overflowing.
  test('long unbreakable text does not overflow its Card at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const m = await page
      .locator('[data-testid="responsive-longurl-card"]')
      .evaluate((el) => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));
    expect(m.scrollWidth).toBeLessThanOrEqual(m.clientWidth + 2);
  });
});

// ── Section gutter cap ───────────────────────────────────────────────────────
// A page gutter is bounded by the viewport, not by the section's vertical rhythm,
// so --px-unit-* caps independently of --py-unit-* from lg up.

test.describe('Section horizontal gutter', () => {
  const padX = (l: Locator) => getStyle(l, 'padding-left').then(parseFloat);
  const padY = (l: Locator) => getStyle(l, 'padding-top').then(parseFloat);

  test('xl section caps its mobile gutter while keeping its vertical rhythm', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    const el = page.locator('[data-testid="responsive-gutter-xl"]');
    expect(await padX(el)).toBe(16);
    expect(await padY(el)).toBe(32); // vertical still scales with the size prop
  });

  test('xl and md sections share the same mobile gutter', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    const xl = await padX(page.locator('[data-testid="responsive-gutter-xl"]'));
    const md = await padX(page.locator('[data-testid="responsive-gutter-md"]'));
    expect(xl).toBe(md);
  });

  test('the gutter still grows with the size prop on desktop', async ({ page }) => {
    await page.setViewportSize(WIDE);
    const xl = await padX(page.locator('[data-testid="responsive-gutter-xl"]'));
    const md = await padX(page.locator('[data-testid="responsive-gutter-md"]'));
    expect(xl).toBeGreaterThan(md);
    expect(xl).toBe(96);
  });
});
