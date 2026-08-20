import { test, expect, getStyle, type Page } from './base';

// The styleable dropdown is `appearance: base-select` only. Everything here is about the
// picker's own box, so the whole file skips on engines that keep the OS-drawn menu.

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  const supported = await page.evaluate(() => CSS.supports('appearance', 'base-select'));
  test.skip(!supported, 'engine keeps the OS-drawn picker; the @supports block never applies');
});

/** Union box of the laid-out options — the picker's own rect is not exposed to script. */
async function optionsBox(page: Page, testid: string) {
  return page.evaluate((id) => {
    const el = document.querySelector(`[data-testid="${id}"]`) as HTMLSelectElement;
    const rects = [...el.querySelectorAll('option')]
      .map((o) => o.getBoundingClientRect())
      .filter((r) => r.height > 0);
    const select = el.getBoundingClientRect();
    return {
      selectTop: select.top,
      selectBottom: select.bottom,
      top: Math.min(...rects.map((r) => r.top)),
      bottom: Math.max(...rects.map((r) => r.bottom)),
      spaceAbove: select.top,
      spaceBelow: innerHeight - select.bottom,
    };
  }, testid);
}

test.describe('Select picker placement', () => {
  // The UA sets position-try-order: most-block-size, which picks whichever side has MORE
  // room rather than the first side that fits — so a field just past the middle of the
  // viewport opened upward over the page. The fix pins the order back to `normal`.
  test('opens below the field when the list fits below', async ({ page }) => {
    await page.locator('[data-testid="select-place-mid"]').click();

    const box = await optionsBox(page, 'select-place-mid');
    // guard the premise: this only proves anything while there IS room on both sides
    expect(box.spaceBelow).toBeGreaterThan(box.bottom - box.top);
    expect(box.spaceAbove).toBeGreaterThan(box.spaceBelow);
    expect(box.top).toBeGreaterThanOrEqual(box.selectBottom - 1);

    await page.keyboard.press('Escape');
  });

  test('still flips above when there is no room below', async ({ page }) => {
    await page.locator('[data-testid="select-place-bottom"]').click();

    const box = await optionsBox(page, 'select-place-bottom');
    expect(box.spaceBelow).toBeLessThan(box.bottom - box.top);
    expect(box.bottom).toBeLessThanOrEqual(box.selectTop + 1);

    await page.keyboard.press('Escape');
  });
});

test.describe('Select picker appearance', () => {
  // An option is a child of the field, so it inherits --bg-color/--text-color: the list
  // follows the variant instead of being pinned to the light theme surface.
  test('a filled Select paints a filled list', async ({ page }) => {
    const filled = page.locator('[data-testid="select-filled"]');
    const plain = page.locator('[data-testid="select-default"]');

    const filledOption = filled.locator('option[value="a"]');
    const plainOption = plain.locator('option[value="a"]');

    expect(await getStyle(filledOption, 'background-color'))
      .toBe(await getStyle(filled, 'background-color'));
    expect(await getStyle(filledOption, 'color')).toBe(await getStyle(filled, 'color'));

    // and it is genuinely a different list from the default one
    expect(await getStyle(filledOption, 'background-color'))
      .not.toBe(await getStyle(plainOption, 'background-color'));
  });

  test('the picker surface matches the field it belongs to', async ({ page }) => {
    const pickerBg = (testid: string) =>
      page.locator(`[data-testid="${testid}"]`).evaluate(
        (el) => getComputedStyle(el, '::picker(select)').backgroundColor,
      );

    expect(await pickerBg('select-filled')).toBe(
      await getStyle(page.locator('[data-testid="select-filled"]'), 'background-color'),
    );
    expect(await pickerBg('select-filled')).not.toBe(await pickerBg('select-default'));
  });

  // ghost resolves --bg-color to transparent, which would let the page show through the list
  test('a ghost Select falls back to an opaque surface', async ({ page }) => {
    const ghost = page.locator('[data-testid="select-ghost"]');
    expect(await getStyle(ghost, 'background-color')).toBe('rgba(0, 0, 0, 0)');

    const pickerBg = await ghost.evaluate(
      (el) => getComputedStyle(el, '::picker(select)').backgroundColor,
    );
    expect(pickerBg).not.toBe('rgba(0, 0, 0, 0)');
    expect(await getStyle(ghost.locator('option[value="a"]'), 'background-color'))
      .not.toBe('rgba(0, 0, 0, 0)');
  });

  // a placeholder is the common disabled option; pinned to --color-text-secondary it was
  // near-invisible on a filled list, so it now fades toward the list's own surface
  test('a disabled option stays legible on a filled list', async ({ page }) => {
    const placeholder = page.locator('[data-testid="select-filled"] option[value=""]');
    const enabled = page.locator('[data-testid="select-filled"] option[value="a"]');

    expect(await getStyle(placeholder, 'color')).not.toBe(await getStyle(enabled, 'color'));

    const contrast = await placeholder.evaluate((el) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d')!;
      const toRgb = (c: string): [number, number, number] => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, 1, 1);
        ctx.fillStyle = c;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return [r, g, b];
      };
      const lum = ([r, g, b]: [number, number, number]) =>
        [r, g, b]
          .map((v) => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
          })
          .reduce((acc, v, i) => acc + v * [0.2126, 0.7152, 0.0722][i], 0);
      const fg = lum(toRgb(getComputedStyle(el).color));
      const bg = lum(toRgb(getComputedStyle(el.parentElement!).backgroundColor));
      return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
    });
    expect(contrast).toBeGreaterThan(2.5);
  });
});
