import { test, expect, getStyle, getBg, type Page } from './base';

// Components composed the way real screens use them: a field beside its button, text in rows and
// tables, radios before a choice, menus and tooltips on small triggers, focus after a dialog.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="composition-section"]');
});

const height = (page: Page, id: string) =>
  page.locator(`[data-testid="${id}"]`).evaluate(el => el.getBoundingClientRect().height);

for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
  test(`Input, Select, Button and IconButton share one height at ${size}`, async ({ page }) => {
    const button = await height(page, `cc-h-button-${size}`);
    expect(await height(page, `cc-h-iconbutton-${size}`)).toBeCloseTo(button, 0);
    expect(await height(page, `cc-h-input-${size}`)).toBeCloseTo(button, 0);
    // Chromium's styleable select keeps a 24px floor, so xs may sit 0.4px taller
    expect(Math.abs(await height(page, `cc-h-select-${size}`) - button)).toBeLessThanOrEqual(0.5);
  });
}

test('a short Text beside a full-width Input stays on one line', async ({ page }) => {
  const text = page.locator('[data-testid="cc-row-text"]');
  const lineHeight = parseFloat(await getStyle(text, 'line-height'));
  expect(await height(page, 'cc-row-text')).toBeLessThanOrEqual(lineHeight + 1);
});

test('a price in a narrow table cell stays on one line', async ({ page }) => {
  const price = page.locator('[data-testid="cc-price"]');
  const lineHeight = parseFloat(await getStyle(price, 'line-height'));
  expect(await height(page, 'cc-price')).toBeLessThanOrEqual(lineHeight + 1);
});

test('an svg inside running text stays inline', async ({ page }) => {
  const text = page.locator('[data-testid="cc-inline-svg"]');
  const lineHeight = parseFloat(await getStyle(text, 'line-height'));
  expect(await height(page, 'cc-inline-svg')).toBeLessThanOrEqual(lineHeight + 1);
  expect(await text.locator('svg').evaluate(el => getComputedStyle(el).display)).toBe('inline-block');
});

test('a radio in an unselected group paints the unchecked surface, not the checked fill', async ({ page }) => {
  const unselected = await getBg(page.locator('[data-testid="cc-radio-unselected"]'));
  const unchecked = await getBg(page.locator('[data-testid="cc-radio-unchecked-in-valued-group"]'));
  expect(unselected).toBe(unchecked);
});

test('the active NavLink is bold and hover does not erase its tint', async ({ page }) => {
  const active = page.locator('[data-testid="cc-nav-active"]');
  expect(Number(await getStyle(active, 'font-weight'))).toBeGreaterThanOrEqual(600);
  const resting = await getBg(active);
  await active.hover();
  expect(await getBg(active)).toBe(resting);
  expect(resting).not.toBe(await getBg(page.locator('[data-testid="cc-nav-idle"]')));
});

test('a Link focus ring is drawn in the link color', async ({ page }) => {
  const link = page.locator('[data-testid="cc-link"]');
  await link.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  expect(await getStyle(link, 'outline-color')).toBe(await getStyle(link, 'color'));
});

test('a tooltip on a small icon button keeps its own width on one line', async ({ page }) => {
  const anchor = page.locator('[data-testid="cc-tooltip-anchor"]');
  const anchorBox = (await anchor.boundingBox())!;
  const tooltipId = await anchor.getAttribute('aria-describedby');
  const tooltip = page.locator(`[id="${tooltipId}"]`);
  const box = (await tooltip.boundingBox())!;
  expect(box.width).toBeGreaterThan(anchorBox.width);
  const fontSize = parseFloat(await getStyle(tooltip, 'font-size'));
  expect(box.height).toBeLessThan(fontSize * 3.5);
});

test('menu items sit flush, with no popup gap between them', async ({ page }) => {
  await page.locator('[data-testid="cc-menu-trigger"]').click();
  const first = (await page.locator('[data-testid="cc-menu-item-1"]').boundingBox())!;
  const second = (await page.locator('[data-testid="cc-menu-item-2"]').boundingBox())!;
  expect(second.y - (first.y + first.height)).toBeLessThanOrEqual(0.5);
});

test('a Modal returns focus to a trigger that stays mounted', async ({ page }) => {
  await page.locator('[data-testid="cc-modal-open"]').click();
  await expect(page.locator('[data-testid="cc-modal-inside"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-testid="cc-modal-open"]')).toBeFocused();
});

test('Escape in a Menu inside a Modal closes only the menu', async ({ page }) => {
  await page.locator('[data-testid="cc-menu-modal-open"]').click();
  await page.locator('[data-testid="cc-inner-menu-trigger"]').click();
  await expect(page.locator('[data-testid="cc-inner-menu-item"]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-testid="cc-inner-menu-item"]')).toBeHidden();
  await expect(page.locator('[data-testid="cc-menu-modal"]')).toBeVisible();
  await expect(page.locator('[data-testid="cc-inner-menu-trigger"]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-testid="cc-menu-modal"]')).toBeHidden();
});

test('an end-aligned menu stays at its trigger under RTL', async ({ page }) => {
  await page.evaluate(() => { document.documentElement.dir = 'rtl'; });
  const trigger = page.locator('[data-testid="cc-end-trigger"]');
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  const menu = page.locator('[data-testid="cc-end-menu"]');
  await expect(menu).toBeVisible();
  const t = (await trigger.boundingBox())!;
  const m = (await menu.boundingBox())!;
  // the menu overlaps the trigger's column instead of detaching to the far viewport edge
  expect(m.x).toBeLessThan(t.x + t.width);
  expect(m.x + m.width).toBeGreaterThan(t.x);
});

test('whole-page dark mode paints the page canvas', async ({ page }) => {
  await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
  const html = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
  expect(html).not.toBe('rgba(0, 0, 0, 0)');
});
