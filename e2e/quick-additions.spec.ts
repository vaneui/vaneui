import { test, expect, getStyle, getBg, getColor, getFontSize, isVisibleColor, TRANSPARENT, type Locator } from './base';

// Avatar, AvatarGroup, Breadcrumb, field sections and the small props (fixtures:
// QuickAdditionsFixtures in e2e/fixtures/test-fixtures.tsx).

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="quick-additions-section"]');
});

const box = async (locator: Locator) => {
  const rect = await locator.boundingBox();
  if (!rect) throw new Error('element has no box');
  return rect;
};

const px = async (locator: Locator, property: string) => parseFloat(await getStyle(locator, property));

test.describe('Avatar', () => {
  test('is a square box that grows strictly from xs to xl, initials with it', async ({ page }) => {
    const widths: number[] = [];
    const fonts: number[] = [];
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
      const avatar = page.getByTestId(`avatar-${size}`);
      const rect = await box(avatar);
      expect(Math.abs(rect.width - rect.height)).toBeLessThan(0.5);
      widths.push(rect.width);
      fonts.push(await getFontSize(avatar));
    }
    for (let i = 1; i < widths.length; i++) {
      expect(widths[i]).toBeGreaterThan(widths[i - 1]);
      expect(fonts[i]).toBeGreaterThan(fonts[i - 1]);
    }
    expect(widths[2]).toBe(40); // md
  });

  test('is a circle by default and takes a size-driven radius when rounded', async ({ page }) => {
    const circle = page.getByTestId('avatar-md');
    expect(await px(circle, 'border-top-left-radius')).toBeGreaterThanOrEqual(20);
    const rounded = page.getByTestId('avatar-rounded');
    const radius = await px(rounded, 'border-top-left-radius');
    expect(radius).toBeGreaterThan(0);
    expect(radius).toBeLessThan(20);
  });

  test('paints a visible neutral circle with an edge', async ({ page }) => {
    const avatar = page.getByTestId('avatar-md');
    expect(isVisibleColor(await getBg(avatar))).toBe(true);
    expect(await px(avatar, 'border-top-width')).toBeGreaterThan(0);
  });

  test('fills the circle with the image', async ({ page }) => {
    const avatar = page.getByTestId('avatar-image');
    const img = avatar.locator('img');
    await expect(img).toHaveJSProperty('complete', true);
    expect(await getStyle(img, 'object-fit')).toBe('cover');
    const outer = await box(avatar);
    const inner = await box(img);
    expect(inner.width).toBeGreaterThan(outer.width - 3);
  });
});

test.describe('AvatarGroup', () => {
  test('overlaps its avatars and rings each one in the surface color', async ({ page }) => {
    const first = await box(page.getByTestId('avatar-group-first'));
    const second = await box(page.getByTestId('avatar-group-second'));
    expect(second.x).toBeLessThan(first.x + first.width);
    expect(await px(page.getByTestId('avatar-group-second'), 'outline-width')).toBeGreaterThan(0);
  });

  test('counts the hidden avatars in one avatar of the same size', async ({ page }) => {
    const group = page.getByTestId('avatar-group');
    const avatars = group.locator('.vane-avatar');
    await expect(avatars).toHaveCount(3);
    await expect(avatars.nth(2)).toHaveText('+1');
    const counted = await box(avatars.nth(2));
    const first = await box(avatars.nth(0));
    expect(counted.width).toBe(first.width);
  });
});

test.describe('Breadcrumb', () => {
  test('lays the trail out in a row with no list markers', async ({ page }) => {
    const list = page.getByTestId('breadcrumb').locator('ol');
    expect(await getStyle(list, 'display')).toBe('flex');
    expect(await getStyle(list, 'list-style-type')).toBe('none');
    expect(await px(list, 'padding-left')).toBe(0);
    const link = await box(page.getByTestId('breadcrumb-link'));
    const current = await box(page.getByTestId('breadcrumb-current'));
    expect(Math.abs(link.y + link.height / 2 - (current.y + current.height / 2))).toBeLessThan(1);
  });

  test('draws the separator at the text size and mutes it', async ({ page }) => {
    const nav = page.getByTestId('breadcrumb');
    const separator = nav.locator('.vane-breadcrumb-separator').first();
    const svg = await box(separator.locator('svg'));
    const fontSize = await getFontSize(nav);
    expect(Math.abs(svg.width - fontSize)).toBeLessThan(1);
    expect(await getColor(separator)).not.toBe(await getColor(page.getByTestId('breadcrumb-current')));
  });

  test('sets the current page apart from the links', async ({ page }) => {
    expect(await getColor(page.getByTestId('breadcrumb-current')))
      .not.toBe(await getColor(page.getByTestId('breadcrumb-link')));
  });
});

