import { test, expect, type Locator } from './base';

// ── Helpers ──────────────────────────────────────────────────────────────────

async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

async function getDisplay(locator: Locator): Promise<string> {
  return getStyle(locator, 'display');
}

async function getFlexDirection(locator: Locator): Promise<string> {
  return getStyle(locator, 'flex-direction');
}

async function getFontSize(locator: Locator): Promise<number> {
  const fs = await getStyle(locator, 'font-size');
  return parseFloat(fs);
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
