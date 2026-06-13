import { test, expect, getBg, TRANSPARENT } from './base';

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid]');
});

// ── Idle background transparency ──

test.describe('NavLink idle background', () => {
  test('outline danger NavLink has transparent idle bg', async ({ page }) => {
    const bg = await getBg(page.locator('[data-testid="navlink-idle-danger"]'));
    expect(bg).toBe(TRANSPARENT);
  });

  test('filled danger NavLink has transparent idle bg', async ({ page }) => {
    const bg = await getBg(page.locator('[data-testid="navlink-idle-danger-filled"]'));
    expect(bg).toBe(TRANSPARENT);
  });
});

test.describe('NavLink active background', () => {
  test('active outline danger NavLink has non-transparent bg', async ({ page }) => {
    const bg = await getBg(page.locator('[data-testid="navlink-active-danger"]'));
    expect(bg).not.toBe(TRANSPARENT);
  });

  test('active filled danger NavLink has non-transparent bg', async ({ page }) => {
    const bg = await getBg(page.locator('[data-testid="navlink-active-danger-filled"]'));
    expect(bg).not.toBe(TRANSPARENT);
  });
});

test.describe('MenuItem idle background', () => {
  test('danger MenuItem has transparent idle bg', async ({ page }) => {
    const bg = await getBg(page.locator('[data-testid="menu-item-danger"]'));
    expect(bg).toBe(TRANSPARENT);
  });

  test('primary MenuItem has transparent idle bg', async ({ page }) => {
    const bg = await getBg(page.locator('[data-testid="menu-item-primary"]'));
    expect(bg).toBe(TRANSPARENT);
  });
});
