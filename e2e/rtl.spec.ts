import { test, expect, getStyle, type Locator } from './base';

// ── RTL: logical utilities flip under dir="rtl" ──────────────────────────────
//
// The theme layer emits LOGICAL direction utilities for start/end-intent
// styling — List indent `ps-(--pl)`, Blockquote accent `border-s-3` +
// `ps-(--pl)`, ListItem icon margin `me-(--gap)`, and the direction-aware
// `text-start` / `text-end` alignment props. In LTR these resolve identically
// to the old physical utilities (left/right), which the LTR control fixtures
// and the pre-existing LTR suites (new-components, no-global-reset) pin. Under
// `dir="rtl"` the computed styles must land on the mirrored physical side.
// `textLeft` / `textRight` keep PHYSICAL semantics by policy and must NOT flip.
//
// Fixtures: `rtl-section` in test-fixtures.tsx renders the same elements once
// as LTR controls and once inside a `dir="rtl"` wrapper.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid]');
});

/** Computed style property in px (local helper — only this spec reads paired sides) */
async function getPx(locator: Locator, property: string): Promise<number> {
  return parseFloat(await getStyle(locator, property));
}

/** Distance from the element's box edges to its rendered text content edges.
 *  getComputedStyle returns the keyword (`start`) for logical text-align, so
 *  visual alignment is asserted geometrically instead. (Local helper.) */
async function getTextOffsets(locator: Locator): Promise<{ fromLeft: number; fromRight: number }> {
  return locator.evaluate((el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const text = range.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    return { fromLeft: text.left - box.left, fromRight: box.right - text.right };
  });
}

// Geometry tolerances: the hugged edge is sub-pixel; the far edge of a short
// line inside a full-width box is hundreds of px. Generous margins keep the
// assertions robust against font metric differences.
const HUG_PX = 5;
const FAR_PX = 20;

// ── List marker indent (ps-(--pl)) ───────────────────────────────────────────

test.describe('List indent under RTL', () => {
  test('marker indent lands on the right under RTL (padding-inline-start)', async ({ page }) => {
    const list = page.locator('[data-testid="rtl-list"]');
    expect(await getPx(list, 'padding-right')).toBeGreaterThan(0);
    expect(await getPx(list, 'padding-left')).toBe(0);
  });

  test('marker indent stays on the left in LTR (no regression)', async ({ page }) => {
    const list = page.locator('[data-testid="ltr-list"]');
    expect(await getPx(list, 'padding-left')).toBeGreaterThan(0);
    expect(await getPx(list, 'padding-right')).toBe(0);
  });
});

// ── Blockquote accent border + indent (border-s-3, ps-(--pl)) ────────────────

test.describe('Blockquote accent under RTL', () => {
  test('accent border flips to the right under RTL (border-inline-start)', async ({ page }) => {
    const el = page.locator('[data-testid="rtl-blockquote"]');
    expect(await getPx(el, 'border-right-width')).toBeGreaterThan(0);
    expect(await getStyle(el, 'border-right-style')).toBe('solid');
    expect(await getPx(el, 'border-left-width')).toBe(0);
  });

  test('indent padding flips to the right under RTL', async ({ page }) => {
    const el = page.locator('[data-testid="rtl-blockquote"]');
    expect(await getPx(el, 'padding-right')).toBeGreaterThan(0);
    expect(await getPx(el, 'padding-left')).toBe(0);
  });

  test('accent border and indent stay on the left in LTR (no regression)', async ({ page }) => {
    const el = page.locator('[data-testid="ltr-blockquote"]');
    expect(await getPx(el, 'border-left-width')).toBeGreaterThan(0);
    expect(await getPx(el, 'border-right-width')).toBe(0);
    expect(await getPx(el, 'padding-left')).toBeGreaterThan(0);
    expect(await getPx(el, 'padding-right')).toBe(0);
  });
});

// ── ListItem icon gap (me-(--gap)) ────────────────────────────────────────────

test.describe('ListItem icon margin under RTL', () => {
  // The icon wrapper is an internal span rendered by ListItem (not reachable
  // via its own data-testid) — located as a class descendant of the testid'd
  // ListItem, same pattern as the shared getSvgWidth descendant query.
  test('icon-to-text gap flips to margin-left under RTL (margin-inline-end)', async ({ page }) => {
    const icon = page.locator('[data-testid="rtl-list-item-icon"] .vane-list-item-icon');
    expect(await getPx(icon, 'margin-left')).toBeGreaterThan(0);
    expect(await getPx(icon, 'margin-right')).toBe(0);
  });

  test('icon-to-text gap stays margin-right in LTR (no regression)', async ({ page }) => {
    const icon = page.locator('[data-testid="ltr-list-item-icon"] .vane-list-item-icon');
    expect(await getPx(icon, 'margin-right')).toBeGreaterThan(0);
    expect(await getPx(icon, 'margin-left')).toBe(0);
  });
});

// ── Text alignment: textStart / textEnd flip, textLeft stays physical ────────

test.describe('Text alignment under RTL', () => {
  test('textStart aligns text to the RIGHT edge under RTL', async ({ page }) => {
    const { fromLeft, fromRight } = await getTextOffsets(page.locator('[data-testid="rtl-text-start"]'));
    expect(fromRight).toBeLessThan(HUG_PX);
    expect(fromLeft).toBeGreaterThan(FAR_PX);
  });

  test('textEnd aligns text to the LEFT edge under RTL', async ({ page }) => {
    const { fromLeft, fromRight } = await getTextOffsets(page.locator('[data-testid="rtl-text-end"]'));
    expect(fromLeft).toBeLessThan(HUG_PX);
    expect(fromRight).toBeGreaterThan(FAR_PX);
  });

  test('textLeft stays physically LEFT under RTL (policy pin)', async ({ page }) => {
    const el = page.locator('[data-testid="rtl-text-left"]');
    // Physical keyword must survive untouched in computed style…
    expect(await getStyle(el, 'text-align')).toBe('left');
    // …and the text must visually hug the left edge despite dir="rtl".
    const { fromLeft, fromRight } = await getTextOffsets(el);
    expect(fromLeft).toBeLessThan(HUG_PX);
    expect(fromRight).toBeGreaterThan(FAR_PX);
  });

  test('textStart resolves as the logical start keyword under RTL', async ({ page }) => {
    // Chromium keeps the logical keyword in computed style ('start'); a future
    // engine resolving it physically would report 'right' — both are correct.
    const align = await getStyle(page.locator('[data-testid="rtl-text-start"]'), 'text-align');
    expect(['start', 'right']).toContain(align);
  });

  test('textStart/textEnd/textLeft behave physically-identical to left/right in LTR (no regression)', async ({ page }) => {
    const start = await getTextOffsets(page.locator('[data-testid="ltr-text-start"]'));
    expect(start.fromLeft).toBeLessThan(HUG_PX);
    expect(start.fromRight).toBeGreaterThan(FAR_PX);

    const end = await getTextOffsets(page.locator('[data-testid="ltr-text-end"]'));
    expect(end.fromRight).toBeLessThan(HUG_PX);
    expect(end.fromLeft).toBeGreaterThan(FAR_PX);

    const left = await getTextOffsets(page.locator('[data-testid="ltr-text-left"]'));
    expect(left.fromLeft).toBeLessThan(HUG_PX);
    expect(left.fromRight).toBeGreaterThan(FAR_PX);
    expect(await getStyle(page.locator('[data-testid="ltr-text-left"]'), 'text-align')).toBe('left');
  });
});
