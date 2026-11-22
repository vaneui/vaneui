import AxeBuilder from '@axe-core/playwright';
import { test, expect, type Page } from './base';

// A placeholder is text, so it needs 4.5:1 against the field it sits in. The Select placeholder
// and the Input and Textarea placeholders took half of the field's text color, 3.4:1 on white,
// which axe reports for the Select as a serious color-contrast violation. Outline and ghost
// fields now draw it in the secondary text color, checked here in every appearance on a light
// and on a dark page.

const MIN_CONTRAST = 4.5;

const SCHEMES = ['light', 'dark'] as const;
const VARIANTS = ['outline', 'ghost'] as const;
const APPEARANCES = ['primary', 'accent', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'] as const;
const KINDS = ['input', 'textarea', 'select'] as const;

/** Placeholder contrast of every fixture, keyed by its id (`select-light-outline-primary`). */
async function measurePlaceholders(page: Page): Promise<Record<string, number>> {
  return page.evaluate(() => {
    // a canvas resolves any CSS color (oklch, light-dark, color-mix) to sRGB bytes
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

    const measured: Record<string, number> = {};
    for (const field of Array.from(document.querySelectorAll('[data-testid^="placeholder-"]:is(input, textarea, select)'))) {
      const id = field.getAttribute('data-testid')!.replace('placeholder-', '');
      const scheme = id.split('-')[1];
      const surface = document.querySelector(`[data-testid="placeholder-page-${scheme}"]`)!;
      const pageColor = toRgba(getComputedStyle(surface).backgroundColor);
      const background = over(toRgba(getComputedStyle(field).backgroundColor), pageColor);
      // a Select shows its placeholder as the selected (disabled) option, in the field's own color
      const text = field.tagName === 'SELECT'
        ? getComputedStyle(field).color
        : getComputedStyle(field, '::placeholder').color;
      measured[id] = contrast(over(toRgba(text), background), background);
    }
    return measured;
  });
}

test.beforeEach(async ({ page, testPage }) => {
  await page.goto(testPage);
  await page.waitForSelector('[data-testid="placeholder-contrast-section"]');
});

for (const scheme of SCHEMES) {
  for (const variant of VARIANTS) {
    test(`${variant} placeholders read as text on the ${scheme} page in every appearance`, async ({ page }) => {
      const measured = await measurePlaceholders(page);
      const tooFaint: string[] = [];
      for (const appearance of APPEARANCES) {
        for (const kind of KINDS) {
          const id = `${kind}-${scheme}-${variant}-${appearance}`;
          expect(measured[id], `${id} measured`).toBeDefined();
          if (measured[id] < MIN_CONTRAST) tooFaint.push(`${id}: ${measured[id].toFixed(2)}`);
        }
      }
      expect(tooFaint).toEqual([]);
    });
  }
}

test('the Select placeholder starts selected and muted', async ({ page }) => {
  const select = page.locator('[data-testid="placeholder-select-light-outline-primary"]');
  await expect(select).toHaveValue('');
  const placeholder = await select.evaluate((el) => getComputedStyle(el).color);
  await select.selectOption('ee');
  const value = await select.evaluate((el) => getComputedStyle(el).color);
  // the placeholder still reads apart from a chosen value
  expect(placeholder).not.toBe(value);
});

// axe reads a Select's placeholder as its text; it does not check ::placeholder, and on an Input or
// Textarea it would measure the (empty) value's color instead, so the scan covers the Selects.
test('axe finds no color-contrast violation on a Select showing its placeholder', async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .include('[data-testid^="placeholder-select-"]')
    .withRules(['color-contrast'])
    .analyze();
  const serious = results.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .flatMap((v) => v.nodes.map((n) => `${v.id}: ${n.target.join(' ')}`));
  expect(serious).toEqual([]);
});
