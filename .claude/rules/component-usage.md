# VaneUI Component Usage Guide

This guide is for consuming projects that use `@vaneui/ui`. It covers correct component usage, composition patterns, and common mistakes.

## Setup

### Required Imports

```tsx
import '@vaneui/ui/vars';  // CSS variables (required)
import '@vaneui/ui/css';   // Component styles (required)
import { ThemeProvider, Button, Card, Row, Stack, Text, Title } from '@vaneui/ui';
```

### ThemeProvider

Wrap your app in `ThemeProvider`. It is required for theming to work.

```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

Customize defaults globally:

```tsx
<ThemeProvider themeDefaults={{ button: { filled: true, lg: true } }}>
  {/* All buttons are now filled + large by default */}
  <Button>Save</Button>
</ThemeProvider>
```

Add extra CSS classes per prop:

```tsx
<ThemeProvider extraClasses={{ button: { primary: "custom-primary-class" } }}>
  <Button>Styled</Button>
</ThemeProvider>
```

Nested providers inherit from parent (`mergeStrategy="merge"`, default) or reset (`mergeStrategy="replace"`):

```tsx
<ThemeProvider themeDefaults={{ button: { filled: true } }}>
  <Button>Filled (inherited)</Button>
  <ThemeProvider themeDefaults={{ button: { danger: true } }} mergeStrategy="replace">
    <Button>Danger outline (reset, not filled)</Button>
  </ThemeProvider>
</ThemeProvider>
```

## Component Selection Guide

| Need | Component | Notes |
|------|-----------|-------|
| Clickable action | `Button` | Renders `<button>`, or `<a>` with `href` |
| Icon-only button | `IconButton` | Square button, renders `<button>` or `<a>` with `href` |
| Navigation link | `NavLink` | For sidebars/nav menus. Has `active` prop with `aria-current="page"`. Renders `<a>` with `href`, `<button>` without |
| Content container with border | `Card` | Renders `<div>`, or `<a>` with `href`. Sub-components: `CardHeader`, `CardBody`, `CardFooter` |
| Horizontal layout | `Row` | Flexbox row, `itemsCenter` by default |
| Vertical layout | `Stack` | Flexbox column with padding |
| Vertical layout (no padding) | `Col` | Flexbox column, no padding |
| Page-width wrapper | `Container` | Centered, max-width, no padding |
| Semantic page section | `Section` | Flex column with padding, responsive |
| Equal-column grid | `Grid2`-`Grid6` | CSS Grid with N columns |
| Page heading | `PageTitle` | Renders `<h1>`, responsive |
| Section heading | `SectionTitle` | Renders `<h2>`, responsive |
| Subsection heading | `Title` | Renders `<h3>`, responsive |
| Body text | `Text` | Renders `<p>` |
| Hyperlink | `Link` | Renders `<a>`, underline by default, `link` appearance (blue) |
| Status indicator | `Badge` | Pill-shaped, uppercase, semibold |
| Tag / filter token | `Chip` | Rounded, monospace, secondary by default |
| Inline code | `Code` | Monospace, rounded, with padding |
| Keyboard shortcut | `Kbd` | Monospace, bordered, 3D effect |
| Text highlight | `Mark` | Background highlight, defaults to warning (yellow) |
| Quoted content | `Blockquote` | Left border accent, inherits parent appearance |
| Text input | `Input` | Renders `<input>`, all HTML input attrs |
| Toggle | `Checkbox` | Custom styled, use inside `Label` |
| Input label | `Label` | Flex row with gap, sm size, inherit appearance |
| Bullet/number list | `List` + `ListItem` | `<ul>` default, `<ol>` with `decimal` |
| Horizontal rule | `Divider` | Thin line separator |
| Image | `Img` | Rounded by default |
| Fullscreen backdrop | `Overlay` | Portal-rendered, click-to-close, optional blur |
| Dialog | `Modal` | Accessible dialog with focus trap, scroll lock. Sub-components: `ModalHeader`, `ModalBody`, `ModalFooter`, `ModalCloseButton` |
| Floating element | `Popup` + `PopupTrigger` | CSS Anchor Positioning, 12 placement options |
| Dropdown menu | `Menu` + `MenuItem` + `MenuLabel` | Button-triggered dropdown with keyboard navigation. Use `Divider` between groups |

## Common Patterns

### Page layout

```tsx
<Container>
  <Section>
    <PageTitle>Dashboard</PageTitle>
    <Text>Welcome back.</Text>
  </Section>
  <Section>
    <SectionTitle>Overview</SectionTitle>
    <Row mobileCol>
      <Card>
        <Title>Revenue</Title>
        <Text>$12,000</Text>
      </Card>
      <Card>
        <Title>Users</Title>
        <Text>1,234</Text>
      </Card>
    </Row>
  </Section>
</Container>
```

### Form

```tsx
<Card>
  <Stack>
    <Title>Sign Up</Title>
    <Label>
      Email
      <Input type="email" placeholder="you@example.com" />
    </Label>
    <Label>
      Password
      <Input type="password" placeholder="********" />
    </Label>
    <Label>
      <Checkbox />
      I agree to the terms
    </Label>
    <Button filled>Create Account</Button>
  </Stack>
