---
paths:
  - "src/components/**/*.tsx"
  - "src/components/**/*.ts"
---

# VaneUI Component Development Patterns

## Component Structure

Every component follows this exact pattern:

```tsx
import React, { forwardRef } from 'react';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export type ComponentProps = BaseProps & SizeProps & AppearanceProps & /* ... */ &
  Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'> & {
    href?: string;
    tag?: React.ElementType;
  };

export const Component = forwardRef<HTMLElement, ComponentProps>(
  function Component(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.componentName} {...props} />
  }
);

Component.displayName = 'Component';
```

## Required Checklist

### Component Implementation
- [ ] Use `forwardRef` with correct element type generic
- [ ] Use `ThemedComponent` wrapper with theme from `useTheme()`
- [ ] Set `displayName`
- [ ] Export both the component and its props type
- [ ] Add to barrel export in `src/index.ts`
- [ ] Components with `href` must support tag switching (button/div -> `<a>`)

### Theme Integration
- [ ] Create theme file in `src/components/ui/theme/{component}Theme.ts`
- [ ] Update `src/components/themeContext.tsx` with theme import and types
- [ ] Add categories to `src/components/ui/props/keys.ts` if needed
- [ ] **Key types must be imported from `keys.ts`** — never define Key types locally in theme files

**Key Type Pattern:**
```typescript
// In keys.ts - define once
export const ComponentKeys = {
  myCategory: ['optionA', 'optionB'] as const,
};
export type MyCategoryKey = typeof ComponentKeys.myCategory[number];

// In theme file - import, don't redefine
import type { CategoryProps, MyCategoryKey } from "../../props";
```

### Testing (REQUIRED)
- [ ] Create test file: `src/components/tests/{component}.test.tsx`
- [ ] Test default rendering and CSS classes
- [ ] Test all size variants (xs, sm, md, lg, xl)
- [ ] Test appearance variants (primary, secondary, success, danger, etc.)
- [ ] Test variant modifiers (filled, outline)
- [ ] Test shape variants if applicable (rounded, pill, sharp)
- [ ] Test ref forwarding
- [ ] Test boolean props don't leak to DOM
- [ ] Test HTML attributes pass through
- [ ] Test custom className merging
- [ ] Test tag switching if component supports `href`

### Verification (ALL must pass)
- [ ] `npm run type-check` — TypeScript validation
- [ ] `npm run lint` — ESLint validation
- [ ] `npm test` — Jest test suite
- [ ] `npm run build` — Full build

**Work is NOT complete until tests exist and all checks pass.**

## Prop Categories (Mutually Exclusive Within Category)
- **size**: xs, sm, md, lg, xl
- **appearance**: primary, brand, accent, secondary, tertiary, success, danger, warning, info, link
- **variant**: filled, outline
- **shape**: pill, rounded, sharp
- **display**: inline, block, flex, inlineFlex, grid, etc.
- **flexDirection**: row, column, rowReverse, columnReverse

Categories are defined in `src/components/ui/props/keys.ts`. Each component specifies which categories it supports via `ComponentCategories`.

## Component Types (data-vane-type)
- `"ui"` — Interactive elements (Button, Badge, Chip, Code, Input, Checkbox, Label) and typography (Text, Title, Link, etc.). Compact spacing.
- `"layout"` — Structural elements (Card, Row, Col, Stack, Section, Container, Grid*, Divider). Generous spacing.

## Key Defaults (Don't Redundantly Specify)
- **Button**: primary, outline, semibold, rounded, padding, gap, shadow, ring, focusVisible
- **Card**: padding, rounded, outline, gap
- **Row**: itemsCenter, gap, outline
- **Stack**: padding, gap, outline
- **Badge**: primary, outline, pill
- **Chip**: secondary (not primary!), outline, rounded
- **Link**: link (not primary!), outline, underline
- **Input**: primary, outline, rounded
- **Typography** (Text, Title, etc.): md, primary, outline
- **Layout** (Row, Col, Stack, Card, Section, Container, Grid*): gap, md, outline

## Boolean Props Must Not Leak to DOM
All boolean props (size, appearance, variant, shape, typography, layout) are consumed by the theme system via `getComponentConfig()` and must be stripped before rendering to the DOM element. Only HTML-valid attributes should pass through.
