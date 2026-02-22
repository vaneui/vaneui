---
paths:
  - "e2e/**"
  - "**/test-harness*"
  - "playwright.config.*"
---

# VaneUI E2E Testing Conventions

## Setup
- Framework: Playwright (`@playwright/test`)
- Config: `playwright.config.ts`
- Test harness: `playground/src/test-harness.tsx` (served at `/test.html` via Vite)
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

1. **Add fixtures to `playground/src/test-harness.tsx`**
   - Import the component from `../../src`
   - Add a `<section data-testid="{component}-section">` with test elements
   - Tag each element with `data-testid="{component}-{variant}"` (e.g., `blockquote-default`, `kbd-xs`)
   - Include: default rendering, size variants (xs through xl), key appearance variants

2. **Write spec in `e2e/{name}.spec.ts`**
   - Reuse the standard helper pattern (see below)
   - Navigate to `/test.html`, wait for `[data-testid]`
   - Test: correct HTML tag, key CSS properties, size scaling, appearance differences

## Available Helpers

Copy these into each spec file (they are not shared across files to keep specs self-contained):

```ts
/** Get a resolved computed style property from an element */
async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

/** Get computed color (resolved to rgb) */
async function getColor(locator: Locator): Promise<string> {
  return getStyle(locator, 'color');
}

/** Get computed font-size in px */
async function getFontSize(locator: Locator): Promise<number> {
  const fs = await getStyle(locator, 'font-size');
  return parseFloat(fs);
}

/** Get the first SVG's computed width inside a locator */
async function getSvgWidth(locator: Locator): Promise<string> {
  return locator.locator('svg').first().evaluate(
    (el) => getComputedStyle(el).getPropertyValue('width'),
  );
}
```

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
