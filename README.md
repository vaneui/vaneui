# VaneUI

[![npm version](https://img.shields.io/npm/v/%40vaneui/ui.svg?style=flat)](https://www.npmjs.com/package/%40vaneui/ui)

VaneUI is a React + TypeScript component library powered by Tailwind CSS. It uses a boolean-prop API for variants (size, appearance, shape, layout, typography, etc.) and a flexible theme system so you can set defaults, add extra classes, or programmatically override styles.

- Boolean prop API: <Button primary lg pill> instead of stringly typed props
- ThemeProvider with defaults (themeDefaults), extra classes (extraClasses), and programmatic override (themeOverride)
- Built CSS you can import directly (no Tailwind setup required to consume)

## Installation

```bash
npm install @vaneui/ui
# or
yarn add @vaneui/ui
# or
pnpm add @vaneui/ui
```

Peer requirements:
- react and react-dom: ^16.8.0 || ^17 || ^18 || ^19

## Styles

You can import the prebuilt CSS directly:

```ts
// Recommended: use the package export paths
import '@vaneui/ui/css';   // component styles
import '@vaneui/ui/vars';  // CSS variables

// Alternatively (equivalent)
import '@vaneui/ui/dist/ui.css';
import '@vaneui/ui/dist/vars.css';
```

## Quick Start

```tsx
import React from 'react';
import { Button, Text } from '@vaneui/ui';
import '@vaneui/ui/css';
import '@vaneui/ui/vars';

export default function App() {
  return (
    <>
      <Button primary lg pill>Primary large pill</Button>
      <Text md sans>Typed boolean props for typography too</Text>
    </>
  );
}
```

## Theming

All components work out of the box with defaults. For deeper customization, wrap your app with ThemeProvider.

```tsx
import React from 'react';
import { ThemeProvider, defaultTheme, Button, Text } from '@vaneui/ui';
import '@vaneui/ui/css';
import '@vaneui/ui/vars';

export function App() {
  return (
    <ThemeProvider
      theme={defaultTheme}
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

## Boolean Props Model

Each component exposes optional boolean props generated from category keys. Common examples:
- Size: xs, sm, md, lg, xl
- Appearance: default, primary, secondary, tertiary, accent, success, danger, warning, info, transparent
- Variant: filled, outline
- Shape: pill, rounded, sharp
- Typography: sans, serif, mono, thin…black, italic/notItalic, underline/lineThrough/overline, uppercase/lowercase/capitalize
- Layout: gap/noGap, inline/block/flex/grid, justify*, items*, padding/noPadding, shadow/noShadow, ring/noRing

Only the categories relevant to a component are used. The theme maps these booleans to Tailwind utility classes.

## Available Components

From the main entry import:
- Interactive: Button, Badge, Chip, Code, Checkbox, Label
- Layout: Section, Container, Row, Col, Stack, Grid3, Grid4, Card, Divider
- Typography: Text, Title, Link, List, ListItem, SectionTitle, PageTitle
- Media: Img

```ts
import {
  Button, Badge, Chip, Code,
  Checkbox, Label, Img,
  Section, Container, Row, Col, Stack, Grid3, Grid4, Card, Divider,
  Text, Title, Link, List, ListItem, SectionTitle, PageTitle,
} from '@vaneui/ui';
```

## Playground

This repo includes a local playground for development and manual testing.

```bash
# Build the library then start the playground (recommended for fresh state)
npm run playground

# Or run the playground using the last build
npm run playground:dev
```

The sample at playground/src/App.tsx demonstrates several components working together with ThemeProvider.

## Scripts

```bash
npm run build        # Build JS (Rollup) and CSS (Tailwind CLI) into dist/
npm test             # Type-check then run Jest + Testing Library (jsdom)
npm run type-check   # TypeScript type checking only
npm run playground   # Build then start the Vite playground
npm run playground:dev  # Start playground against the current dist
```

## Project Structure (high level)

- src/components
  - ui
    - Primitive components (button, text, label, checkbox, card, grid, layout, etc.)
    - props
      - keys.ts — category/key definitions (size, appearance, layout, typography, etc.)
      - props.ts — typed boolean props for components
    - theme — Tailwind class mappings per component
  - themedComponent.tsx — generic theme-driven renderer
  - themeContext.tsx — ThemeProvider, defaultTheme, and merging helpers
- playground — local demo app
- dist — built CSS and JS output

## Requirements

- React 16.8+ (hooks) up to React 19 are supported as peer dependencies.
- No Tailwind setup is required to consume the library; styles are prebuilt. If you do use Tailwind in your app, VaneUI styles coexist via CSS variables and utility classes.

## Contributing

Contributions are welcome! Please:
- Follow the boolean props model and existing theme patterns
- Add or update tests when adding features
- Keep theming logic in theme files and prefer extending existing patterns

## License

ISC

