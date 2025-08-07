# Project Guidelines

Project: VaneUI — a React component library powered by Tailwind CSS. The core idea is that components expose boolean props which map to category keys (such as size, appearance, layout, shape, etc.). Setting a prop like `lg` or `primary` to true selects that variant for the component. A theme system provides defaults and allows deep customization without stringly-typed variant props.

---

## Overview

- React + TypeScript component library
- Tailwind CSS for all styling (via utility classes and CSS variables)
- Boolean prop API for variants
  - Example: `<Button primary lg pill>` instead of `<Button appearance="primary" size="lg" shape="pill"/>`
- Theming via `ThemeProvider`
  - Supports providing a partial theme, default boolean props, extra classes, and programmatic override

## Key Concepts

- Component Categories (src/components/ui/props/keys.ts)
  - Categories such as size, appearance, variant, shape, layout, typography, listStyle, etc.
  - Each category declares allowed keys; props are generated as optional booleans from these keys
- Boolean Props Model (src/components/ui/props/props.ts)
  - Component interfaces extend "ComponentPropsFromCategories", turning category keys into boolean props
  - Ensures a consistent, type-safe surface across all components
- ThemedComponent (src/components/themedComponent.tsx)
  - Generic renderer that uses the component’s theme to compute final tag, classes, and HTML props
- Theme System (src/components/themeContext.tsx)
  - defaultTheme defines the base for all components
  - ThemeProvider merges a provided theme with defaults and can apply:
    - theme: PartialTheme — deep merged with defaultTheme (type-safe)
    - themeDefaults: ThemeDefaults — inject default boolean props per component or sub-part
    - extraClasses: ThemeExtraClasses — append Tailwind classes to theme nodes
    - themeOverride(theme) — programmatic override hook executed after merge

## Theme Customization

ThemeProvider props (src/components/themeContext.tsx):
- theme?: PartialTheme
  - Deep-merged onto defaultTheme to override specific theme parts
- themeDefaults?: ThemeDefaults
  - Recursively sets default boolean props (e.g., make `lg` and `primary` the defaults for Button)
- extraClasses?: ThemeExtraClasses
  - Recursively appends extra Tailwind classes to theme structures (useful for brand tweaks)
- themeOverride?: (theme: ThemeProps) => ThemeProps
  - Final hook to programmatically modify the computed theme

Example:
```tsx
import React from 'react';
import { ThemeProvider, defaultTheme, Button, Text } from '@vaneui/ui';
import '@vaneui/ui/dist/ui.css';
import '@vaneui/ui/dist/vars.css';

const custom = {
  ...defaultTheme,
};

function App() {
  return (
    <ThemeProvider
      theme={custom}
      themeDefaults={{
        button: { primary: true, lg: true, pill: true },
        text: { md: true, sans: true }
      }}
      extraClasses={{
        button: { primary: 'shadow-md', lg: 'tracking-wide' },
        text: { default: 'leading-relaxed' }
      }}
      themeOverride={(t) => {
        // Example: force all links to be underline by default
        (t.link.defaults as any).underline = true;
        return t;
      }}
    >
      <Button>Primary large pill by default</Button>
      <Text>Relaxed text</Text>
    </ThemeProvider>
  );
}
```

## Project Structure (high level)

- src/components
  - ui
    - Primitive components (button, text, label, checkbox, card, grid, etc.)
    - props
      - keys.ts — category and key definitions (size, appearance, etc.)
      - props.ts — typed component props generated from category keys
    - theme
      - Theme definitions per component (e.g., buttonTheme, typographyTheme, checkboxTheme)
  - themedComponent.tsx — generic themed component renderer
  - themeContext.tsx — ThemeProvider, defaultTheme, and merging helpers
- playground — local demo app (see playground/src/App.tsx)
- dist — built CSS and JS

## Running and Testing

- Install deps: `npm install`
- Build library: `npm run build`
- Run tests: `npm test`
  - Jest + ts-jest, jsdom environment
  - Test patterns:
    - src/**/tests/**/*.ts?(x)
    - src/**/?(*.)+(spec|test).ts?(x)
  - Setup file: src/setupTests.ts (Testing Library matchers)
- Type check: `npm run type-check`
- Dev watch: `npm run watch`
- Playground: typically run from the playground project with your dev tooling, importing from `../../src`

## How Boolean Props Map to Tailwind

- Each component’s theme assembles Tailwind classes based on which boolean props are true
- Categories control which keys are valid for a given component (e.g., Buttons use INTERACTIVE_CATEGORIES)
- Themes (e.g., TypographyTheme) define how size/appearance/layout tokens map to Tailwind classes

## Code Style and Contribution

- TypeScript throughout; prefer explicit types for theme structures
- Use boolean props from the category keys instead of string props
- Keep theming logic in theme files; prefer extending existing themes
- Styling via Tailwind utilities and CSS variables
- Update or add tests for new components and theme behaviors
- Follow existing patterns in tests under src/components/tests

## Useful References in Repo

- src/components/ui/props/keys.ts — category and key definitions
- src/components/ui/props/props.ts — typed boolean props per component
- src/components/themedComponent.tsx — generic theme-driven renderer
- src/components/themeContext.tsx — ThemeProvider, defaultTheme, themeDefaults, extraClasses, themeOverride
- src/components/ui/theme/*.ts(x) — concrete theme implementations
- playground/src/App.tsx — example usage
