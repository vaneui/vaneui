import { test, expect, type Page } from './base';

// Regression tests reproducing the confirmed responsive/layout bugs from
// vaneui-qa-bug-report-2026-08-10.md. Each asserts the CORRECT / documented
// behavior, so it FAILS against the current build and passes once fixed.
// Run: npx playwright test --config probe.config.ts e2e/bug-repro-responsive.qa.ts

async function flexDir(page: Page, id: string): Promise<string> {
  return page.locator(`[data-testid="${id}"]`).evaluate((el) => getComputedStyle(el).flexDirection);
}

test('BUG-07: long unbreakable text must wrap inside its Card (no overflow @375px)', async ({ page, testPage }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="probe-longurl"]');
  const m = await page
    .locator('[data-testid="probe-longurl"]')
    .evaluate((el) => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));
  expect(
    m.scrollWidth,
    `card content (${m.scrollWidth}px) must not exceed the card width (${m.clientWidth}px) — long text should wrap`,
  ).toBeLessThanOrEqual(m.clientWidth + 2);
});

test('BUG-08: mobileStack boundary is exclusive (< 768px), matching the corrected docs', async ({ page, testPage }) => {
  // Resolved by doc correction: the breakpoint is exclusive (standard, avoids the
  // 1px overlap). 768px is desktop (row); 767px is below the breakpoint (column).
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="probe-mobilestack"]');
  await page.setViewportSize({ width: 768, height: 800 });
  expect(await flexDir(page, 'probe-mobilestack'), 'at exactly 768px the row stays row').toBe('row');
  await page.setViewportSize({ width: 767, height: 800 });
  expect(await flexDir(page, 'probe-mobilestack'), 'at 767px the row stacks to column').toBe('column');
});

test('BUG-11: mobileStack + tabletStack must both take effect (column @900px)', async ({ page, testPage }) => {
  await page.setViewportSize({ width: 900, height: 800 });
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="probe-combo"]');
  expect(
    await flexDir(page, 'probe-combo'),
    'tabletStack should stack the row at 900px even when mobileStack is also set',
  ).toBe('column');
});
