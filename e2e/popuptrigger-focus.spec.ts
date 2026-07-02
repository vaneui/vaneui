import { test, expect } from './base';

// R9: a hover/focus-triggered popup and its trigger form one focus group —
// moving focus INTO the popup must keep it open (so keyboard users can reach
// its content), and it closes only when focus leaves the whole group.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="pt-trigger"]');
});

test.describe('PopupTrigger focus group (R9)', () => {
  test('keeps the popup open when focus moves into it', async ({ page }) => {
    await page.locator('[data-testid="pt-trigger"]').focus();
    await expect(page.locator('[data-testid="pt-popup"]')).toBeVisible();

    await page.locator('[data-testid="pt-popup-btn"]').focus();
    // focus is still within the group → popup stays open
    await expect(page.locator('[data-testid="pt-popup"]')).toBeVisible();
    await expect(page.locator('[data-testid="pt-popup-btn"]')).toBeFocused();
  });

  test('closes when focus leaves the trigger and the popup', async ({ page }) => {
    await page.locator('[data-testid="pt-trigger"]').focus();
    await expect(page.locator('[data-testid="pt-popup"]')).toBeVisible();

    await page.locator('[data-testid="pt-outside"]').focus();
    await expect(page.locator('[data-testid="pt-popup"]')).toBeHidden();
  });
});
