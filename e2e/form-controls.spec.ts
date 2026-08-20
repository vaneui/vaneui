import { test, expect, getStyle, getFontSize, type Locator, type Page } from './base';

// Computed-CSS coverage for Textarea/Select/Switch/Radio/RadioGroup (classes + DOM attrs: unit tests).

// ── Helpers (single-spec) ─────────────────────────────────────────────────────

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

/** Computed style property parsed to px */
async function getPx(locator: Locator, property: string): Promise<number> {
  return parseFloat(await getStyle(locator, property));
}

/** Bounding box of a locator, asserted non-null */
async function box(locator: Locator): Promise<{ x: number; y: number; width: number; height: number }> {
  const b = await locator.boundingBox();
  expect(b, 'element must have a bounding box').not.toBeNull();
  return b!;
}

/** The wrapper span that owns a given Switch input */
function switchWrapper(page: Page, testid: string): Locator {
  return page.locator('.vane-switch-wrapper', { has: page.locator(`[data-testid="${testid}"]`) });
}

/** The decorative thumb/dot span rendered immediately after a control input */
function sibling(page: Page, testid: string, selector: string): Locator {
  return page.locator(`[data-testid="${testid}"] + ${selector}`);
}

/** The chevron belonging to one Select — several fixtures render one, so never .first() */
function chevronOf(page: Page, testid: string): Locator {
  return page
    .locator('.vane-select-wrapper', { has: page.locator(`[data-testid="${testid}"]`) })
    .locator('.vane-select-chevron');
}

function expectStrictlyIncreasing(values: number[], label: string): void {
  for (let i = 1; i < values.length; i++) {
    expect(
      values[i],
      `${label}: ${SIZES[i]}=${values[i]} must exceed ${SIZES[i - 1]}=${values[i - 1]}`,
    ).toBeGreaterThan(values[i - 1]);
  }
}

async function tagOf(locator: Locator): Promise<string> {
  return locator.evaluate(el => el.tagName.toLowerCase());
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="form-controls-section"]');
});

test.describe('Textarea', () => {
  test('renders as a <textarea>', async ({ page }) => {
    expect(await tagOf(page.locator('[data-testid="textarea-default"]'))).toBe('textarea');
  });

  test('font-size strictly increases xs→xl', async ({ page }) => {
    const sizes: number[] = [];
    for (const size of SIZES) {
      sizes.push(await getFontSize(page.locator(`[data-testid="textarea-${size}"]`)));
    }
    expectStrictlyIncreasing(sizes, 'textarea font-size');
  });

  test('does not reserve trailing space — inline padding is symmetric', async ({ page }) => {
    const el = page.locator('[data-testid="textarea-default"]');
    expect(await getPx(el, 'padding-inline-end')).toBe(await getPx(el, 'padding-inline-start'));
  });

  test('invalid textarea keeps symmetric padding (no overlaid alert-icon reservation)', async ({ page }) => {
    const el = page.locator('[data-testid="textarea-invalid"]');
    expect(await getPx(el, 'padding-inline-end')).toBe(await getPx(el, 'padding-inline-start'));
  });

  test('min-height is taller than a single text line', async ({ page }) => {
    const el = page.locator('[data-testid="textarea-default"]');
    const minHeight = await getPx(el, 'min-height');
    const lineHeight = await getPx(el, 'line-height');
    expect(lineHeight).toBeGreaterThan(0);
    expect(minHeight).toBeGreaterThan(lineHeight);
    // the CSS asks for three lines, so it must clear two of them as well
    expect(minHeight).toBeGreaterThan(lineHeight * 2);
  });
});

