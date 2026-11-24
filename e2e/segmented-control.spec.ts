import { test, expect, getStyle, getBg, getColor, TRANSPARENT, type Locator, type Page } from './base';

// SegmentedControl (fixtures: SegmentedControlFixtures in e2e/fixtures/test-fixtures.tsx). A
// segment's data-testid lands on its radio, so `segment()` steps up to the <label>.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="segmented-control-section"]');
});

const segment = (page: Page, testId: string) => page.getByTestId(testId).locator('xpath=..');

const box = async (locator: Locator) => {
  const rect = await locator.boundingBox();
  if (!rect) throw new Error('element has no box');
  return rect;
};

const px = async (locator: Locator, property: string) => parseFloat(await getStyle(locator, property));

/** WCAG contrast of two colors the browser resolved, through a canvas */
const contrast = (page: Page, fg: string, bg: string) => page.evaluate(([a, b]) => {
  const ctx = document.createElement('canvas').getContext('2d')!;
  const lum = (c: string) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, bl] = Array.from(ctx.getImageData(0, 0, 1, 1).data).map(v => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}, [fg, bg]);

/** WCAG relative luminance of a color the browser resolved, through a canvas */
const luminance = (page: Page, color: string) => page.evaluate(c => {
  const ctx = document.createElement('canvas').getContext('2d')!;
  ctx.fillStyle = c;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data).map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}, color);

const lineOpacity = (locator: Locator) =>
  locator.evaluate(el => {
    const style = getComputedStyle(el, '::before');
    return style.content === 'none' ? null : parseFloat(style.opacity);
  });

test.describe('SegmentedControl size', () => {
  test('is as tall as a Button of its size, with the same corners', async ({ page }) => {
    const heights: number[] = [];
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
      const control = page.getByTestId(`seg-${size}`);
      const button = page.getByTestId(`seg-${size}-button`);
      const height = (await box(control)).height;
      expect(Math.abs(height - (await box(button)).height)).toBeLessThan(0.5);
      expect(Math.abs(await px(control, 'border-top-left-radius') - await px(button, 'border-top-left-radius'))).toBeLessThan(0.1);
      heights.push(height);
    }
    for (let i = 1; i < heights.length; i++) expect(heights[i]).toBeGreaterThan(heights[i - 1]);
  });

  test('sits level with a Button and an Input at the default size', async ({ page }) => {
    const control = await box(page.getByTestId('seg-default'));
    for (const id of ['seg-default-button', 'seg-default-input']) {
      const other = await box(page.getByTestId(id));
      expect(Math.abs(other.height - control.height)).toBeLessThan(0.5);
      expect(Math.abs(other.y - control.y)).toBeLessThan(0.5);
    }
  });

  test('insets the segments by the track padding and gives them smaller corners', async ({ page }) => {
    const control = page.getByTestId('seg-md');
    const first = segment(page, 'seg-md-a');
    const outer = await box(control);
    const inner = await box(first);
    const inset = inner.x - outer.x;
    expect(inset).toBeGreaterThan(1);
    expect(Math.abs(inner.y - outer.y - inset)).toBeLessThan(0.5);
    expect(await px(first, 'border-top-left-radius')).toBeLessThan(await px(control, 'border-top-left-radius'));
  });

  test('takes the font size of a Button of its size', async ({ page }) => {
    for (const size of ['xs', 'md', 'xl']) {
      expect(await px(segment(page, `seg-${size}-a`), 'font-size'))
        .toBe(await px(page.getByTestId(`seg-${size}-button`), 'font-size'));
    }
  });

  test('fills a full-width control with its segments', async ({ page }) => {
    const outer = await box(page.getByTestId('seg-full'));
    expect(outer.width).toBeCloseTo((await box(page.getByTestId('seg-full-box'))).width, 0);
    const inset = await px(page.getByTestId('seg-full'), 'padding-left');
    let total = 0;
    for (const id of ['seg-full-a', 'seg-full-b', 'seg-full-c']) total += (await box(segment(page, id))).width;
    expect(Math.abs(total + 2 * inset - outer.width)).toBeLessThan(1);
  });

  test('sizes an icon by the text of the segment', async ({ page }) => {
    const svg = segment(page, 'seg-icons-list').locator('svg');
    const rect = await box(svg);
    const fontSize = await px(segment(page, 'seg-icons-list'), 'font-size');
    expect(rect.width).toBeCloseTo(fontSize, 0);
    expect(rect.height).toBeCloseTo(fontSize, 0);
  });
});

