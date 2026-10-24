import { test, expect, getStyle, getBg, type Locator } from './base';

// the fill is the root's ::before, so its geometry and color are read off the pseudo-element
async function getFillStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el, '::before').getPropertyValue(prop),
    property,
  );
}

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="progress-section"]');
});

test.describe('Progress', () => {
  test('renders a single progressbar div that clips its fill', async ({ page }) => {
    const bar = page.locator('[data-testid="progress-default"]');
    expect(await bar.evaluate(el => el.tagName.toLowerCase())).toBe('div');
    await expect(bar).toHaveAttribute('role', 'progressbar');
    expect(await bar.evaluate(el => el.childElementCount)).toBe(0);
    expect(await getStyle(bar, 'overflow')).toBe('hidden');
    expect(await getFillStyle(bar, 'content')).toBe('""');
  });

  test('sizes xs→xl produce strictly increasing bar heights', async ({ page }) => {
    const heights: number[] = [];
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
      heights.push(parseFloat(await getStyle(page.locator(`[data-testid="progress-${size}"]`), 'height')));
    }
    expect(heights[0]).toBeGreaterThan(0);
    for (let i = 1; i < heights.length; i++) {
      expect(heights[i]).toBeGreaterThan(heights[i - 1]);
    }
  });

  test('the fill spans the value ratio of the track', async ({ page }) => {
    for (const [id, ratio] of [['progress-default', 0.4], ['progress-max', 3 / 8]] as const) {
      const bar = page.locator(`[data-testid="${id}"]`);
      const track = parseFloat(await getStyle(bar, 'width'));
      const fill = parseFloat(await getFillStyle(bar, 'width'));
      expect(track).toBeGreaterThan(0);
      expect(fill).toBeCloseTo(track * ratio, 0);
      expect(parseFloat(await getFillStyle(bar, 'height'))).toBeCloseTo(parseFloat(await getStyle(bar, 'height')), 1);
    }
  });

  test('the fill takes the appearance color while the track stays neutral', async ({ page }) => {
    const primary = page.locator('[data-testid="progress-default"]');
    const accent = page.locator('[data-testid="progress-accent"]');
    expect(await getFillStyle(primary, 'background-color')).not.toBe(await getFillStyle(accent, 'background-color'));
    expect(await getBg(primary)).toBe(await getBg(accent));
    expect(await getFillStyle(primary, 'background-color')).not.toBe(await getBg(primary));
  });
});