test.describe('Select', () => {
  test('renders as a <select>', async ({ page }) => {
    expect(await tagOf(page.locator('[data-testid="select-default"]'))).toBe('select');
  });

  test('font-size strictly increases xs→xl', async ({ page }) => {
    const sizes: number[] = [];
    for (const size of SIZES) {
      sizes.push(await getFontSize(page.locator(`[data-testid="select-${size}"]`)));
    }
    expectStrictlyIncreasing(sizes, 'select font-size');
  });

  // Guards the unlayered padding-inline-end: a layered rule loses to the px-(--px) utility.
  test('reserves trailing space for the chevron', async ({ page }) => {
    const el = page.locator('[data-testid="select-default"]');
    const start = await getPx(el, 'padding-inline-start');
    const end = await getPx(el, 'padding-inline-end');
    expect(end).toBeGreaterThan(start);
  });

  test('the reserved trailing band is wide enough for the chevron icon', async ({ page }) => {
    const el = page.locator('[data-testid="select-default"]');
    const reserved = (await getPx(el, 'padding-inline-end')) - (await getPx(el, 'padding-inline-start'));
    const chevron = await box(chevronOf(page, 'select-default').locator('svg'));
    expect(reserved).toBeGreaterThanOrEqual(chevron.width);
  });

  test('the chevron is vertically centred on the field and sits at its trailing edge', async ({ page }) => {
    const field = await box(page.locator('[data-testid="select-default"]'));
    const chevron = await box(chevronOf(page, 'select-default'));
    expect(chevron.y + chevron.height / 2).toBeCloseTo(field.y + field.height / 2, 1);
    expect(chevron.x).toBeGreaterThan(field.x + field.width / 2);
    expect(chevron.x + chevron.width).toBeLessThanOrEqual(field.x + field.width + 1);
  });

  // The browser paints the dropdown list from the option's own colors, so a transparent
  // default leaves the popup on UA colors instead of the theme's.
  test('options carry an opaque themed background and text color', async ({ page }) => {
    const option = page.locator('[data-testid="select-default"] option').first();
    expect(await getStyle(option, 'background-color')).not.toBe('rgba(0, 0, 0, 0)');
    expect(await getStyle(option, 'color')).toBe(
      await getStyle(page.locator('[data-testid="select-default"]'), 'color'),
    );
  });

  // The OS-drawn picker gives its options NO layout box, so padding/radius/shadow are inert
  // there and only text/background color land. base-select makes the list real DOM.
  test('the dropdown list is real, themed DOM on engines that support base-select', async ({ page }) => {
    const supported = await page.evaluate(() => CSS.supports('appearance', 'base-select'));
    test.skip(!supported, 'engine keeps the OS-drawn picker; the @supports block never applies');

    const select = page.locator('[data-testid="select-default"]');
    expect(await getStyle(select, 'appearance')).toBe('base-select');

    await select.click();
    const option = select.locator('option').first();
    const box = await option.boundingBox();
    expect(box, 'an OS-drawn option has no box at all').not.toBeNull();
    expect(box!.height).toBeGreaterThan(0);
    expect(await getPx(option, 'padding-inline-start')).toBeGreaterThan(0);
    expect(await getPx(option, 'border-top-left-radius')).toBeGreaterThan(0);
    await page.keyboard.press('Escape');
  });

  // base-select swaps in a built-in ::picker-icon, which would sit on top of the themed chevron
  test('hides the built-in picker icon so only the themed chevron shows', async ({ page }) => {
    const supported = await page.evaluate(() => CSS.supports('appearance', 'base-select'));
    test.skip(!supported, 'no built-in picker icon on this engine');

    const display = await page.locator('[data-testid="select-default"]').evaluate(
      (el) => getComputedStyle(el, '::picker-icon').display,
    );
    expect(display).toBe('none');
    await expect(
      page.locator('.vane-select-wrapper', { has: page.locator('[data-testid="select-default"]') })
        .locator('.vane-select-chevron'),
    ).toBeVisible();
  });

  test('the chevron picks up the danger color when the field is invalid', async ({ page }) => {
    const wrapper = page.locator('.vane-select-wrapper', { has: page.locator('[data-testid="select-invalid"]') });
    const invalid = await getStyle(wrapper.locator('.vane-select-chevron'), 'color');
    const normal = await getStyle(
      page.locator('.vane-select-wrapper', { has: page.locator('[data-testid="select-default"]') })
        .locator('.vane-select-chevron'),
      'color',
    );
    expect(invalid).not.toBe(normal);
  });
});

test.describe('Switch', () => {
  test('renders as an <input>', async ({ page }) => {
    expect(await tagOf(page.locator('[data-testid="switch-default"]'))).toBe('input');
  });

  test('track is wider than it is tall', async ({ page }) => {
    const track = await box(page.locator('[data-testid="switch-default"]'));
    expect(track.width).toBeGreaterThan(track.height);
  });

  test('track width and height scale strictly xs→xl', async ({ page }) => {
    const widths: number[] = [];
    const heights: number[] = [];
    for (const size of SIZES) {
      const track = await box(page.locator(`[data-testid="switch-${size}"]`));
      widths.push(track.width);
      heights.push(track.height);
    }
    expectStrictlyIncreasing(widths, 'switch track width');
    expectStrictlyIncreasing(heights, 'switch track height');
  });

  test('thumb scales strictly xs→xl and stays inside the track', async ({ page }) => {
    const thumbs: number[] = [];
    for (const size of SIZES) {
      const thumb = await box(sibling(page, `switch-${size}`, '.vane-switch-thumb'));
      const track = await box(page.locator(`[data-testid="switch-${size}"]`));
      expect(thumb.width, `switch ${size}: thumb must fit inside the track`).toBeLessThan(track.height);
      expect(thumb.width).toBeCloseTo(thumb.height, 1);
      thumbs.push(thumb.width);
    }
    expectStrictlyIncreasing(thumbs, 'switch thumb size');
  });

  test('checked thumb is offset from the unchecked one', async ({ page }) => {
    const offsetOf = async (testid: string): Promise<number> => {
      const track = await box(page.locator(`[data-testid="${testid}"]`));
      const thumb = await box(sibling(page, testid, '.vane-switch-thumb'));
      return thumb.x - track.x;
    };
    const offOffset = await offsetOf('switch-unchecked');
    const onOffset = await offsetOf('switch-checked');
    expect(onOffset).toBeGreaterThan(offOffset);

    // travel comes from the `translate` property (what Tailwind v4 emits), not a layout shift
    const off = await getStyle(sibling(page, 'switch-unchecked', '.vane-switch-thumb'), 'translate');
    const on = await getStyle(sibling(page, 'switch-checked', '.vane-switch-thumb'), 'translate');
    expect(on).not.toBe(off);
    expect(parseFloat(on)).toBeCloseTo(onOffset - offOffset, 1);
  });

  test('disabled switch is visually muted', async ({ page }) => {
    const enabled = await getPx(switchWrapper(page, 'switch-enabled'), 'opacity');
    const disabled = await getPx(switchWrapper(page, 'switch-disabled'), 'opacity');
    expect(disabled).toBeLessThan(enabled);
  });
});

