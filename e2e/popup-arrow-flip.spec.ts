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