</Card>
```

### Button group

```tsx
<Row>
  <Button secondary>Cancel</Button>
  <Button filled>Save</Button>
</Row>
```

### Button variants

```tsx
<Button>Default (primary outline)</Button>
<Button filled>Primary filled</Button>
<Button danger>Danger outline</Button>
<Button danger filled>Danger filled</Button>
<Button success filled lg>Large success</Button>
<Button href="/docs">Link button (renders <a>)</Button>
<Button pill>Pill shaped</Button>
<Button sharp>Sharp corners</Button>
```

### Card as link

```tsx
<Card href="/details">
  <Title>Clickable card</Title>
  <Text>Renders as an anchor tag.</Text>
</Card>
```

### Feature grid

```tsx
<Grid3>
  <Card>
    <Title>Feature 1</Title>
    <Text>Description of feature one.</Text>
  </Card>
  <Card>
    <Title>Feature 2</Title>
    <Text>Description of feature two.</Text>
  </Card>
  <Card>
    <Title>Feature 3</Title>
    <Text>Description of feature three.</Text>
  </Card>
</Grid3>
```

### Status badges

```tsx
<Row>
  <Badge success filled>Active</Badge>
  <Badge warning filled>Pending</Badge>
  <Badge danger filled>Error</Badge>
</Row>
```

### List

```tsx
<List>
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
</List>

<List decimal>
  <ListItem>Step one</ListItem>
  <ListItem>Step two</ListItem>
</List>
```

### Inline code in text

```tsx
<Text>Run <Code>npm install @vaneui/ui</Code> to get started.</Text>
```

### Custom tag rendering

```tsx
<Stack tag="nav">...</Stack>
<Row tag="header">...</Row>
<Card tag="article">...</Card>
```

### External links

```tsx
{/* External link — auto target="_blank" and rel="noopener noreferrer" */}
<Link href="https://github.com" external>GitHub</Link>

{/* Manual target="_blank" — auto rel="noopener noreferrer" */}
<Link href="https://github.com" target="_blank">GitHub</Link>
```

### Sidebar navigation

```tsx
<Col>
  <NavLink href="/dashboard" active><Home size={16} /> Dashboard</NavLink>
  <NavLink href="/settings"><Settings size={16} /> Settings</NavLink>
  <NavLink href="/profile"><User size={16} /> Profile</NavLink>
  <NavLink href="/help" disabled><HelpCircle size={16} /> Help</NavLink>
</Col>
```

### Modal dialog

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Dialog</Button>
<Modal open={open} onClose={() => setOpen(false)}>
  <ModalHeader>
    <Title>Confirm Action</Title>
    <ModalCloseButton />
  </ModalHeader>
  <ModalBody>
    <Text>Are you sure you want to proceed?</Text>
  </ModalBody>
  <ModalFooter>
    <Button secondary onClick={() => setOpen(false)}>Cancel</Button>
    <Button filled onClick={() => setOpen(false)}>Confirm</Button>
  </ModalFooter>
</Modal>
```

### Dropdown menu

```tsx
<Menu trigger={<Button>Actions <ChevronDown size={14} /></Button>}>
  <MenuItem>Edit</MenuItem>
  <MenuItem>Duplicate</MenuItem>
  <Divider />
  <MenuItem danger>Delete</MenuItem>
</Menu>
```

### Card with sub-components

```tsx
<Card>
  <CardHeader>
    <Title>Settings</Title>
    <Badge success>Active</Badge>
  </CardHeader>
  <CardBody>
    <Text>Configure your preferences below.</Text>
  </CardBody>
  <CardFooter>
    <Button secondary>Cancel</Button>
    <Button filled>Save</Button>
  </CardFooter>
</Card>
```

## Responsive Layout

VaneUI is **desktop-first**. Base styles target desktop. Use breakpoint props to adapt for smaller screens.

```tsx
{/* Row on desktop, stacks to column on mobile */}
<Row mobileCol>
  <Card>Left</Card>
  <Card>Right</Card>
</Row>

{/* Row on desktop, stacks to column on tablet and below */}
<Row tabletCol>
  <Card>Left</Card>
  <Card>Right</Card>
</Row>

{/* Hide on mobile */}
<Col mobileHide>
  <Text>Desktop only sidebar</Text>
</Col>

{/* Hide on desktop, show on mobile */}
<Row desktopHide>
  <Text>Mobile-only nav</Text>
</Row>
```

Breakpoints (max-width): mobile = 768px, tablet = 1024px, desktop = 1280px.

## Size Props

All components support size props. Only one is active at a time.

```tsx
<Button xs>Extra small</Button>
<Button sm>Small</Button>
<Button>Medium (default)</Button>
<Button lg>Large</Button>
<Button xl>Extra large</Button>
```