test.describe('Switch shape', () => {
  const thumbOf = (page: Page, testid: string) =>
    switchWrapper(page, testid).locator('.vane-switch-thumb');

  test('pill (the default) rounds both the track and the knob fully', async ({ page }) => {
    const track = await getPx(page.locator('[data-testid="switch-default"]'), 'border-top-left-radius');
    const thumb = await getPx(thumbOf(page, 'switch-default'), 'border-top-left-radius');
    // a pill resolves to an effectively unbounded radius on both boxes
    expect(track).toBeGreaterThan(1000);
    expect(thumb).toBeGreaterThan(1000);
  });

  test('sharp squares the knob too, instead of leaving a circle in a square track', async ({ page }) => {
    expect(await getPx(page.locator('[data-testid="switch-sharp"]'), 'border-top-left-radius')).toBe(0);
    expect(await getPx(thumbOf(page, 'switch-sharp'), 'border-top-left-radius')).toBe(0);
  });

  // concentric corners: the knob sits --switch-pad inside the track, so its radius is the
  // track's less that inset. Equal radii would read as a rounder knob in a squarer track.
  test('rounded insets the knob radius from the track radius by the track padding', async ({ page }) => {
    const wrapper = switchWrapper(page, 'switch-rounded');
    const track = await getPx(page.locator('[data-testid="switch-rounded"]'), 'border-top-left-radius');
    const thumb = await getPx(thumbOf(page, 'switch-rounded'), 'border-top-left-radius');
    const pad = parseFloat(await wrapper.evaluate((el) => {
      const cs = getComputedStyle(el);
      const probe = document.createElement('div');
      probe.style.width = cs.getPropertyValue('--switch-pad');
      el.appendChild(probe);
      const w = getComputedStyle(probe).width;
      probe.remove();
      return w;
    }));
    expect(track).toBeGreaterThan(0);
    expect(thumb).toBeGreaterThan(0);
    expect(thumb).toBeCloseTo(track - pad, 1);
  });
});

test.describe('Radio', () => {
  test('renders as an <input>', async ({ page }) => {
    expect(await tagOf(page.locator('[data-testid="radio-default"]'))).toBe('input');
  });

  test('is circular — square box with a pill radius', async ({ page }) => {
    const el = page.locator('[data-testid="radio-default"]');
    const b = await box(el);
    expect(b.width).toBeCloseTo(b.height, 1);

    const radius = await getStyle(el, 'border-radius');
    const isPill = radius.trim().endsWith('%')
      ? parseFloat(radius) >= 50
      : parseFloat(radius) >= b.width / 2;
    expect(isPill, `border-radius "${radius}" must resolve to a circle for a ${b.width}px box`).toBe(true);
  });

  test('box scales strictly xs→xl', async ({ page }) => {
    const widths: number[] = [];
    for (const size of SIZES) {
      widths.push((await box(page.locator(`[data-testid="radio-${size}"]`))).width);
    }
    expectStrictlyIncreasing(widths, 'radio box width');
  });
});

test.describe('RadioGroup', () => {
  test('stacks its Radios in a column', async ({ page }) => {
    const group = page.locator('[data-testid="radiogroup-default"]');
    expect(await getStyle(group, 'flex-direction')).toBe('column');

    const a = await box(page.locator('[data-testid="radiogroup-radio-a"]'));
    const b = await box(page.locator('[data-testid="radiogroup-radio-b"]'));
    expect(b.y).toBeGreaterThan(a.y);
  });

  test('only the selected Radio paints its dot', async ({ page }) => {
    const dotA = sibling(page, 'radiogroup-radio-a', 'span');
    const dotB = sibling(page, 'radiogroup-radio-b', 'span');
    expect(await getStyle(dotA, 'visibility')).toBe('hidden');
    expect(await getStyle(dotB, 'visibility')).toBe('visible');
  });
});
