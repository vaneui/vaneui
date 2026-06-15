import { test as base, type Locator } from '@playwright/test';

export { expect, type Page, type Locator } from '@playwright/test';

export const test = base.extend<{ testPage: string }>({
  testPage: ['/test.html', { option: true }],
});

// ── Shared helpers ────────────────────────────────────────────────────────────
// Canonical implementations shared across all specs. Import these from
// './base' instead of redefining them per spec file (see
// .claude/rules/e2e-testing.md). Helpers used by only a single spec stay
// local to that spec until a second spec needs them.

/** Get a resolved computed style property from an element */
export async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

/** Get computed color (resolved to rgb/oklch) */
export async function getColor(locator: Locator): Promise<string> {
  return getStyle(locator, 'color');
}

/** Get computed background-color */
export async function getBg(locator: Locator): Promise<string> {
  return getStyle(locator, 'background-color');
}

/** Get computed border-color (shorthand serialization — all four sides) */
export async function getBorderColor(locator: Locator): Promise<string> {
  return getStyle(locator, 'border-color');
}

/** Get computed border-top-color (longhand — use when sides may differ) */
export async function getBorderTopColor(locator: Locator): Promise<string> {
  return getStyle(locator, 'border-top-color');
}

/** Get computed font-size in px */
export async function getFontSize(locator: Locator): Promise<number> {
  const fs = await getStyle(locator, 'font-size');
  return parseFloat(fs);
}

/** Get the first SVG's computed width in px inside a locator */
export async function getSvgWidth(locator: Locator): Promise<number> {
  return locator.locator('svg').first().evaluate(
    (el) => parseFloat(getComputedStyle(el).getPropertyValue('width')),
  );
}

/** Compute WCAG contrast ratio between two elements in the browser.
 *  fg contributes its computed `color`, bg its computed `background-color`.
 *  Uses a canvas to resolve any color format (oklch, rgb, etc.) to sRGB,
 *  then applies the WCAG relative-luminance formula (0.03928 linearization
 *  threshold). Shared by filled-contrast.spec.ts and dark-mode.spec.ts. */
export async function getContrastRatio(fgLocator: Locator, bgLocator: Locator): Promise<number> {
  return bgLocator.evaluate((bgEl, fgSelector) => {
    const fgEl = document.querySelector(fgSelector) as HTMLElement;
    if (!fgEl) throw new Error(`Element not found: ${fgSelector}`);

    const fgColor = getComputedStyle(fgEl).color;
    const bgColor = getComputedStyle(bgEl).backgroundColor;

    // Use a canvas to convert any CSS color to sRGB values
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d')!;

    function toRgb(color: string): [number, number, number] {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return [r, g, b];
    }

    function luminance([r, g, b]: [number, number, number]): number {
      const srgb = [r, g, b].map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    }

    const lFg = luminance(toRgb(fgColor));
    const lBg = luminance(toRgb(bgColor));
    const lighter = Math.max(lFg, lBg);
    const darker = Math.min(lFg, lBg);
    return (lighter + 0.05) / (darker + 0.05);
  }, `[data-testid="${await fgLocator.getAttribute('data-testid')}"]`);
}

/** Fully-transparent background-color serialization */
export const TRANSPARENT = 'rgba(0, 0, 0, 0)';

/** Check if a color string is "visible" (not transparent, not zero-alpha) */
export function isVisibleColor(color: string): boolean {
  if (color === 'transparent' || color === TRANSPARENT) return false;
  // Check for rgba with 0 alpha
  const rgbaMatch = color.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/);
  if (rgbaMatch && parseFloat(rgbaMatch[1]) === 0) return false;
  return true;
}
