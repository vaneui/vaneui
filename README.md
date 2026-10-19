# VaneUI

[![npm version](https://img.shields.io/npm/v/%40vaneui/ui.svg?style=flat)](https://www.npmjs.com/package/@vaneui/ui)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/vaneui/vaneui/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat)](https://www.typescriptlang.org/)

VaneUI is an open-source React component library for Tailwind CSS v4 with a boolean props API: write `<Button primary lg filled>` instead of `variant="filled" size="lg"`. It has 40+ typed components, theming through CSS variables and `ThemeProvider`, and dark mode. It supports React 18 and 19 and is MIT licensed.

**[Docs](https://vaneui.com/docs)** · **[Installation](https://vaneui.com/docs/getting-started/installation)** · **[Playground](https://vaneui.com/playground)** · **[llms.txt](https://vaneui.com/llms.txt)**

AI coding agents: `claude mcp add vaneui -- npx -y @vaneui/mcp` (other clients: [Use with AI assistants](#use-with-ai-assistants))

## Installation

```bash
npm install @vaneui/ui
# or
yarn add @vaneui/ui
# or
pnpm add @vaneui/ui
```

Then add the styles to your main CSS file. Use one of the two options.

**With Tailwind CSS v4** (recommended). Tailwind scans the components and generates only the classes you use:

```css
@import "tailwindcss";
@import "@vaneui/ui/tokens";
@import "@vaneui/ui/vars";
@source "../node_modules/@vaneui/ui";
```

**Without Tailwind CSS.** Import the prebuilt stylesheet:

```css
@import "@vaneui/ui/css";
```

Do not import both `@vaneui/ui/css` and `@vaneui/ui/vars`: the prebuilt file already contains the variables. The prebuilt file covers VaneUI's own components only, so for other Tailwind utilities in `className`, use the Tailwind option. See [Installation](https://vaneui.com/docs/getting-started/installation) for details.

## Quick start

```tsx
import { ThemeProvider, Button, Card, Text, Stack } from '@vaneui/ui';

export default function App() {
  return (
    <ThemeProvider>
      <Stack>
        <Card>
          <Text lg fontSemibold>Welcome</Text>
          <Text secondary>Size, color and variant are boolean props.</Text>
        </Card>
        <Button lg filled pill>Get started</Button>
      </Stack>
    </ThemeProvider>
  );
}
```

Wrap the app in `ThemeProvider` once, at the root. Components render without it, but `themeDefaults`, `extraClasses` and `themeOverride` only apply inside a provider.

## Boolean props

```tsx
// Prop strings
<Button appearance="primary" size="lg" variant="filled" />

// VaneUI
<Button primary lg filled />
```

Props are grouped into mutually exclusive categories. Pass one value per category:

| Category | Values |
|---|---|
| **Size** | `xs`, `sm`, `md`, `lg`, `xl` |
| **Appearance** | `primary`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`, `inheritAppearance` |
| **Variant** | `filled`, `outline` (default), `ghost` |
| **Shape** | `pill`, `rounded` (default), `sharp` |
| **Typography** | `fontSans`, `fontSerif`, `fontMono`, `fontBold`, `fontSemibold`, `italic`, `underline`, `uppercase`, `textCenter`, ... |
| **Layout** | `gap`/`noGap`, `padding`/`noPadding`, `shadow`/`noShadow`, `flex`, `grid`, `itemsCenter`, ... |

Each component accepts only the categories that apply to it, and the theme maps each prop to Tailwind utility classes. Components come with defaults, so write only what differs: Button is already `sm`, `primary`, `outline` and `rounded`, and Row and Stack already have `gap`. Each docs page lists a component's props and defaults.

```tsx
<Button lg pill shadow>Get started</Button>
<Card secondary filled>Highlighted card</Card>
<Row mobileStack justifyBetween>Stacks on small screens</Row>
```

## Components

Every component is exported from `@vaneui/ui`. Each name links to its docs page.

| Category | Components |
|---|---|
| **Basic** | [Button](https://vaneui.com/docs/basic-components/button), [IconButton](https://vaneui.com/docs/basic-components/icon-button), [NavLink](https://vaneui.com/docs/basic-components/navlink), [Badge](https://vaneui.com/docs/basic-components/badge), [Chip](https://vaneui.com/docs/basic-components/chip), [Code](https://vaneui.com/docs/basic-components/code), [Kbd](https://vaneui.com/docs/basic-components/kbd), [Mark](https://vaneui.com/docs/basic-components/mark), [Icon](https://vaneui.com/docs/basic-components/icon), [Alert](https://vaneui.com/docs/basic-components/alert), [Spinner](https://vaneui.com/docs/basic-components/spinner) |
| **Form** | [Input](https://vaneui.com/docs/form-components/input), [Checkbox](https://vaneui.com/docs/form-components/checkbox), [Label](https://vaneui.com/docs/form-components/label), [Field](https://vaneui.com/docs/form-components/field), [Textarea](https://vaneui.com/docs/form-components/textarea), [Select](https://vaneui.com/docs/form-components/select), [Radio and RadioGroup](https://vaneui.com/docs/form-components/radio), [Switch](https://vaneui.com/docs/form-components/switch) |
| **Typography** | [Text](https://vaneui.com/docs/typography-components/text), [PageTitle](https://vaneui.com/docs/typography-components/page-title), [SectionTitle](https://vaneui.com/docs/typography-components/section-title), [Title](https://vaneui.com/docs/typography-components/title), [Link](https://vaneui.com/docs/typography-components/link), [List and ListItem](https://vaneui.com/docs/typography-components/list), [Blockquote](https://vaneui.com/docs/typography-components/blockquote) |
| **Layout** | [Container](https://vaneui.com/docs/layout-components/container), [Section](https://vaneui.com/docs/layout-components/section), [Row](https://vaneui.com/docs/layout-components/row), [Col](https://vaneui.com/docs/layout-components/col), [Stack](https://vaneui.com/docs/layout-components/stack), [Card](https://vaneui.com/docs/layout-components/card) (CardHeader, CardBody, CardFooter), [Grid2 to Grid6](https://vaneui.com/docs/layout-components/grid), [Divider](https://vaneui.com/docs/layout-components/divider), [Img](https://vaneui.com/docs/layout-components/img), [Table](https://vaneui.com/docs/layout-components/table) (Thead, Tbody, Tfoot, Tr, Th, Td, Caption) |
| **Overlay** | [Overlay](https://vaneui.com/docs/overlay-components/overlay), [Modal](https://vaneui.com/docs/overlay-components/modal) (ModalHeader, ModalBody, ModalFooter, ModalCloseButton), [Popup](https://vaneui.com/docs/overlay-components/popup) (PopupTrigger), [Menu](https://vaneui.com/docs/overlay-components/menu) (MenuItem, MenuLabel), [Tooltip](https://vaneui.com/docs/overlay-components/tooltip) |

Props shared by many components, such as layout and typography props, are on [Common Props](https://vaneui.com/docs/reference/common-props).

Per-component entry points such as `@vaneui/ui/button` and `@vaneui/ui/card` are also available for bundlers that do not fully tree-shake barrel exports.

## Theming

Every component can be customized at three levels.

**CSS variables** override design tokens globally:

```css
:root {
  --color-text-primary: #8b5cf6;
  --br-base: 0.25rem;
}
```

**className** adds Tailwind classes for one-off changes (merged with `twMerge`):

```tsx
<Button className="hover:opacity-80">Custom hover</Button>
```

**ThemeProvider** sets app-wide defaults, adds extra classes, or overrides the theme in code:

```tsx
<ThemeProvider
  themeDefaults={{ button: { main: { pill: true, lg: true } } }}
  extraClasses={{ button: { main: { primary: 'shadow-md' } } }}
  themeOverride={(t) => {
    t.link.defaults = { ...t.link.defaults, underline: true };
    return t;
  }}
>
  <Button>Large pill with shadow by default</Button>
</ThemeProvider>
```

Providers can be nested: `mergeStrategy="merge"` (the default) inherits from the parent provider, and `mergeStrategy="replace"` starts over. See [Theming overview](https://vaneui.com/docs/customization/theming-overview) and [Using ThemeProvider](https://vaneui.com/docs/customization/using-theme-provider).

## Dark mode

Set `data-theme="dark"` on the `<html>` element. The shipped CSS re-declares the color tokens under that attribute, so components need no code changes. The same attribute on a wrapper element darkens only that subtree. See [Dark mode](https://vaneui.com/docs/customization/dark-mode).

```html
<html data-theme="dark">
```

## Use with AI assistants

**MCP server.** [`@vaneui/mcp`](https://www.npmjs.com/package/@vaneui/mcp) gives an AI coding agent the VaneUI docs, a prop table for every component, and two tools: `search_docs` and `get_component_props`. It runs over stdio with `npx` and needs Node.js 24.

Claude Code:

```bash
claude mcp add vaneui -- npx -y @vaneui/mcp
```

VS Code:

```bash
code --add-mcp '{"name":"vaneui","command":"npx","args":["-y","@vaneui/mcp"]}'
```

Claude Desktop (`claude_desktop_config.json`), Cursor (`.cursor/mcp.json`) and other clients that use the `mcpServers` format:

```json
{
  "mcpServers": {
    "vaneui": { "command": "npx", "args": ["-y", "@vaneui/mcp"] }
  }
}
```

Config file locations and more clients are in the [@vaneui/mcp README](https://github.com/vaneui/mcp#quickstart).

**llms.txt.** [vaneui.com/llms.txt](https://vaneui.com/llms.txt) is an index of every docs page, and [vaneui.com/llms-full.txt](https://vaneui.com/llms-full.txt) has all docs pages, with each component's props, in one file you can give to a model as context.

**Context7.** The docs are also indexed on [Context7](https://context7.com/vaneui/vaneui), for assistants that use it.

## Links

- [Documentation](https://vaneui.com/docs)
- [Changelog](https://vaneui.com/docs/reference/changelog)
- [npm](https://www.npmjs.com/package/@vaneui/ui)
- [MCP server](https://github.com/vaneui/mcp)

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](https://github.com/vaneui/vaneui/blob/main/CONTRIBUTING.md) for development setup, architecture and guidelines. To try components locally, run `npm run playground`.

## License

[MIT](https://github.com/vaneui/vaneui/blob/main/LICENSE)
