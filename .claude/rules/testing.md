---
paths:
  - "**/*.test.*"
  - "**/*.spec.*"
  - "**/tests/**"
---

# VaneUI Testing Conventions

## Setup
- Framework: Jest with ts-jest preset
- Environment: jsdom
- Test location: `src/components/tests/`
- Setup file: `src/components/tests/setupTests.ts`
- Run all: `npm test`
- Run one: `npx jest --no-coverage path/to/test.tsx`

## Test Categories
1. **Component rendering** — Correct HTML tag, CSS classes, data attributes
2. **Prop filtering** — Boolean props consumed by theme (not leaked to DOM), HTML attrs pass through
3. **Tag switching** — Button/Card with `href` renders as `<a>`
4. **Ref forwarding** — `forwardRef` works correctly for all components
5. **Theme integration** — ThemeProvider defaults/overrides/nesting apply correct classes
6. **Prop omission** — Mutually exclusive props (category priority), edge cases

## Test Pattern
```tsx
import { render } from '@testing-library/react';
import { Button } from '../ui/button';

test('renders with correct data attributes', () => {
  const { container } = render(<Button primary filled lg>Click</Button>);
  const el = container.firstChild as HTMLElement;
  expect(el.getAttribute('data-size')).toBe('lg');
  expect(el.getAttribute('data-appearance')).toBe('primary');
  expect(el.getAttribute('data-variant')).toBe('filled');
});
```

## Rules
- Every new component needs a test file
- Test that boolean props do NOT appear as DOM attributes
- Test that HTML attributes (onClick, aria-*, data-custom-*) DO pass through
- Test ref forwarding for every component
- Use `@testing-library/react` render, not ReactDOM directly

## Theme Coverage Test (REQUIRED for every component)

Every component/sub-component that has its own categories array + theme must be registered in `src/components/tests/componentThemeCoverage.test.ts`. This test validates:
- **Category coverage** (`testCategoryCoverage`): every category key in the component's `*_CATEGORIES` array has a corresponding class mapper that produces CSS output
- **Defaults coverage** (`testThemeDefaults`): every boolean default prop (`defaults.prop = true`) has a theme handler

### How to add a new component

1. Import the theme and categories at the top of the file:
   ```ts
   import { defaultMyComponentTheme } from "../ui/myComponent";
   import { MY_COMPONENT_CATEGORIES } from "../ui/myComponent";
   // OR from "../ui/props" if re-exported there
   ```

2. Add a config in the appropriate `describe` block (Interactive, Typography, Layout, Form, Media, Overlay/Popup/Icon, Modal, Menu, Sub-components):
   ```ts
   const myComponentConfig: ComponentTestConfig = {
     propsType: "MyComponentProps",
     categories: MY_COMPONENT_CATEGORIES,
     themes: [
       { name: "defaultMyComponentTheme", theme: defaultMyComponentTheme }
     ]
   };
   createThemeTests(myComponentConfig);
   ```

3. If the component shares categories with an existing config (e.g., uses `BUTTON_CATEGORIES` like IconButton, or `CODE_CATEGORIES` like Kbd), add its theme to the existing config's `themes[]` array instead of creating a new config.

4. For `.withDefaults()` variants (themes that reuse a parent's mappers with different defaults), only add a standalone defaults test — category coverage is already tested by the parent:
   ```ts
   it("should ensure defaultMyVariantTheme has handlers for all its default props", () => {
     tester.testThemeDefaults("defaultMyVariantTheme", defaultMyVariantTheme);
   });
   ```

### Import rules
- Import themes from specific files (e.g., `../ui/button/defaultButtonTheme`) to avoid circular dependency issues, OR from the component barrel if it's safe (most barrels are safe for `default*Theme` imports in test files)
- Categories can be imported from `../ui/props` if re-exported there, or from the component barrel, or from the direct file (e.g., `../ui/modal/ModalHeaderCategories`)

### What this catches
- A new prop added to categories but no class mapper → `testCategoryCoverage` fails
- A new boolean default with no mapper → `testThemeDefaults` fails
- A mapper removed or broken → tests fail
- Without this test, such mismatches are **silent** — the user passes a prop, nothing happens

## E2E Tests

For computed CSS validation (color inheritance, font-size scaling, border rendering), see `.claude/rules/e2e-testing.md`. The full verification pipeline includes both unit tests (`npm test`) and e2e tests (`npm run test:e2e`).
