import { test, expect, getStyle, getBg, getColor, isVisibleColor, type Locator, type Page } from './base';

// The skeleton prop and the Skeleton box (fixtures: SkeletonFixtures in e2e/fixtures/test-fixtures.tsx).
// Colors are read with reduced motion, where the pulse stands still, so two reads of the fill agree.

test.beforeEach(async ({ page, testPage }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="skeleton-section"]');
});

const px = async (locator: Locator, property: string) => parseFloat(await getStyle(locator, property));

const box = async (locator: Locator) => {
  const rect = await locator.boundingBox();
  if (!rect) throw new Error('element has no box');
  return rect;
};

/** The fill a skeleton paints, read from the line-through of its text. */
const decorationColor = (locator: Locator) => getStyle(locator, 'text-decoration-color');

/** Relative luminance of an rgb()/oklab() color the browser resolved, through a canvas. */
const luminance = (page: Page, color: string) => page.evaluate((c) => {
  const ctx = document.createElement('canvas').getContext('2d')!;
  ctx.fillStyle = c;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data).map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}, color);

test.describe('skeleton on a container', () => {
  test('keeps the surface and border of the container', async ({ page }) => {
    const on = page.getByTestId('skeleton-card');
    const off = page.getByTestId('skeleton-off');
    expect(await getBg(on)).toBe(await getBg(off));
    expect(await getStyle(on, 'border-top-color')).toBe(await getStyle(off, 'border-top-color'));
    expect(await px(on, 'border-top-width')).toBeGreaterThan(0);
  });

  test('turns text into bars of one opaque fill', async ({ page }) => {
    for (const id of ['skeleton-card-title', 'skeleton-card-text', 'skeleton-card-link']) {
      const text = page.getByTestId(id);
      expect(await getColor(text)).toBe('rgba(0, 0, 0, 0)');
      expect(await getStyle(text, 'text-decoration-line')).toBe('line-through');
      expect(isVisibleColor(await decorationColor(text))).toBe(true);
    }
    const fill = await decorationColor(page.getByTestId('skeleton-card-title'));
    expect(fill).not.toBe(await getBg(page.getByTestId('skeleton-card')));
    expect(fill).not.toMatch(/\/\s*0?\.\d+\)$/); // no alpha: a bar over a box of the same fill adds nothing
  });

  test('sizes the bars with the text', async ({ page }) => {
    const title = await px(page.getByTestId('skeleton-card-title'), 'text-decoration-thickness');
    const text = await px(page.getByTestId('skeleton-card-text'), 'text-decoration-thickness');
    expect(title).toBeGreaterThan(text);
    expect(text).toBeGreaterThan(8);
  });

  test('turns boxes into solid shapes of the same fill and hides what they hold', async ({ page }) => {
    const fill = await decorationColor(page.getByTestId('skeleton-card-title'));
    for (const id of ['skeleton-card-avatar', 'skeleton-card-badge', 'skeleton-card-button', 'skeleton-card-input', 'skeleton-card-checkbox']) {
      const part = page.getByTestId(id);
      expect(await getBg(part)).toBe(fill);
      expect(await getStyle(part, 'border-top-color')).toBe('rgba(0, 0, 0, 0)');
      expect(await getStyle(part, 'box-shadow')).toBe('none');
    }
    const button = page.getByTestId('skeleton-card-button');
    expect(await getStyle(button.locator('svg'), 'visibility')).toBe('hidden');
    expect(await getStyle(button.locator('.vane-text-run'), 'visibility')).toBe('hidden');
    // the initials are bare text in the avatar
    expect(await getColor(page.getByTestId('skeleton-card-avatar'))).toBe('rgba(0, 0, 0, 0)');
  });

  test('keeps the shape and size of each box', async ({ page }) => {
    for (const id of ['avatar', 'button', 'input', 'badge']) {
      const on = await box(page.getByTestId(`skeleton-card-${id}`));
      const off = await box(page.getByTestId(`skeleton-off-${id}`));
      expect(Math.abs(on.width - off.width)).toBeLessThan(0.5);
      expect(Math.abs(on.height - off.height)).toBeLessThan(0.5);
    }
    expect(await px(page.getByTestId('skeleton-card-avatar'), 'border-top-left-radius'))
      .toBe(await px(page.getByTestId('skeleton-off-avatar'), 'border-top-left-radius'));
  });

  test('hides the parts that only decorate a control', async ({ page }) => {
    const card = page.getByTestId('skeleton-card');
    expect(await getStyle(card.locator('.vane-input-section'), 'visibility')).toBe('hidden');
    const checkbox = page.getByTestId('skeleton-card-checkbox');
    const overlays = checkbox.locator('xpath=following-sibling::*');
    expect(await overlays.count()).toBeGreaterThan(0);
    for (const overlay of await overlays.all()) {
      expect(await getStyle(overlay, 'visibility')).toBe('hidden');
    }
    // a section next to a field that is itself the skeleton
    expect(await getStyle(page.getByTestId('skeleton-input').locator('xpath=following-sibling::*[contains(@class, "vane-input-section")]'), 'visibility')).toBe('hidden');
    const separators = page.getByTestId('skeleton-breadcrumb').locator('.vane-breadcrumb-separator');
    expect(await separators.count()).toBe(2);
    expect(await getStyle(separators.first(), 'visibility')).toBe('hidden');
  });

  test('takes no focus or clicks', async ({ page }) => {
    const button = page.getByTestId('skeleton-card-button');
    await button.evaluate(el => (el as HTMLElement).focus());
    await expect(button).not.toBeFocused();
    expect(await page.getByTestId('skeleton-card').evaluate(el => (el as HTMLElement).inert)).toBe(true);
  });

  test('paints a darker fill in a dark subtree', async ({ page }) => {
    const light = await decorationColor(page.getByTestId('skeleton-card-title'));
    const dark = await decorationColor(page.getByTestId('skeleton-dark-title'));
    expect(await luminance(page, dark)).toBeLessThan(await luminance(page, light));
    expect(await getBg(page.getByTestId('skeleton-dark-button'))).toBe(dark);
  });

  test('keeps the surface of a nav item and draws its icon as a shape', async ({ page }) => {
    const nav = page.getByTestId('skeleton-nav');
    const active = nav.locator('.vane-nav-link').first();
    const fill = await decorationColor(active);
    expect(await getBg(active)).not.toBe(fill);
    expect(await getBg(active.locator('svg'))).toBe(fill);
  });
});

