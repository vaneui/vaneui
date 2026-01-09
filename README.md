# VaneUI

[![npm version](https://img.shields.io/npm/v/%40vaneui/ui.svg?style=flat)](https://www.npmjs.com/package/%40vaneui/ui)

VaneUI helps you build beautiful, consistent UIs faster by turning common design decisions into expressive, readable boolean props. Instead of memorizing property names and values, you compose intent: `primary`, `lg`, `outline`, `rounded`. The result is cleaner code, fewer decisions per component, and a smoother path from wireframe to production.

## How VaneUI works

At its core, VaneUI maps boolean props to thoughtfully curated CSS classes. You write the JSX using booleans like this:

```tsx
<Button primary lg pill filled>
  Get started
</Button>
```
The component resolves those booleans to semantic styles:
- `primary` → semantic color token
- `lg` → size scale for paddings, border radius, typography size
- `pill` → shape preset
- `filled` → variant preset

Tailwind classes and CSS variables power the final styles:
- Tailwind utilities for performance and composability
- CSS variables for theming and per-app overrides
- Each CSS class can be changed using ThemeProvider
- Each component has a customizable set of default values for boolean props

You can always mix in your own Tailwind classes via className to fine‑tune any edge case:
```tsx
<Button primary lg pill filled className="hover:opacity-80">
  Get started
</Button>
```

## Traditional approach vs VaneUI

Instead of writing verbose prop configurations, VaneUI uses intuitive boolean props that make your code cleaner and more readable:

```tsx
// Traditional approach
<Button appearance="primary" size="lg" variant="filled" />

// VaneUI approach  
<Button primary lg filled />
```

## Prop combinations

Boolean props can be combined naturally to create the exact styling you need:

```tsx
<Button primary lg pill shadow>
  Large primary pill button with shadow
</Button>

<Card secondary padding border rounded>
  Secondary card with padding, border and rounded corners
</Card>

<Stack column itemsCenter>
  Vertical stack with gap and centered items
</Stack>
```

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

## Every Class is Customizable

Behind each boolean prop are carefully crafted CSS classes that you can completely override.

### CSS Variables

You can customize the VaneUI by overriding the CSS variables:

```css
:root {
  --color-text-primary: #8b5cf6;      /* Primary text color */
  --ui-br-md: 1rem;        /* Medium UI radius */
}
```

### Tailwind Overrides

Each component can be changed by using the regular Tailwind CSS classes:

```tsx
<Button primary className="bg-purple-600 hover:bg-purple-700">
  Custom Primary
</Button>
```

### Theme Overrides

You can set up default values of all boolean props by providing `themeDefaults` in ThemeProvider:

```tsx
const defaults: ThemeDefaults = {
  button: {
    pill: true,
    lg: true,
  },
};

return (
  <ThemeProvider themeDefaults={defaults}>
    <Button>This button is large and pill-shaped</Button>
  </ThemeProvider>
);
```

You can modify component themes programmatically by providing `themeOverride` in ThemeProvider:

```tsx
const overrideFunc = (theme: ThemeProps) => {
  // Add classes to button's base (always applied)
  theme.button.base += ' uppercase tracking-wide';

  // Change default props for a component
  theme.button.defaults = { ...theme.button.defaults, semibold: true };

  return theme;
};

return (
  <ThemeProvider themeOverride={overrideFunc}>
    <Button>This button is uppercase with tracking</Button>
  </ThemeProvider>
);
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
- Size: `xs`, `sm`, `md`, `lg`, `xl`
- Appearance: `primary`, `brand`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`, `link`
- Variant: `filled`, `outline`
- Shape: `pill`, `rounded`, `sharp`
- Typography: `sans`, `serif`, `mono`, `thin`…`black`, `italic`/`notItalic`, `underline`/`lineThrough`/`overline`, `uppercase`/`lowercase`/`capitalize`
- Layout: `gap`/`noGap`, `inline`/`block`/`flex`/`grid`, `justify*`, `items*`, `padding`/`noPadding`, `shadow`/`noShadow`, `ring`/`noRing`

Only the categories relevant to a component are used. The theme maps these booleans to Tailwind utility classes.

## Available Components

From the main entry import:
- Interactive: Button, Badge, Chip, Code, Input, Checkbox, Label
- Layout: Section, Container, Row, Col, Stack, Grid2, Grid3, Grid4, Grid5, Grid6, Card, Divider
- Typography: Text, Title, Link, List, ListItem, SectionTitle, PageTitle
- Media: Img

```ts
import {
  Button, Badge, Chip, Code,
  Input, Checkbox, Label, Img,
  Section, Container, Row, Col, Stack, Grid2, Grid3, Grid4, Grid5, Grid6, Card, Divider,
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

