import { test, expect } from './base';

// B2: a <Menu> nested inside another Menu behaves as a submenu — opening it
// keeps the parent open, it sits to the inline-end side, and ArrowRight/ArrowLeft
// move focus in/out. (Unit tests cover open/close state; this covers the
// focus + placement behavior that needs a real browser.)

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="sm-root-trigger"]');
});

test.describe('Nested submenu (B2)', () => {
  test('opening the submenu keeps the parent menu open', async ({ page }) => {
    await page.click('[data-testid="sm-root-trigger"]');
    await expect(page.locator('[data-testid="sm-submenu-trigger"]')).toBeVisible();

    await page.click('[data-testid="sm-submenu-trigger"]');
    await expect(page.locator('[data-testid="sm-doc1"]')).toBeVisible();
    // parent items are still present → the parent did not close
    await expect(page.locator('[data-testid="sm-new"]')).toBeVisible();
    await expect(page.locator('[data-testid="sm-save"]')).toBeVisible();
  });

  test('the submenu opens to the inline-end side of its trigger', async ({ page }) => {
    await page.click('[data-testid="sm-root-trigger"]');
    await page.click('[data-testid="sm-submenu-trigger"]');
    const triggerBox = await page.locator('[data-testid="sm-submenu-trigger"]').boundingBox();
    const itemBox = await page.locator('[data-testid="sm-doc1"]').boundingBox();
    expect(triggerBox).not.toBeNull();
    expect(itemBox).not.toBeNull();
    expect(itemBox!.x).toBeGreaterThan(triggerBox!.x + triggerBox!.width / 2);
  });

  test('ArrowRight opens the submenu + focuses its first item; ArrowLeft closes it', async ({ page }) => {
    await page.locator('[data-testid="sm-root-trigger"]').focus();
    await page.keyboard.press('ArrowDown'); // open root + focus first item
    await expect(page.locator('[data-testid="sm-new"]')).toBeFocused();

    await page.keyboard.press('ArrowDown'); // → submenu trigger
    await expect(page.locator('[data-testid="sm-submenu-trigger"]')).toBeFocused();

    await page.keyboard.press('ArrowRight'); // open submenu + focus its first item
    await expect(page.locator('[data-testid="sm-doc1"]')).toBeFocused();

    await page.keyboard.press('ArrowLeft'); // close submenu, return focus to trigger
    await expect(page.locator('[data-testid="sm-doc1"]')).toBeHidden();
    await expect(page.locator('[data-testid="sm-submenu-trigger"]')).toBeFocused();
  });
});