test.describe('skeleton on single components', () => {
  test('fills the box of a component that carries the prop itself', async ({ page }) => {
    for (const id of ['skeleton-button', 'skeleton-input', 'skeleton-switch', 'skeleton-progress', 'skeleton-img']) {
      const el = page.getByTestId(id);
      expect(await getBg(el)).toBe(await decorationColor(el));
    }
    expect(await getStyle(page.getByTestId('skeleton-progress').locator('> *').first(), 'visibility')).toBe('hidden');
  });

  test('moves the picture of an image out of its box', async ({ page }) => {
    const img = page.getByTestId('skeleton-img');
    const [x] = (await getStyle(img, 'object-position')).split(' ');
    expect(parseFloat(x)).toBeGreaterThan((await box(img)).width);
  });

  test('draws a text bar the length of the text', async ({ page }) => {
    const text = page.getByTestId('skeleton-text');
    expect(await getColor(text)).toBe('rgba(0, 0, 0, 0)');
    expect((await box(text)).width).toBeLessThan(200);
  });
});

test.describe('pulse', () => {
  test('runs on the outermost skeleton only and moves the fill', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    const card = page.getByTestId('skeleton-card');
    expect(await getStyle(card, 'animation-name')).toBe('vane-skeleton-pulse');
    expect(await getStyle(page.getByTestId('skeleton-card-button'), 'animation-name')).toBe('none');
    const button = page.getByTestId('skeleton-card-button');
    const seen = new Set<string>();
    for (let i = 0; i < 6; i++) {
      seen.add(await getBg(button));
      await page.waitForTimeout(150);
    }
    expect(seen.size).toBeGreaterThan(1);
    // the container's own surface does not pulse
    expect(await getBg(card)).toBe(await getBg(page.getByTestId('skeleton-off')));
  });

  test('stands still with reduced motion', async ({ page }) => {
    expect(await getStyle(page.getByTestId('skeleton-card'), 'animation-name')).toBe('none');
    expect(await getStyle(page.getByTestId('skeleton-box-md'), 'animation-name')).toBe('none');
  });
});

test.describe('Skeleton box', () => {
  test('is one line of text tall and grows strictly from xs to xl', async ({ page }) => {
    const heights: number[] = [];
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
      heights.push((await box(page.getByTestId(`skeleton-box-${size}`))).height);
    }
    for (let i = 1; i < heights.length; i++) expect(heights[i]).toBeGreaterThan(heights[i - 1]);
    expect(heights[2]).toBe(24); // md: 16px text at line-height 1.5
  });

  test('paints the fill with size-driven corners', async ({ page }) => {
    const md = page.getByTestId('skeleton-box-md');
    expect(isVisibleColor(await getBg(md))).toBe(true);
    const xs = await px(page.getByTestId('skeleton-box-xs'), 'border-top-left-radius');
    const xl = await px(page.getByTestId('skeleton-box-xl'), 'border-top-left-radius');
    expect(xs).toBeGreaterThan(0);
    expect(xl).toBeGreaterThan(xs);
  });

  test('takes its shape from the aspect and shape props', async ({ page }) => {
    const video = await box(page.getByTestId('skeleton-box-video'));
    expect(Math.abs(video.width / video.height - 16 / 9)).toBeLessThan(0.02);
    const circle = page.getByTestId('skeleton-box-circle');
    const rect = await box(circle);
    expect(Math.abs(rect.width - rect.height)).toBeLessThan(0.5);
    expect(await px(circle, 'border-top-left-radius')).toBeGreaterThanOrEqual(rect.width / 2);
  });
});
