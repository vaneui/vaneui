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

### Playground Examples (REQUIRED)
- [ ] Clean up `playground/src/App.tsx` — remove or condense older sections to keep it manageable (~3-5 sections, ~500 lines)
- [ ] Add examples to `playground/src/App.tsx`
- [ ] Include a new section: `Divider` + `SectionTitle` + multiple `Card` examples
- [ ] Show: default usage, size variants, appearance variants, key props, real-world context
- [ ] Run `npm run playground` to visually verify examples render correctly
- [ ] See `.claude/rules/playground-examples.md` for detailed patterns

### Verification (ALL must pass)
- [ ] `npm run type-check` — TypeScript validation
- [ ] `npm run lint` — ESLint validation
- [ ] `npm test` — Jest test suite
- [ ] `npm run build` — Full build

**Work is NOT complete until tests exist, playground examples are added, and all checks pass.**

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

## No Hardcoded Visual Props on Child Components
When a parent component renders a child VaneUI component (e.g., Menu renders Popup), visual defaults must come from the theme system, not from hardcoded boolean props on the JSX element.

**Wrong:**
```tsx
<Popup md flex column rounded shadow border primary outline {...popupProps}>
```

**Right:**
```tsx
// Create a sub-theme with defaults (e.g., defaultMenuPopupTheme)
// Inject via ThemeProvider wrapping the child component
<ThemeProvider themeDefaults={{ popup: theme.menu.popup.defaults }}>
  <Popup {...popupProps}>
```

This ensures users can customize all visual aspects via ThemeProvider. Only functional/ARIA props (open, onClose, role, id, anchorRef, etc.) should be set directly on the child element.

## No Inline Defaults in ComponentTheme Constructors

Every component's defaults MUST be extracted to a separate `{component}Defaults.ts` file. Never pass inline object literals to `new ComponentTheme(...)`. This applies to sub-theme variants too (e.g., `menuDividerDefaults.ts`, `menuPopupDefaults.ts`). Each defaults file must be:
1. Exported from the component's barrel `index.ts`
2. Included in `src/components/ui/theme/defaults.ts` aggregator

## Size-Dependent Padding and Border-Radius

Padding and border-radius MUST scale with the component's size prop (`xs`/`sm`/`md`/`lg`/`xl`). A component cannot have the same padding or border-radius across different sizes — use size-aware CSS variable mappers (`PyClassMapper`, `PxClassMapper`) rather than fixed Tailwind classes.