Size controls font-size, padding, gap, and border-radius simultaneously via CSS variables. Do not use Tailwind size classes to override these.

## Appearance Props

One appearance per component. Controls text, background, and border colors.

```tsx
<Button>Primary (default)</Button>
<Button brand>Brand</Button>
<Button accent>Accent</Button>
<Button secondary>Secondary</Button>
<Button tertiary>Tertiary</Button>
<Button success>Success</Button>
<Button danger>Danger</Button>
<Button warning>Warning</Button>
<Button info>Info</Button>
```

Note: `Link` defaults to `link` appearance (not `primary`). `Chip` defaults to `secondary` (not `primary`). Typography components (`Text`, `Title`, etc.) default to `inherit` (not `primary`).

## Variant Props

Controls whether colors are applied as background fill or as border/text only.

```tsx
<Button>Outline (default)</Button>
<Button filled>Filled background</Button>
```

## Shape Props

Controls border-radius. One per component.

```tsx
<Button>Rounded (default)</Button>
<Button pill>Pill / fully rounded</Button>
<Button sharp>No border-radius</Button>
```

## Toggle Props

These are on/off switches. Check defaults before using — many are already true.

```tsx
{/* Layout toggles */}
<Card noGap>No gap between children</Card>
<Card noPadding>No padding</Card>
<Card shadow>Add shadow</Card>
<Card noShadow>Remove shadow</Card>
<Card border>Add border</Card>
<Card noBorder>Remove border</Card>
<Row flexWrap>Allow wrapping</Row>

{/* Typography toggles */}
<Text bold>Bold text</Text>
<Text semibold>Semibold text</Text>
<Text italic>Italic text</Text>
<Text underline>Underlined text</Text>
<Text uppercase>UPPERCASE TEXT</Text>
<Text mono>Monospace text</Text>
<Text textCenter>Centered</Text>
<Text textRight>Right-aligned</Text>
```

## Anti-Patterns

### Don't use Tailwind classes for things VaneUI props handle

```tsx
// WRONG - Tailwind overrides
<Row className="flex items-center gap-4">
<Button className="bg-red-500 text-white rounded-full font-bold">
<Card className="p-4">
<Text className="font-bold text-center">

// RIGHT - VaneUI props
<Row>
<Button danger filled pill bold>
<Card>
<Text bold textCenter>
```

### Don't specify props that are already defaults

```tsx
// WRONG - redundant (these are already true by default)
<Row gap itemsCenter>
<Button primary outline semibold rounded padding ring>
<Card padding rounded gap border>
<Badge primary pill uppercase semibold>
<Stack column gap padding>
<Link underline>

// RIGHT - just use the component
<Row>
<Button>
<Card>
<Badge>
<Stack>
<Link>
```

### Don't wrap Button or NavLink in Link for navigation

```tsx
// WRONG - nested interactive elements (accessibility violation)
<Link href="/docs">
  <Button>Documentation</Button>
</Link>

// RIGHT - Button supports href and tag props
<Button href="/docs" tag={Link}>Documentation</Button>

// RIGHT - or use NavLink for sidebar/header navigation
<NavLink href="/docs" tag={Link}>Documentation</NavLink>
```

### Don't use Text or span as anchor — use Link

```tsx
// WRONG - Text is not a link component
<Text tag="a" href="/about">About</Text>
<span><a href="/about">About</a></span>

// RIGHT - Link component with proper semantics and theming
<Link href="/about">About</Link>
```

### Don't use Button for navigation items — use NavLink

```tsx
// WRONG - Button is for actions, not navigation
<Button sm noShadow noRing sharp justifyStart tag={Link} href="/settings"
        className="w-full border-l-2">
  Settings
</Button>

// RIGHT - NavLink is purpose-built for navigation
<NavLink href="/settings" tag={Link} active={isCurrentPage}>
  <Settings size={16} /> Settings
</NavLink>
```

### Don't use div wrappers when a VaneUI component exists

```tsx
// WRONG
<div className="flex flex-col gap-4 p-4">
  <div className="flex gap-2 items-center">

// RIGHT
<Stack>
  <Row>
```

### Don't hardcode colors

```tsx
// WRONG
<Button className="bg-green-500 hover:bg-green-600 text-white">

// RIGHT
<Button success filled>
```

### Don't use onClick on Card for navigation

```tsx
// WRONG - div with click handler, not accessible
<Card onClick={() => navigate('/page')}>

// RIGHT - renders as <a>, keyboard accessible
<Card href="/page">
```

### Don't mix className sizing with size props

```tsx
// WRONG - conflicting size systems
<Button lg className="text-sm p-1">

// RIGHT - pick one size
<Button sm>
```

## className Usage

`className` is for things VaneUI props don't cover (width, height, custom positioning, etc.):

```tsx
<Card className="w-full">Full-width card</Card>
<Input className="w-64" placeholder="Fixed width" />
<Container className="min-h-screen">Full-height container</Container>
<Row className="sticky top-0 z-10">Sticky header</Row>
```

User `className` always wins over theme classes via `twMerge`.
