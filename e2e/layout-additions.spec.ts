import { test, expect, getBg, getStyle, getBorderTopColor, type Locator, type Page } from './base';

// Divided grid, strong border, NavLink indicator and selection, shadow size, layout pointer-events.

/** Resolve a CSS expression to a computed color inside `el`, so var() refs resolve in its scope */
async function colorIn(el: Locator, css: string): Promise<string> {
  return el.evaluate((node, value) => {
    const probe = document.createElement('span');
    probe.style.color = value;
    node.appendChild(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  }, css);
}

const byId = (page: Page, id: string) => page.locator(`[data-testid="${id}"]`);

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="layout-additions-section"]');
});

test.describe('Divided grid', () => {
  test('cells sit 1px apart and their outlines paint the divider color into the gap', async ({ page }) => {
    const grid = byId(page, 'grid-divided');
    const cell = byId(page, 'grid-divided-cell');
    expect(await getStyle(grid, 'column-gap')).toBe('1px');
    expect(await getStyle(grid, 'row-gap')).toBe('1px');
    expect(await getStyle(cell, 'outline-style')).toBe('solid');
    expect(await getStyle(cell, 'outline-width')).toBe('1px');
    expect(await getStyle(cell, 'outline-color')).toBe(await colorIn(grid, 'var(--divider-color)'));
  });
});

test.describe('Strong border', () => {
  test('the border takes the appearance strong color, not the soft border color', async ({ page }) => {
    const soft = byId(page, 'card-soft-border');
    const strong = byId(page, 'card-strong-border');
    expect(await getBorderTopColor(strong)).toBe(await colorIn(strong, 'var(--focus-color)'));
    expect(await getBorderTopColor(strong)).not.toBe(await getBorderTopColor(soft));
  });

  test('a filled card, whose border is otherwise transparent, shows the strong color', async ({ page }) => {
    const filled = byId(page, 'card-strong-border-filled');
    expect(await getBorderTopColor(filled)).toBe(await colorIn(filled, 'var(--focus-color)'));
    expect(await getBorderTopColor(filled)).not.toBe('rgba(0, 0, 0, 0)');
  });
});

test.describe('NavLink indicator', () => {
  test('indicatorStart draws a 1px divider rail, 2px accent when active', async ({ page }) => {
    const rail = byId(page, 'nav-rail');
    const active = byId(page, 'nav-rail-active');
    const accent = await colorIn(active, 'var(--color-focus-accent)');
    expect(await getStyle(rail, 'box-shadow')).toContain(`${await colorIn(rail, 'var(--divider-color)')} 1px 0px 0px 0px inset`);
    expect(await getStyle(active, 'box-shadow')).toContain(`${accent} 2px 0px 0px 0px inset`);
  });

  test('indicatorStart flips to the right edge in RTL', async ({ page }) => {
    const rtl = byId(page, 'nav-rail-rtl');
    const accent = await colorIn(rtl, 'var(--color-focus-accent)');
    expect(await getStyle(rtl, 'box-shadow')).toContain(`${accent} -2px 0px 0px 0px inset`);
  });

  test('indicatorBottom draws a bottom bar only while active', async ({ page }) => {
    const tab = byId(page, 'nav-tab');
    const active = byId(page, 'nav-tab-active');
    const accent = await colorIn(active, 'var(--color-focus-accent)');
    expect(await getStyle(tab, 'box-shadow')).not.toContain(accent);
    const shadow = await getStyle(active, 'box-shadow');
    expect(shadow).toContain(`${accent} 0px -1px 0px 0px inset`);
    expect(shadow).toContain(`${accent} 0px 1px 0px 0px`);
  });

  test('the indicator does not change the link size', async ({ page }) => {
    const plain = await byId(page, 'nav-tab').boundingBox();
    const active = await byId(page, 'nav-tab-active').boundingBox();
    expect(active?.height).toBe(plain?.height);
  });
});

test.describe('Selected NavLink option', () => {
  test('aria-selected="true" takes the hover fill; an unselected option does not', async ({ page }) => {
    const selected = byId(page, 'nav-option-selected');
    const option = byId(page, 'nav-option');
    expect(await getBg(selected)).toBe(await colorIn(selected, 'var(--bg-hover-color)'));
    expect(await getBg(option)).not.toBe(await getBg(selected));
  });

  test('a selected option with indicatorStart shows the accent mark', async ({ page }) => {
    const rail = byId(page, 'nav-option-rail');
    const accent = await colorIn(rail, 'var(--color-focus-accent)');
    expect(await getStyle(rail, 'box-shadow')).toContain(`${accent} 2px 0px 0px 0px inset`);
  });
});

test.describe('Shadow size', () => {
  test('shadowXs on a large Card matches an xs Card shadow', async ({ page }) => {
    expect(await getStyle(byId(page, 'card-lg-shadow-xs'), 'box-shadow'))
      .toBe(await getStyle(byId(page, 'card-xs-shadow'), 'box-shadow'));
  });

  test('shadowXl on a default Card matches an xl Card shadow', async ({ page }) => {
    const xl = await getStyle(byId(page, 'card-xl-shadow'), 'box-shadow');
    expect(xl).not.toBe('none');
    expect(await getStyle(byId(page, 'card-shadow-xl'), 'box-shadow')).toBe(xl);
  });

  test('shadowLg on a Button keeps the UI ramp', async ({ page }) => {
    expect(await getStyle(byId(page, 'button-shadow-lg'), 'box-shadow'))
      .toBe(await getStyle(byId(page, 'button-lg-shadow'), 'box-shadow'));
  });
});

test.describe('Layout pointer events, whitespace and Img noShrink', () => {
  test('Row takes pointer-events and white-space', async ({ page }) => {
    const row = byId(page, 'row-pe-nowrap');
    expect(await getStyle(row, 'pointer-events')).toBe('none');
    expect(await getStyle(row, 'white-space')).toBe('nowrap');
  });

  test('a noShrink Img gets flex-shrink 0 and keeps its width in a narrow row', async ({ page }) => {
    expect(await getStyle(byId(page, 'img-no-shrink'), 'flex-shrink')).toBe('0');
    expect(await getStyle(byId(page, 'img-shrinks'), 'flex-shrink')).toBe('1');
    expect((await byId(page, 'img-no-shrink').boundingBox())?.width).toBe(48);
  });
});

test.describe('Responsive width and show', () => {
  test('mobileWFull fills the row on mobile and keeps the fit width above', async ({ page }) => {
    const col = byId(page, 'col-mobile-wfull');
    const button = byId(page, 'button-mobile-wfull');
    await page.setViewportSize({ width: 600, height: 700 });
    expect((await button.boundingBox())!.width).toBeCloseTo((await col.boundingBox())!.width, 0);
    await page.setViewportSize({ width: 1300, height: 800 });
    expect((await button.boundingBox())!.width).toBeLessThan((await col.boundingBox())!.width / 2);
  });

  test('tabletShow shows only below 1024px, and mobileHide tabletShow only between 768 and 1024px', async ({ page }) => {
    const button = byId(page, 'button-tablet-show');
    const band = byId(page, 'row-tablet-band');
    await page.setViewportSize({ width: 600, height: 700 });
    await expect(button).toBeVisible();
    await expect(band).toBeHidden();
    await page.setViewportSize({ width: 900, height: 700 });
    await expect(button).toBeVisible();
    await expect(band).toBeVisible();
    await page.setViewportSize({ width: 1300, height: 800 });
    await expect(button).toBeHidden();
    await expect(band).toBeHidden();
  });
});
