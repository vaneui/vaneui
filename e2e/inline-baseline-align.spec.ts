import { test, expect } from './base';

// Code / Kbd / Mark are inline, text-level elements: when inlined in running
// text their own text baseline must sit ON the surrounding text's baseline, so
// the boxed glyphs line up with the prose around them.
//
// Regression guard: these components used to carry `align-middle`
// (vertical-align: middle) in their base class. On a padded, top-heavy inline
// box that centers the BORDER box on the parent x-height, which drags the text
// baseline down (~2-5px depending on font metrics) — the boxed text visibly
// sank below the line. Natural baseline alignment (no vertical-align override)
// makes the baselines coincide regardless of font.
//
// Measurement: each fixture line carries two zero-size inline-block struts with
// `vertical-align: baseline` — one in the parent line, one inside the component.
// A baseline strut's top edge marks the baseline of its formatting context, so
// the difference between the two tops is the component's baseline offset.

/** Top edge (== baseline Y) of a zero-size baseline strut. */
async function strutTop(page: import('@playwright/test').Page, testId: string): Promise<number> {
  return page.locator(`[data-testid="${testId}"]`).evaluate((el) => el.getBoundingClientRect().top);
}

// Baseline-aligned inline elements share the parent baseline exactly, so the
// fixed delta is ~0 for any font. The old `align-middle` sank the text by a
// padding-driven amount that varies with font metrics (measured 1px with the
// harness's system mono, 2-5px with a tall-x-height webfont like JetBrains
// Mono). 0.5px sits above sub-pixel noise on the aligned case yet below the
// smallest regression we've observed.
const BASELINE_TOLERANCE = 0.5;

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="inline-align-section"]');
});

for (const c of ['code', 'kbd', 'mark'] as const) {
  test(`${c} baseline aligns with surrounding text`, async ({ page }) => {
    const parentBaseline = await strutTop(page, `align-${c}-parentbl`);
    const innerBaseline = await strutTop(page, `align-${c}-innerbl`);
    expect(Math.abs(innerBaseline - parentBaseline)).toBeLessThanOrEqual(BASELINE_TOLERANCE);
  });
}
