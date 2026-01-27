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
