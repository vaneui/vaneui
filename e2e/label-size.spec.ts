import { test, expect, getFontSize, getStyle } from './base';

// The whole point of LabelSizeContext is that a nested Input/Checkbox visually
// adopts the wrapping Label's size. Unit tests pin the propagated `data-size`
// attribute; this spec pins the user-visible OUTCOME — the child's COMPUTED
// size actually changes and matches a standalone control of the same size.
// (Per .claude/rules/e2e-testing.md, computed size scaling is e2e's job.)

async function boxWidth(page: import('./base').Page, testId: string): Promise<number> {
  return parseFloat(await getStyle(page.locator(`[data-testid="${testId}"]`), 'width'));
}

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="label-size-section"]');
});

test.describe('Label propagates its size to nested controls (computed styles)', () => {
  test('Input font-size scales with the wrapping Label size', async ({ page }) => {
    const lg = await getFontSize(page.locator('[data-testid="lbl-lg-input"]'));
    const sm = await getFontSize(page.locator('[data-testid="lbl-sm-input"]'));
    expect(lg).toBeGreaterThan(sm);
  });

  test('propagated Input size matches a standalone Input of the same size', async ({ page }) => {
    const lblLg = await getFontSize(page.locator('[data-testid="lbl-lg-input"]'));
    const stdLg = await getFontSize(page.locator('[data-testid="std-lg-input"]'));
    expect(lblLg).toBeCloseTo(stdLg, 1);

    const lblSm = await getFontSize(page.locator('[data-testid="lbl-sm-input"]'));
    const stdSm = await getFontSize(page.locator('[data-testid="std-sm-input"]'));
    expect(lblSm).toBeCloseTo(stdSm, 1);
  });

  test('Checkbox box size scales with the wrapping Label size', async ({ page }) => {
    expect(await boxWidth(page, 'lbl-lg-checkbox')).toBeGreaterThan(
      await boxWidth(page, 'lbl-sm-checkbox'),
    );
  });

  test('propagated Checkbox size matches a standalone Checkbox of the same size', async ({ page }) => {
    expect(await boxWidth(page, 'lbl-lg-checkbox')).toBeCloseTo(await boxWidth(page, 'std-lg-checkbox'), 0);
    expect(await boxWidth(page, 'lbl-sm-checkbox')).toBeCloseTo(await boxWidth(page, 'std-sm-checkbox'), 0);
  });
});
