import { test, expect } from '@playwright/test';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get the computed background-color of an element */
async function getBgColor(page: import('@playwright/test').Page, testId: string): Promise<string> {
  return page.locator(`[data-testid="${testId}"]`).evaluate(
    (el) => getComputedStyle(el).getPropertyValue('background-color'),
  );
}

const TRANSPARENT = 'rgba(0, 0, 0, 0)';

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page }) => {
  await page.goto('/test.html');
  await page.waitForSelector('[data-testid]');
});

// ── Idle background transparency ──

test.describe('NavLink idle background', () => {
  test('outline danger NavLink has transparent idle bg', async ({ page }) => {
    const bg = await getBgColor(page, 'navlink-idle-danger');
    expect(bg).toBe(TRANSPARENT);
  });

  test('filled danger NavLink has transparent idle bg', async ({ page }) => {
    const bg = await getBgColor(page, 'navlink-idle-danger-filled');
    expect(bg).toBe(TRANSPARENT);
  });
});

test.describe('NavLink active background', () => {
  test('active outline danger NavLink has non-transparent bg', async ({ page }) => {
    const bg = await getBgColor(page, 'navlink-active-danger');
    expect(bg).not.toBe(TRANSPARENT);
  });

  test('active filled danger NavLink has non-transparent bg', async ({ page }) => {
    const bg = await getBgColor(page, 'navlink-active-danger-filled');
    expect(bg).not.toBe(TRANSPARENT);
  });
});

test.describe('MenuItem idle background', () => {
  test('danger MenuItem has transparent idle bg', async ({ page }) => {
    const bg = await getBgColor(page, 'menu-item-danger');
    expect(bg).toBe(TRANSPARENT);
  });

  test('primary MenuItem has transparent idle bg', async ({ page }) => {
    const bg = await getBgColor(page, 'menu-item-primary');
    expect(bg).toBe(TRANSPARENT);
  });
});
