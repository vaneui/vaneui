import { test, expect } from './base';

// B1/B4: a bottom-placed popup whose anchor is pinned to the viewport bottom is
// flipped up by the browser (position-try-fallbacks). data-placement — which
// drives the arrow — must follow the ACTUAL rendered side, not the requested
// one. Before the fix it stayed "bottom-start" and the arrow pointed away.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  // the popup is portaled to <body>; the section itself is zero-height
  await page.waitForSelector('[data-testid="arrow-flip-popup"]');
});

test.describe('Popup arrow / data-placement flip (B1/B4)', () => {
  test('data-placement reflects the actual flipped side, not the requested one', async ({ page }) => {
    const popup = page.locator('[data-testid="arrow-flip-popup"]');
    await expect(popup).toBeVisible();
    // requested bottomStart → browser flips up → measured top-start (B4)
    await expect.poll(async () => popup.getAttribute('data-placement')).toMatch(/^top/);
  });

  test('the popup renders above its bottom-pinned anchor', async ({ page }) => {
    const popup = page.locator('[data-testid="arrow-flip-popup"]');
    const anchor = page.locator('[data-testid="arrow-flip-anchor"]');
    const popupBox = await popup.boundingBox();
    const anchorBox = await anchor.boundingBox();
    expect(popupBox).not.toBeNull();
    expect(anchorBox).not.toBeNull();
    // popup's bottom edge is at/above the anchor top → it flipped up
    expect(popupBox!.y + popupBox!.height).toBeLessThanOrEqual(anchorBox!.y + 4);
  });

  test('the arrow sits on the popup edge nearest the anchor (B1)', async ({ page }) => {
    const popup = page.locator('[data-testid="arrow-flip-popup"]');
    const arrow = popup.locator('.vane-popup-arrow');
    await expect(arrow).toBeAttached();
    const popupBox = await popup.boundingBox();
    const arrowBox = await arrow.boundingBox();
    expect(popupBox).not.toBeNull();
    expect(arrowBox).not.toBeNull();
    // flipped-up popup → arrow on the popup's BOTTOM half, pointing down toward
    // the anchor below (driven by [data-placement^="top"] in rules.css)
    const arrowCenterY = arrowBox!.y + arrowBox!.height / 2;
    const popupMidY = popupBox!.y + popupBox!.height / 2;
    expect(arrowCenterY).toBeGreaterThan(popupMidY);
  });
});

// ── Popup positioning bug fixes (2026-08-10) ──────────────────────────────────

type Rect = { left: number; top: number; right: number; bottom: number; width: number; height: number };
async function rectOf(loc: import('./base').Locator): Promise<Rect> {
  return loc.evaluate((el) => {
    const b = el.getBoundingClientRect();
    return { left: b.left, top: b.top, right: b.right, bottom: b.bottom, width: b.width, height: b.height };
  });
}
async function settle(page: import('./base').Page) {
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null)))));
  await page.waitForTimeout(50);
}

test.describe('Popup positioning bug fixes (2026-08-10)', () => {
  // BUG-03: a popup wider than the viewport is capped, not run off-screen.
  test('a popup wider than the viewport stays within it (320px)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.locator('[data-testid="pos-wide-anchor"]').click();
    const popup = page.locator('[data-testid="pos-wide-popup"]');
    await expect(popup).toBeVisible();
    await settle(page);
    const p = await rectOf(popup);
    const vw = await page.evaluate(() => window.innerWidth);
    expect(p.left).toBeGreaterThanOrEqual(-1);
    expect(p.right).toBeLessThanOrEqual(vw + 1);
  });

  // BUG-04: the arrow points at the anchor for a start-aligned popup.
  test('the arrow points at the anchor for placeBottomStart', async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 800 });
    await page.locator('[data-testid="pos-arrow-anchor"]').click();
    const popup = page.locator('[data-testid="pos-arrow-popup"]');
    await expect(popup).toBeVisible();
    await settle(page);
    const arrow = await rectOf(popup.locator('.vane-popup-arrow'));
    const anchor = await rectOf(page.locator('[data-testid="pos-arrow-anchor"]'));
    const arrowCx = arrow.left + arrow.width / 2;
    const anchorCx = anchor.left + anchor.width / 2;
    expect(Math.abs(arrowCx - anchorCx)).toBeLessThanOrEqual(anchor.width / 2 + arrow.width);
  });

  // BUG-05: the default overflow box does not clip the arrow.
  test('the arrow is not clipped by the popup overflow box', async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 800 });
    await page.locator('[data-testid="pos-arrow-anchor"]').click();
    const popup = page.locator('[data-testid="pos-arrow-popup"]');
    await expect(popup).toBeVisible();
    await settle(page);
    const overflow = await popup.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { x: cs.overflowX, y: cs.overflowY };
    });
    const p = await rectOf(popup);
    const a = await rectOf(popup.locator('.vane-popup-arrow'));
    const protrudes = a.top < p.top - 0.5 || a.bottom > p.bottom + 0.5 || a.left < p.left - 0.5 || a.right > p.right + 0.5;
    const boxClips = overflow.x !== 'visible' || overflow.y !== 'visible';
    expect(protrudes && boxClips).toBe(false);
  });

  // BUG-10: data-placement follows the actual alignment after an inline flip.
  test('data-placement suffix matches the rendered alignment near a viewport edge', async ({ page }) => {
    await page.setViewportSize({ width: 420, height: 800 });
    await page.locator('[data-testid="pos-edge-anchor"]').click();
    const popup = page.locator('[data-testid="pos-edge-popup"]');
    await expect(popup).toBeVisible();
    await settle(page);
    const dp = await popup.getAttribute('data-placement');
    const p = await rectOf(popup);
    const a = await rectOf(page.locator('[data-testid="pos-edge-anchor"]'));
    const endAligned = Math.abs(p.right - a.right) < Math.abs(p.left - a.left);
    expect(dp).toMatch(endAligned ? /-end$/ : /-start$/);
  });

  // BUG-06: the JS fallback shifts (not flips) on horizontal overflow.
  test('the JS fallback does not vertical-flip on horizontal overflow', async ({ page, testPage }) => {
    await page.addInitScript(() => {
      const orig = CSS.supports.bind(CSS);
      // @ts-expect-error override for test
      CSS.supports = (a: string, b?: string) =>
        String(a).includes('position-area') || String(a).includes('anchor') ? false : orig(a as string, b as string);
    });
    await page.goto(testPage);
    await page.setViewportSize({ width: 420, height: 800 });
    await page.locator('[data-testid="pos-fb-anchor"]').click();
    const popup = page.locator('[data-testid="pos-fb-popup"]');
    await expect(popup).toBeVisible();
    await settle(page);
    const dp = await popup.getAttribute('data-placement');
    const p = await rectOf(popup);
    const a = await rectOf(page.locator('[data-testid="pos-fb-anchor"]'));
    expect(dp).toMatch(/^bottom/);
    expect(p.top).toBeGreaterThanOrEqual(a.bottom - 2);
  });
});
