# VaneUI

[![npm version](https://img.shields.io/npm/v/%40vaneui/ui.svg?style=flat)](https://www.npmjs.com/package/%40vaneui/ui)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat)](https://www.typescriptlang.org/)

A React component library that turns design decisions into expressive boolean props. Instead of memorizing property names and values, you compose intent: `primary`, `lg`, `outline`, `rounded`.

**[Documentation](https://vaneui.com/)** · **[Playground](#playground)**

## Features

- **Boolean props API** — write `<Button primary lg filled>` instead of `<Button appearance="primary" size="lg" variant="filled" />`
- **Tailwind CSS v4** — CSS variable-based theming, utility classes for performance and composability
- **ThemeProvider** — customize defaults, override classes, and nest themes with merge or replace strategies
- **30+ components** — interactive, layout, typography, media, and overlay components
- **React 16.8–19** — works with hooks-era React through React 19

## Traditional approach vs VaneUI

```tsx
// Traditional approach
<Button appearance="primary" size="lg" variant="filled" />

// VaneUI approach
<Button primary lg filled />
```

Boolean props can be combined naturally:

```tsx
<Button primary lg pill shadow>Get started</Button>
<Card secondary filled>Highlighted card</Card>
<Stack itemsCenter>Centered vertical stack</Stack>
```

## Installation

```bash
npm install @vaneui/ui
# or
yarn add @vaneui/ui
# or
pnpm add @vaneui/ui
```

## Quick Start

```tsx
import { ThemeProvider, Button, Card, Text, Stack } from '@vaneui/ui';
import '@vaneui/ui/css';
import '@vaneui/ui/vars';

export default function App() {
  return (
    <ThemeProvider>
      <Stack>
        <Card>
          <Text lg semibold>Welcome</Text>
          <Text secondary>Build UIs faster with boolean props.</Text>
        </Card>
        <Button primary lg filled pill>Get started</Button>
      </Stack>
    </ThemeProvider>
  );
}
```

## Customization

Every component is customizable at three levels:

**CSS variables** — override design tokens globally:

```css
:root {
  --color-text-primary: #8b5cf6;
  --br-base: 0.25rem;
}
```

**className** — add Tailwind classes for one-off tweaks (merged via `twMerge`):

```tsx
<Button primary className="hover:opacity-80">Custom hover</Button>
```

**ThemeProvider** — set global defaults, add extra classes, or override themes programmatically:

```tsx
<ThemeProvider
  themeDefaults={{ button: { pill: true, lg: true } }}
  extraClasses={{ button: { primary: 'shadow-md' } }}
  themeOverride={(t) => {
    t.link.defaults = { ...t.link.defaults, underline: true };
    return t;
  }}
>
  <Button>Large pill with shadow by default</Button>
</ThemeProvider>
```

See the [documentation](https://vaneui.com/) for the full theming guide.

## Available Components

| Category | Components |
|---|---|
| **Interactive** | Button, Badge, Chip, Code, Input, Checkbox, Label |
| **Layout** | Section, Container, Row, Col, Stack, Grid2–Grid6, Card, Divider |
| **Typography** | Text, Title, Link, List, ListItem, SectionTitle, PageTitle |
| **Media** | Img |
| **Overlay** | Overlay, Modal, ModalHeader, ModalBody, ModalFooter, Popup, PopupTrigger |

```ts
import {
  Button, Badge, Chip, Code, Input, Checkbox, Label, Img,
  Section, Container, Row, Col, Stack, Grid2, Grid3, Grid4, Grid5, Grid6, Card, Divider,
  Text, Title, Link, List, ListItem, SectionTitle, PageTitle,
  Overlay, Modal, ModalHeader, ModalBody, ModalFooter, Popup, PopupTrigger,
} from '@vaneui/ui';
```

## Prop Categories

Props are grouped into mutually exclusive categories — only one value per category is active:

| Category | Values |
|---|---|
| **Size** | `xs`, `sm`, `md` (default), `lg`, `xl` |
| **Appearance** | `primary`, `brand`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`, `link` |
| **Variant** | `filled`, `outline` (default) |
| **Shape** | `pill`, `rounded` (default), `sharp` |
| **Typography** | `sans`, `serif`, `mono`, `bold`, `semibold`, `italic`, `underline`, `uppercase`, `textCenter`, ... |
| **Layout** | `gap`/`noGap`, `padding`/`noPadding`, `shadow`/`noShadow`, `flex`, `grid`, `itemsCenter`, ... |

Only the categories relevant to a component are available. The theme maps these booleans to Tailwind utility classes.

## Playground

A local playground is included for development and manual testing:

```bash
npm run playground
```

## Links

- [Documentation](https://vaneui.com/)
- [Contributing](./CONTRIBUTING.md)
- [npm](https://www.npmjs.com/package/@vaneui/ui)

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup, architecture details, and guidelines.

## License

MIT