test.describe('Input and Select sections', () => {
  const sectionOf = (field: Locator, side: 'start' | 'end') =>
    field.locator(`xpath=../*[contains(concat(" ", @class, " "), " vane-input-section ")][@data-side="${side}"]`);

  test('keep the field the height of a plain field and center the section on it', async ({ page }) => {
    const plain = await box(page.getByTestId('input-plain'));
    const input = page.getByTestId('input-start-icon');
    const field = await box(input);
    expect(Math.abs(field.height - plain.height)).toBeLessThan(0.5);
    const icon = await box(sectionOf(input, 'start').locator('svg'));
    expect(Math.abs(icon.y + icon.height / 2 - (field.y + field.height / 2))).toBeLessThan(1);
    expect(Math.abs(icon.height - await getFontSize(input))).toBeLessThan(1);
  });

  test('start the text after a start section, however wide it is', async ({ page }) => {
    for (const id of ['input-start-icon', 'input-start-text', 'input-lg-start-icon']) {
      const input = page.getByTestId(id);
      const field = await box(input);
      const section = await box(sectionOf(input, 'start'));
      const textStart = field.x + await px(input, 'padding-left');
      expect(textStart).toBeGreaterThan(section.x + section.width);
      // the section box starts at the field edge and insets its content
      expect(Math.abs(section.x - field.x)).toBeLessThan(0.5);
      expect(await px(sectionOf(input, 'start'), 'padding-left')).toBeGreaterThan(0);
    }
    const plainPadding = await px(page.getByTestId('input-plain'), 'padding-left');
    expect(await px(page.getByTestId('input-start-text'), 'padding-left'))
      .toBeGreaterThan(await px(page.getByTestId('input-start-icon'), 'padding-left'));
    expect(await px(page.getByTestId('input-start-icon'), 'padding-left')).toBeGreaterThan(plainPadding);
  });

  test('end the text before an end section', async ({ page }) => {
    const input = page.getByTestId('input-end-text');
    const field = await box(input);
    const section = await box(sectionOf(input, 'end'));
    const textEnd = field.x + field.width - await px(input, 'padding-right');
    expect(textEnd).toBeLessThan(section.x);
    expect(Math.abs(section.x + section.width - (field.x + field.width))).toBeLessThan(0.5);
  });

  test('keep the error icon clear of an end section and of the text', async ({ page }) => {
    const input = page.getByTestId('input-end-invalid');
    const field = await box(input);
    const section = await box(sectionOf(input, 'end'));
    const icon = await box(input.locator('xpath=../*[contains(@class, "vane-input-error-icon")]').locator('svg'));
    expect(icon.x + icon.width).toBeLessThan(section.x);
    const textEnd = field.x + field.width - await px(input, 'padding-right');
    expect(textEnd).toBeLessThanOrEqual(icon.x);
  });

  test('put the width on the wrapper, so the section stays at the field edge', async ({ page }) => {
    const input = page.getByTestId('input-start-narrow');
    const field = await box(input);
    expect(Math.abs(field.width - 160)).toBeLessThan(0.5);
    const section = await box(sectionOf(input, 'start'));
    expect(section.x - field.x).toBeLessThan(field.width / 4);
  });

  test('start a Select after its section, with the chevron still at the end', async ({ page }) => {
    const select = page.getByTestId('select-start');
    const field = await box(select);
    const section = await box(sectionOf(select, 'start'));
    expect(field.x + await px(select, 'padding-left')).toBeGreaterThan(section.x + section.width);
    const chevron = await box(select.locator('xpath=../*[contains(@class, "vane-select-chevron")]'));
    expect(chevron.x).toBeGreaterThan(field.x + field.width / 2);
  });
});

