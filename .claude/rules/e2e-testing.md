---
paths:
  - "e2e/**"
  - "e2e/**"
  - "playwright.config.*"
---

# VaneUI E2E Testing Conventions

## Setup
- Framework: Playwright (`@playwright/test`)
- Config: `playwright.config.ts`
- Test harness: `e2e/fixtures/test-harness.tsx` (served at `/test.html` via Vite from `e2e/fixtures/`)
- Run headless: `npm run test:e2e`
- Run interactive: `npm run test:e2e:ui`

## Architecture

E2e tests validate **computed CSS styles in a real browser**. They complement Jest unit tests:

| Concern | Unit tests (Jest) | E2e tests (Playwright) |
|---------|-------------------|------------------------|
| CSS class generation | Yes | No |
| Prop behavior / DOM attributes | Yes | No |
| Computed CSS values (color, font-size, border) | No | Yes |
| CSS variable resolution | No | Yes |
| Color inheritance across components | No | Yes |
| Size scaling (xs→xl) | No | Yes |

## Pattern: Adding Tests for a New Component

1. **Add fixtures to `e2e/fixtures/test-harness.tsx`**
   - Import the component from `../../src`
   - Add a `<section data-testid="{component}-section">` with test elements
   - Tag each element with `data-testid="{component}-{variant}"` (e.g., `blockquote-default`, `kbd-xs`)
   - Include: default rendering, size variants (xs through xl), key appearance variants

2. **Write spec in `e2e/{name}.spec.ts`**
   - Reuse the standard helper pattern (see below)
   - Navigate to `/test.html`, wait for `[data-testid]`
   - Test: correct HTML tag, key CSS properties, size scaling, appearance differences

## Available Helpers

Shared helpers are exported from `e2e/base.ts`. **Import them — do NOT redefine them locally in spec files** (local copies drift apart):

```ts
import { test, expect, getStyle, getColor, getFontSize } from './base';
```

| Helper | Returns | Description |
|--------|---------|-------------|
| `getStyle(locator, property)` | `Promise<string>` | Resolved computed style property |
| `getColor(locator)` | `Promise<string>` | Computed `color` |
| `getBg(locator)` | `Promise<string>` | Computed `background-color` |
| `getBorderColor(locator)` | `Promise<string>` | Computed `border-color` (shorthand, all four sides) |
| `getBorderTopColor(locator)` | `Promise<string>` | Computed `border-top-color` (longhand — use when sides may differ) |
| `getFontSize(locator)` | `Promise<number>` | Computed font-size in px |
| `getSvgWidth(locator)` | `Promise<number>` | First descendant SVG's computed width in px |
| `isVisibleColor(color)` | `boolean` | Whether a color string is non-transparent (not `transparent` / zero-alpha) |
| `TRANSPARENT` | `string` | `'rgba(0, 0, 0, 0)'` — fully-transparent background serialization |

Rules:
- New specs import these from `./base` rather than redefining them.
- A helper needed by only ONE spec stays local to that spec; promote it to `e2e/base.ts` (exported, with a doc comment) as soon as a second spec needs it.
- Do not change a shared helper's contract (e.g. its return type or the CSS property it reads) — add a new clearly-named helper instead if a different contract is needed.

## Common Test Patterns

### Tag verification
```ts
test('renders as <blockquote> tag', async ({ page }) => {
  const el = page.locator('[data-testid="blockquote-default"]');
  const tagName = await el.evaluate(e => e.tagName.toLowerCase());
  expect(tagName).toBe('blockquote');
});
```

### Size scaling (strictly increasing)
```ts
test('sizes xs→xl produce strictly increasing font-sizes', async ({ page }) => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const fontSizes: number[] = [];
  for (const size of sizes) {
    fontSizes.push(await getFontSize(page.locator(`[data-testid="component-${size}"]`)));
  }
  for (let i = 1; i < fontSizes.length; i++) {
    expect(fontSizes[i]).toBeGreaterThan(fontSizes[i - 1]);
  }
});
```

### Color inheritance
```ts
test('inherits parent color from Card', async ({ page }) => {
  const child = page.locator('[data-testid="component-inherit-brand"]');
  const sibling = page.locator('[data-testid="component-inherit-brand-text"]');
  expect(await getColor(child)).toBe(await getColor(sibling));
});
```

## Rules

- Every new component needs test harness fixtures + e2e spec coverage
- Use `data-testid` attributes for all test elements (never query by class or text content)
- Size variant tests must verify **strict ordering** (each size larger than previous)
- Appearance tests should compare different appearances to verify they produce different colors
- E2e tests run as part of `prepublishOnly` — they gate `npm publish`