test.describe('SegmentedControl colors', () => {
  test('raises the selected segment as a surface on a neutral track', async ({ page }) => {
    const track = await getBg(page.getByTestId('seg-default'));
    const selected = segment(page, 'seg-default-all');
    const other = segment(page, 'seg-default-open');
    expect(track).not.toBe(TRANSPARENT);
    expect(await getBg(selected)).not.toBe(TRANSPARENT);
    expect(await getBg(selected)).not.toBe(track);
    expect(await getStyle(selected, 'box-shadow')).not.toBe('none');
    expect(await getBg(other)).toBe(TRANSPARENT);
    expect(await getStyle(other, 'box-shadow')).toBe('none');
    // raised: lighter than the track it sits on
    expect(await luminance(page, await getBg(selected))).toBeGreaterThan(await luminance(page, track));
  });

  test('keeps readable text on every segment', async ({ page }) => {
    const track = await getBg(page.getByTestId('seg-default'));
    const selected = segment(page, 'seg-default-all');
    const other = segment(page, 'seg-default-open');
    expect(await contrast(page, await getColor(selected), await getBg(selected))).toBeGreaterThanOrEqual(4.5);
    expect(await contrast(page, await getColor(other), track)).toBeGreaterThanOrEqual(4.5);
    // the selected text is the stronger one
    expect(await getColor(selected)).not.toBe(await getColor(other));
  });

  test('draws a line between two segments that are not selected, and none next to the selected one', async ({ page }) => {
    expect(await lineOpacity(segment(page, 'seg-default-all'))).toBeNull();
    expect(await lineOpacity(segment(page, 'seg-default-open'))).toBe(0);
    expect(await lineOpacity(segment(page, 'seg-default-closed'))).toBe(1);
    expect(await lineOpacity(segment(page, 'seg-default-draft'))).toBe(1);
  });

  test('fills the selected segment with filled, in the appearance color', async ({ page }) => {
    const selected = segment(page, 'seg-filled-b');
    const fill = await getBg(selected);
    expect(fill).not.toBe(TRANSPARENT);
    expect(fill).not.toBe(await getBg(page.getByTestId('seg-filled')));
    expect(await contrast(page, await getColor(selected), fill)).toBeGreaterThanOrEqual(4.5);
    // a segment with its own appearance keeps it
    await page.getByTestId('seg-filled-c').click({ force: true });
    expect(await getBg(segment(page, 'seg-filled-c'))).not.toBe(fill);
  });

  test('tints the selected segment with ghost, on no track', async ({ page }) => {
    expect(await getBg(page.getByTestId('seg-ghost'))).toBe(TRANSPARENT);
    const selected = segment(page, 'seg-ghost-a');
    const tint = await getBg(selected);
    expect(tint).not.toBe(TRANSPARENT);
    expect(await getStyle(selected, 'box-shadow')).toBe('none');
    expect(await getBg(segment(page, 'seg-ghost-b'))).toBe(TRANSPARENT);
    expect(await contrast(page, await getColor(selected), tint)).toBeGreaterThanOrEqual(4.5);
  });

  test('stays readable in a dark subtree', async ({ page }) => {
    const track = await getBg(page.getByTestId('seg-dark'));
    const selected = segment(page, 'seg-dark-a');
    const other = segment(page, 'seg-dark-b');
    expect(await getBg(selected)).not.toBe(track);
    expect(await contrast(page, await getColor(selected), await getBg(selected))).toBeGreaterThanOrEqual(4.5);
    expect(await contrast(page, await getColor(other), track)).toBeGreaterThanOrEqual(4.5);
  });

  test('raises the selected segment above the track in a dark subtree too', async ({ page }) => {
    for (const [control, item, surface] of [
      ['seg-dark', 'seg-dark-a', 'seg-dark-card'],
      ['seg-dark-panel-control', 'seg-dark-panel-a', 'seg-dark-panel'],
    ]) {
      const track = await getBg(page.getByTestId(control));
      const selected = segment(page, item);
      // lighter than the track, as on a light page
      expect(await luminance(page, await getBg(selected))).toBeGreaterThan(await luminance(page, track));
      expect(await contrast(page, await getColor(selected), await getBg(selected))).toBeGreaterThanOrEqual(4.5);
      // the track shows on the surface behind it: the Card, or a gray panel
      expect(track).not.toBe(await getBg(page.getByTestId(surface)));
    }
  });

  test('takes the light colors again in a light subtree inside a dark one', async ({ page }) => {
    expect(await getBg(page.getByTestId('seg-light-in-dark'))).toBe(await getBg(page.getByTestId('seg-default')));
    expect(await getBg(segment(page, 'seg-light-in-dark-a'))).toBe(await getBg(segment(page, 'seg-default-all')));
  });
});

