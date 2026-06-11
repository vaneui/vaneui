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
