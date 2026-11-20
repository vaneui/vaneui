import { test, expect, getFontSize, type Locator } from './base';

// What a component looks like with no size prop. A field and a button written side by side
// with no props have to line up, and the dense components (Badge, Table) use the 12px and
// 14px steps. Icon has its own scale: an icon next to body text is 20px, not 32px.

const height = (l: Locator) => l.evaluate(el => el.getBoundingClientRect().height);
const byId = (page: import('./base').Page, id: string) => page.locator(`[data-testid="${id}"]`);

test.beforeEach(async ({ page, testPage }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="default-sizes-section"]');
});

test.describe('default sizes', () => {
  test('Input, Select and Button share one height and one font size', async ({ page }) => {
    const button = byId(page, 'ds-button');
    const buttonHeight = await height(button);
    for (const id of ['ds-input', 'ds-select']) {
      expect(await height(byId(page, id)), id).toBeCloseTo(buttonHeight, 1);
      expect(await getFontSize(byId(page, id)), id).toBe(await getFontSize(button));
    }
    expect(await getFontSize(button)).toBe(14);
    expect(await getFontSize(byId(page, 'ds-textarea'))).toBe(14);
  });

  test('a Field sizes its label and its control alike', async ({ page }) => {
    expect(await byId(page, 'ds-field').getAttribute('data-size')).toBe('sm');
    expect(await getFontSize(byId(page, 'ds-field').locator('label'))).toBe(14);
    expect(await getFontSize(byId(page, 'ds-field-input'))).toBe(14);
  });

  test('Badge text is 12px and Table text is 14px', async ({ page }) => {
    expect(await getFontSize(byId(page, 'ds-badge'))).toBe(12);
    expect(await getFontSize(byId(page, 'ds-th'))).toBe(14);
    expect(await getFontSize(byId(page, 'ds-td'))).toBe(14);
  });

  test('Icon draws its glyph at 12, 16, 20, 24 and 32px', async ({ page }) => {
    const expected = { xs: 12, sm: 16, md: 20, lg: 24, xl: 32 } as const;
    for (const [size, px] of Object.entries(expected)) {
      const box = (await byId(page, `ds-icon-${size}`).locator('svg').boundingBox())!;
      expect(box.width, size).toBe(px);
      expect(box.height, size).toBe(px);
    }
  });
});