test.describe('Textarea resize and autosize', () => {
  test('resizes vertically by default and not at all with resizeNone', async ({ page }) => {
    expect(await getStyle(page.getByTestId('textarea-resize-default'), 'resize')).toBe('vertical');
    expect(await getStyle(page.getByTestId('textarea-resize-none'), 'resize')).toBe('none');
  });

  test('grows an autosize textarea with its text and drops the handle', async ({ page }) => {
    const textarea = page.getByTestId('textarea-autosize');
    expect(await getStyle(textarea, 'resize')).toBe('none');
    const before = (await box(textarea)).height;
    await textarea.fill('one\ntwo\nthree\nfour\nfive');
    const after = (await box(textarea)).height;
    expect(after).toBeGreaterThan(before * 2);
  });
});

test.describe('Table striped and hoverable', () => {
  test('tints every other body row', async ({ page }) => {
    expect(await getBg(page.getByTestId('table-striped-row-1'))).toBe(TRANSPARENT);
    expect(isVisibleColor(await getBg(page.getByTestId('table-striped-row-2')))).toBe(true);
    expect(await getBg(page.getByTestId('table-striped-row-3'))).toBe(TRANSPARENT);
  });

  test('tints a row under the pointer', async ({ page }) => {
    const row = page.getByTestId('table-striped-row-3');
    await row.hover();
    expect(isVisibleColor(await getBg(row))).toBe(true);
  });
});

test.describe('Badge dot', () => {
  test('draws a round dot in the text color before the text', async ({ page }) => {
    const badge = page.getByTestId('badge-dot');
    const dot = await badge.evaluate(el => {
      const cs = getComputedStyle(el, '::before');
      return { width: parseFloat(cs.width), height: parseFloat(cs.height), bg: cs.backgroundColor, color: getComputedStyle(el).color };
    });
    expect(dot.width).toBeGreaterThan(0);
    expect(dot.width).toBe(dot.height);
    expect(dot.bg).toBe(dot.color);
  });

  test('is a solid dot with no text', async ({ page }) => {
    for (const id of ['badge-dot-only', 'badge-dot-only-filled']) {
      const badge = page.getByTestId(id);
      const rect = await box(badge);
      expect(rect.width).toBe(rect.height);
      expect(rect.width).toBeLessThan(12);
      expect(isVisibleColor(await getBg(badge))).toBe(true);
    }
    const outline = page.getByTestId('badge-dot-only');
    expect(await getBg(outline)).toBe(await getColor(outline));
  });
});

test.describe('Progress indeterminate', () => {
  const fillOf = (id: string) => (page: import('./base').Page) =>
    page.getByTestId(id).locator('.vane-progress-fill');

  test('slides a fill of 40% of the track, the other way in RTL', async ({ page }) => {
    const fill = fillOf('progress-indeterminate')(page);
    expect(await getStyle(fill, 'animation-name')).toBe('vane-progress-slide');
    const track = await px(page.getByTestId('progress-indeterminate'), 'width');
    expect(Math.abs(await px(fill, 'width') - track * 0.4)).toBeLessThan(1);
    expect(await getStyle(fillOf('progress-indeterminate-rtl')(page), 'animation-name')).toBe('vane-progress-slide-rtl');
  });

  test('stands still with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect(await getStyle(fillOf('progress-indeterminate')(page), 'animation-name')).toBe('none');
  });
});

test.describe('srOnly, aspect ratio and fixed gaps', () => {
  test('srOnly takes the text out of the layout but keeps it in the page', async ({ page }) => {
    const text = page.getByTestId('text-sr-only');
    expect(await getStyle(text, 'position')).toBe('absolute');
    const rect = await box(text);
    expect(rect.width).toBeLessThanOrEqual(1);
    expect(rect.height).toBeLessThanOrEqual(1);
    await expect(text).toHaveText('Only for screen readers');
  });

  test('aspect props fix the shape', async ({ page }) => {
    const img = await box(page.getByTestId('img-aspect-square'));
    expect(Math.abs(img.width - img.height)).toBeLessThan(0.5);
    const card = await box(page.getByTestId('card-aspect-video'));
    expect(Math.abs(card.height - card.width * 9 / 16)).toBeLessThan(1);
  });

  test('a fixed gap step stays the same at every size, and steps grow', async ({ page }) => {
    const smXs = await px(page.getByTestId('row-sm-gap-xs'), 'column-gap');
    const xlXs = await px(page.getByTestId('row-xl-gap-xs'), 'column-gap');
    const smXl = await px(page.getByTestId('row-sm-gap-xl'), 'column-gap');
    expect(smXs).toBeGreaterThan(0);
    expect(xlXs).toBe(smXs);
    expect(smXl).toBeGreaterThan(smXs);
  });
});
