import { test, expect, getBg, type Page } from './base';

// A checked Checkbox or Radio has to stay readable in every variant and appearance, on a light
// and on a dark page: the mark against its box, and the box against the page. Two bugs hid
// here. A `ghost` Checkbox kept a `filled` wrapper, so it drew a white mark on a white box.
// And a checked `outline` or `ghost` box took its page-colored fill as border color, which
// left the mark floating with no box around it.
//
// 3:1 is the WCAG minimum for the parts of a control that are needed to identify its state.

const MIN_CONTRAST = 3;

const SCHEMES = ['light', 'dark'] as const;
const VARIANTS = ['filled', 'outline', 'ghost'] as const;
const APPEARANCES = ['primary', 'accent', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'] as const;
const KINDS = ['checkbox', 'indeterminate', 'radio'] as const;

// `filled` is the default look and older than this spec. One pair sits under 3:1 (a secondary
// fill on the dark page); it is pinned here so it cannot get worse unnoticed.
const KNOWN_LOW_BOX_CONTRAST: Record<string, number> = {
  'dark-filled-secondary': 2.6,
};

type Measured = {
  /** how many overlay marks are visible (the check, the dash or the dot): exactly one */
  marks: number;
  /** the visible mark against the fill of its box */
  markVsBox: number;
  /** the box against the page: its fill or its border, whichever stands out more */
  boxVsPage: number;
};

/** Contrast of every checked-toggle fixture, keyed by its id (`checkbox-light-ghost-primary`). */
async function measureToggles(page: Page): Promise<Record<string, Measured>> {
  return page.evaluate(() => {
    // a canvas resolves any CSS color (oklch, light-dark, rgb) to sRGB bytes
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    type Rgba = [number, number, number, number];
    const toRgba = (color: string): Rgba => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return [r, g, b, a / 255];
    };
    // a translucent color is seen blended with what is under it
    const over = (top: Rgba, under: Rgba): Rgba => [
      top[0] * top[3] + under[0] * (1 - top[3]),
      top[1] * top[3] + under[1] * (1 - top[3]),
      top[2] * top[3] + under[2] * (1 - top[3]),
      1,
    ];
    const luminance = (color: Rgba) => {
      const [r, g, b] = color.slice(0, 3).map((channel) => {
        const c = channel / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contrast = (a: Rgba, b: Rgba) => {
      const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
      return (lighter + 0.05) / (darker + 0.05);
    };

    const measured: Record<string, { marks: number; markVsBox: number; boxVsPage: number }> = {};
    for (const input of Array.from(document.querySelectorAll('input[data-testid^="checked-toggle-"]'))) {
      const id = input.getAttribute('data-testid')!.replace('checked-toggle-', '');
      const scheme = id.split('-')[1];
      const surface = document.querySelector(`[data-testid="checked-toggle-page-${scheme}"]`)!;
      const pageColor = toRgba(getComputedStyle(surface).backgroundColor);

      const style = getComputedStyle(input);
      const fill = over(toRgba(style.backgroundColor), pageColor);
      const border = parseFloat(style.borderTopWidth) > 0
        ? over(toRgba(style.borderTopColor), pageColor)
        : pageColor;

      // the overlays are the input's sibling spans; only the one for the current state is visible
      const marks = Array.from(input.parentElement!.querySelectorAll(':scope > span'))
        .filter((span) => getComputedStyle(span).visibility === 'visible');
      const mark = marks.length > 0 ? over(toRgba(getComputedStyle(marks[0]).color), fill) : fill;

      measured[id] = {
        marks: marks.length,
        markVsBox: contrast(mark, fill),
        boxVsPage: Math.max(contrast(fill, pageColor), contrast(border, pageColor)),
      };
    }
    return measured;
  });
}

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="checked-toggle-page-dark"]');
});

for (const scheme of SCHEMES) {
  for (const variant of VARIANTS) {
    test.describe(`${variant} on the ${scheme} page`, () => {
      test('the mark shows against its box in every appearance', async ({ page }) => {
        const measured = await measureToggles(page);
        const tooFaint: string[] = [];
        for (const appearance of APPEARANCES) {
          for (const kind of KINDS) {
            const id = `${kind}-${scheme}-${variant}-${appearance}`;
            const { marks, markVsBox } = measured[id];
            expect(marks, `${id}: one visible mark`).toBe(1);
            if (markVsBox < MIN_CONTRAST) tooFaint.push(`${id}: ${markVsBox.toFixed(2)}`);
          }
        }
        expect(tooFaint).toEqual([]);
      });

      test('the box shows against the page in every appearance', async ({ page }) => {
        const measured = await measureToggles(page);
        const tooFaint: string[] = [];
        for (const appearance of APPEARANCES) {
          const minimum = KNOWN_LOW_BOX_CONTRAST[`${scheme}-${variant}-${appearance}`] ?? MIN_CONTRAST;
          for (const kind of KINDS) {
            const id = `${kind}-${scheme}-${variant}-${appearance}`;
            const { boxVsPage } = measured[id];
            if (boxVsPage < minimum) tooFaint.push(`${id}: ${boxVsPage.toFixed(2)}`);
          }
        }
        expect(tooFaint).toEqual([]);
      });
    });
  }
}

test('the page surfaces of the two columns really differ (light and dark)', async ({ page }) => {
  const light = await getBg(page.locator('[data-testid="checked-toggle-page-light"]'));
  const dark = await getBg(page.locator('[data-testid="checked-toggle-page-dark"]'));
  expect(light).not.toBe(dark);
});
