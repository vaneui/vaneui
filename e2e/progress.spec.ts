import { test, expect, getStyle, getBg, type Locator } from './base';

const fillOf = (bar: Locator) => bar.locator('.vane-progress-fill');

/** The visible share of the track the fill covers, measured from the track's start edge */
async function filledShare(bar: Locator, rtl = false): Promise<number> {
  const track = await bar.boundingBox();
  const fill = await fillOf(bar).boundingBox();
  if (!track || !fill) throw new Error('progress not rendered');
  const covered = rtl ? track.x + track.width - fill.x : fill.x + fill.width - track.x;
  return covered / track.width;
}

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="progress-section"]');
});

test.describe('Progress', () => {
  test('renders a progressbar track that clips one decorative fill', async ({ page }) => {
    const bar = page.locator('[data-testid="progress-default"]');
    expect(await bar.evaluate(el => el.tagName.toLowerCase())).toBe('div');
    await expect(bar).toHaveAttribute('role', 'progressbar');
    expect(await bar.evaluate(el => el.childElementCount)).toBe(1);
    await expect(fillOf(bar)).toHaveAttribute('aria-hidden', 'true');
    expect(await getStyle(bar, 'overflow')).toBe('hidden');
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

  test('the fill covers the value ratio of the track, as tall as the track', async ({ page }) => {
    for (const [id, ratio] of [['progress-default', 0.4], ['progress-max', 3 / 8]] as const) {
      const bar = page.locator(`[data-testid="${id}"]`);
      expect(await filledShare(bar)).toBeCloseTo(ratio, 2);
      expect(parseFloat(await getStyle(fillOf(bar), 'height'))).toBeCloseTo(parseFloat(await getStyle(bar, 'height')), 1);
    }
  });

  test('in right-to-left text the fill grows from the right edge', async ({ page }) => {
    expect(await filledShare(page.locator('[data-testid="progress-rtl"]'), true)).toBeCloseTo(0.4, 2);
  });

  test('the fill takes the appearance color while the track stays neutral', async ({ page }) => {
    const primary = page.locator('[data-testid="progress-default"]');
    const accent = page.locator('[data-testid="progress-accent"]');
    expect(await getBg(fillOf(primary))).not.toBe(await getBg(fillOf(accent)));
    expect(await getBg(primary)).toBe(await getBg(accent));
    expect(await getBg(fillOf(primary))).not.toBe(await getBg(primary));
  });
});
