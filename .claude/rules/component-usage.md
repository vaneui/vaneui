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
| Content container with border | `Card` | Renders `<div>`, or `<a>` with `href` |
| Horizontal layout | `Row` | Flexbox row, `itemsCenter` by default |
| Vertical layout | `Stack` | Flexbox column with padding |
| Vertical layout (no padding) | `Col` | Flexbox column, no padding |
| Page-width wrapper | `Container` | Centered, max-width, no padding |
| Semantic page section | `Section` | Flex column with padding, responsive |
| Equal-column grid | `Grid2`-`Grid6` | CSS Grid with N columns |
| Page heading | `PageTitle` | Renders `<h1>` |
| Section heading | `SectionTitle` | Renders `<h2>` |
| Subsection heading | `Title` | Renders `<h3>` |
| Body text | `Text` | Renders `<p>` |
| Hyperlink | `Link` | Renders `<a>`, underline by default |
| Status indicator | `Badge` | Pill-shaped, uppercase, small |
| Tag / filter token | `Chip` | Rounded, monospace, secondary by default |
| Inline code | `Code` | Monospace, rounded, with padding |
| Text input | `Input` | Renders `<input>`, all HTML input attrs |
| Toggle | `Checkbox` | Custom styled, use inside `Label` |
| Input label | `Label` | Flex row with gap |
| Bullet/number list | `List` + `ListItem` | `<ul>` default, `<ol>` with `decimal` |
| Horizontal rule | `Divider` | Thin line separator |
| Image | `Img` | Rounded by default |

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

Note: `Link` defaults to `link` appearance (not `primary`). `Chip` defaults to `secondary` (not `primary`).

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
<Button primary outline semibold rounded padding shadow ring>
<Card padding rounded gap>
<Badge primary pill uppercase>
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