test.describe('SegmentedControl behavior', () => {
  test('selects a segment on a click anywhere on it', async ({ page }) => {
    const open = segment(page, 'seg-default-open');
    const all = segment(page, 'seg-default-all');
    const raised = await getBg(all);
    await open.scrollIntoViewIfNeeded();
    const rect = await box(open);
    await page.mouse.click(rect.x + 3, rect.y + rect.height / 2);
    await expect(page.getByTestId('seg-default-open')).toBeChecked();
    await expect(page.getByTestId('seg-default-all')).not.toBeChecked();
    // the surface moves with a 200ms background transition, so wait for it to settle
    await expect.poll(() => getBg(open)).toBe(raised);
    await expect.poll(() => getBg(all)).toBe(TRANSPARENT);
  });

  test('moves the selection with the arrow keys and rings the focused segment', async ({ page }) => {
    await page.getByTestId('seg-default-all').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByTestId('seg-default-open')).toBeChecked();
    await expect(page.getByTestId('seg-default-open')).toBeFocused();
    const focused = segment(page, 'seg-default-open');
    expect(await getStyle(focused, 'outline-style')).toBe('solid');
    expect(await px(focused, 'outline-width')).toBe(2);
    expect(await getStyle(segment(page, 'seg-default-all'), 'outline-style')).toBe('none');
  });

  test('reports the value to a controlled control and skips a disabled segment', async ({ page }) => {
    await expect(page.getByTestId('seg-controlled-week')).toBeChecked();
    await segment(page, 'seg-controlled-day').click();
    await expect(page.getByTestId('seg-controlled-value')).toHaveText('day');
    await expect(page.getByTestId('seg-controlled-day')).toBeChecked();
    const month = segment(page, 'seg-controlled-month');
    expect(await px(month, 'opacity')).toBeLessThan(1);
    expect(await getStyle(month, 'cursor')).toBe('not-allowed');
    await month.click({ force: true });
    await expect(page.getByTestId('seg-controlled-value')).toHaveText('day');
  });

  test('dims a disabled control and keeps its selection', async ({ page }) => {
    const off = segment(page, 'seg-disabled-b');
    expect(await px(off, 'opacity')).toBeLessThan(1);
    await off.click({ force: true });
    await expect(page.getByTestId('seg-disabled-b')).not.toBeChecked();
  });
});

test.describe('SegmentedControl skeleton', () => {
  test('turns into one solid shape of its own size', async ({ page }) => {
    const control = page.getByTestId('seg-skeleton');
    expect(await getBg(control)).not.toBe(await getBg(page.getByTestId('seg-sm')));
    expect(await getStyle(segment(page, 'seg-skeleton-a'), 'visibility')).toBe('hidden');
    expect(Math.abs((await box(control)).height - (await box(page.getByTestId('seg-sm'))).height)).toBeLessThan(0.5);
  });
});
