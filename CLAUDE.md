# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VaneUI is a **React component library** that provides **customizable, ready-to-use UI components** for building modern web applications. Built with TypeScript and styled using Tailwind CSS v4, VaneUI offers a comprehensive set of components that are both easy to use out-of-the-box and highly customizable through a powerful theming system.

### Key Features

- **Ready-to-use Components**: Import and use components immediately with sensible defaults
- **Fully Customizable**: Use the `ThemeProvider` to customize appearance, sizing, spacing, and behavior globally or per section
- **Boolean Props API**: Intuitive prop API using boolean flags (e.g., `<Button primary lg filled>`)
- **TypeScript First**: Full type safety for props, themes, and customization options
- **Tailwind CSS v4**: Modern CSS-in-JS approach using CSS variables for dynamic theming
- **Responsive**: Built-in responsive support with consistent breakpoints
- **Accessible**: Components follow accessibility best practices with proper ARIA attributes

### Available Components

VaneUI provides components organized by their `data-vane-type` attribute which controls spacing behavior:

**UI Components** (`data-vane-type="ui"` - Interactive elements with compact spacing):
- `Button` - Clickable buttons with multiple variants (filled, outline)
- `Badge` - Status indicators and labels
- `Chip` - Compact, removable tags
- `Code` - Inline code snippets with syntax highlighting support
- `Input` - Form input fields
- `Checkbox` - Checkbox inputs with custom styling
- `Label` - Form labels

**Layout Components** (`data-vane-type="layout"` - Structural elements with generous spacing):
- `Card` - Content containers with flex column layout (supports `href` for clickable cards with auto-switch to `<a>` tag)
- `Container` - Page-level content wrapper with max-width
- `Section` - Semantic page sections
- `Stack` - Vertical stacking layout (supports text alignment)
- `Row` - Horizontal layout (supports text alignment)
- `Col` - Column layout (supports text alignment)
- `Grid2`, `Grid3`, `Grid4`, `Grid5`, `Grid6` - CSS Grid layouts (2-6 column variants)
- `Divider` - Visual separators
- `Img` - Image component

**Typography Components** (`data-vane-type="ui"`):
- `Text` - Body text (p tag)
- `Title` - Subsection heading (h3)
- `SectionTitle` - Section heading (h2)
- `PageTitle` - Page heading (h1)
- `Link` - Anchor links with hover effects (supports appearance and variant props like `primary`, `filled`)
- `List` - Unordered/ordered lists (renders ul or ol based on `decimal` prop)
- `ListItem` - List items

## Using VaneUI Components

### Installation

```bash
npm install @vaneui/ui
# or
yarn add @vaneui/ui
```

### CSS Setup

VaneUI supports two CSS setup patterns depending on whether you use Tailwind CSS in your project.

#### Option 1: With Tailwind CSS (Recommended for Tailwind users)

If your project already uses Tailwind CSS v4, let Tailwind generate VaneUI's utility classes alongside your own:

```css
/* globals.css */
@import "tailwindcss";
@import "@vaneui/ui/vars.css";  /* CSS variables for colors, spacing */

@source "@vaneui/ui";           /* Tell Tailwind to scan VaneUI components */
```

**Benefits:**
- Single unified CSS build process
- Tailwind generates only the classes you use
- Can customize Tailwind config (colors, spacing) and VaneUI respects it
- No duplicate utility classes if you use Tailwind elsewhere

#### Option 2: Without Tailwind CSS (Standalone)

If you don't use Tailwind, import VaneUI's pre-built CSS:

```css
/* globals.css or import in your entry file */
@import "@vaneui/ui/css";       /* Pre-built utility classes (~60KB) */
@import "@vaneui/ui/vars.css";  /* CSS variables for colors, spacing (~7KB) */
```

Or in JavaScript/TypeScript:

```tsx
import '@vaneui/ui/css';
import '@vaneui/ui/vars.css';
```

**Benefits:**
- Works in any project (React, Vue, plain HTML)
- No build tools required
- Ready to use out of the box

### Basic Usage

Import and use components with their default styling:

```tsx
import { Button, Card, Text, Stack } from '@vaneui/ui';

function App() {
  return (
    <Stack>
      <Card>
        <Text>Welcome to VaneUI!</Text>
        <Button>Get Started</Button>
      </Card>
    </Stack>
  );
}
```

### Component Props

All components support a consistent prop API:

**Size Props**: `xs`, `sm`, `md` (default), `lg`, `xl`
```tsx
<Button xs>Extra Small</Button>
<Button sm>Small</Button>
<Button>Medium (default)</Button>
<Button lg>Large</Button>
<Button xl>Extra Large</Button>
```

**Appearance Props**: `primary`, `brand`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`, `link`
```tsx
<Button primary>Primary</Button>
<Button brand>Brand</Button>
<Button secondary>Secondary</Button>
<Button success>Success</Button>
<Button danger>Danger</Button>
```

**Variant Props**: `filled`, `outline` (default)
```tsx
<Button filled>Filled</Button>
<Button>Outline (default)</Button>
```

**Shape Props**: `rounded` (default), `pill`, `sharp`
```tsx
<Button>Rounded (default)</Button>
<Button pill>Pill</Button>
<Button sharp>Sharp</Button>
```

**Typography Props**: `sans`, `serif`, `mono`, font weights, text alignment, etc.
```tsx
<Text mono semibold>Monospace bold text</Text>
<Title primary textCenter>Centered primary heading</Title>
```

**Text Alignment Props** (Typography and Layout components): `textLeft`, `textCenter`, `textRight`, `textJustify`
```tsx
<Stack textCenter>Centered content in stack</Stack>
<Row textRight>Right-aligned content in row</Row>
<Col textLeft>Left-aligned content in column</Col>
```

**Breakpoint Props** (Layout components): `mobileCol`, `tabletCol`, `desktopCol`
```tsx
<Row tabletCol>Content switches to column on tablets and below</Row>
<Stack desktopCol>Stacks vertically on desktops and below</Stack>
```

**Hide Props**: `mobileHide`, `tabletHide`, `desktopHide`
```tsx
<Button mobileHide>Hidden on mobile</Button>
<Text tabletHide>Hidden on tablet and below</Text>
```

**Modifier Props**: `transparent`, `responsive`, `reverse`
```tsx
<Card transparent>Card without background color</Card>
<PageTitle responsive>Title that scales down on smaller screens</PageTitle>
<Row reverse>Row with reversed item order</Row>
```

### Responsive Design

VaneUI provides built-in responsive support through two mechanisms:

#### 1. Responsive Breakpoints

The library defines three breakpoints:
- **Mobile**: `48rem` (768px)
- **Tablet**: `64rem` (1024px)
- **Desktop**: `80rem` (1280px)

Layout components (`Row`, `Stack`, `Card`, `Section`) support breakpoint props for responsive layout changes:

```tsx
// Default: horizontal row layout
// Tablet and below: switches to vertical column
<Row tabletCol>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Row>

// Stack that becomes vertical on mobile
<Stack mobileCol>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Stack>
```

**Available breakpoint props:**
- `mobileCol` - Switches to column layout on mobile devices and below (`max-mobile: 48rem`)
- `tabletCol` - Switches to column layout on tablet devices and below (`max-tablet: 64rem`)
- `desktopCol` - Switches to column layout on desktop devices and below (`max-desktop: 80rem`)

#### 2. Automatic Responsive Typography

Typography components automatically scale down on smaller screens without requiring any props:

```tsx
// Automatically scales: 30 units on desktop → 27 on tablet → 24 on mobile
<PageTitle lg>My Page</PageTitle>

// Title scales: 15 units on desktop → 14 on tablet → 13 on mobile
<Title lg>Section</Title>
```

**Responsive scaling behavior:**
- `PageTitle` - Large scaling range for hero headings (e.g., 30 → 27 → 24 units across desktop/tablet/mobile)
- `SectionTitle` - Medium scaling for section headings (e.g., 24 → 22 → 20 units)
- `Title` - Subtle scaling for smaller headings (e.g., 15 → 14 → 13 units)
- `Text` - Fixed size by default (no automatic scaling)
- `Section` - Responsive padding and gap (scales down on smaller screens)

This ensures optimal readability across all device sizes without manual intervention.

### Customizing Components with ThemeProvider

The `ThemeProvider` component allows you to customize components globally or within specific sections of your application.

#### Setting Default Props

Change default props for all components within the provider:

```tsx
import { ThemeProvider, Button } from '@vaneui/ui';

function App() {
  return (
    <ThemeProvider
      themeDefaults={{
        button: { lg: true, primary: true, filled: true },
        text: { lg: true },
        card: { primary: true }
      }}
    >
      {/* All buttons are now large, primary, and filled by default */}
      <Button>Submit</Button>  {/* lg + primary + filled */}
      <Button secondary>Cancel</Button>  {/* lg + secondary + filled */}
    </ThemeProvider>
  );
}
```

#### Adding Extra Classes

Add custom Tailwind classes to specific components:

```tsx
<ThemeProvider
  extraClasses={{
    button: {
      primary: 'hover:scale-105 transition-transform',
      secondary: 'opacity-80'
    },
    card: {
      primary: 'shadow-2xl'
    }
  }}
>
  <Button primary>Hover me!</Button>  {/* Gets extra hover scale effect */}
</ThemeProvider>
```

#### Nested Theme Providers

Theme providers can be nested, with child providers merging with parent settings:

```tsx
<ThemeProvider themeDefaults={{ button: { lg: true } }}>
  {/* All buttons are large */}
  <Button>Large Button</Button>

  <ThemeProvider themeDefaults={{ button: { primary: true } }}>
    {/* Buttons inherit 'lg' and add 'primary' */}
    <Button>Large Primary Button</Button>

    {/* Can still override with props */}
    <Button secondary sm>Small Secondary Button</Button>
  </ThemeProvider>
</ThemeProvider>
```

#### Advanced Theme Customization

Use `themeOverride` for programmatic theme modifications:

```tsx
<ThemeProvider
  themeOverride={(theme) => {
    // Modify button base classes
    theme.button.base += ' uppercase tracking-wide';

    // Change button default props
    theme.button.defaults = { ...theme.button.defaults, semibold: true };

    return theme;
  }}
>
  <Button>All buttons get uppercase + semibold</Button>
</ThemeProvider>
```

#### Replace Strategy

Use `mergeStrategy="replace"` to completely replace parent theme instead of merging:

```tsx
<ThemeProvider themeDefaults={{ button: { lg: true, primary: true } }}>
  <Button>Large Primary</Button>

  <ThemeProvider
    themeDefaults={{ button: { sm: true, secondary: true } }}
    mergeStrategy="replace"
  >
    {/* Does NOT inherit lg/primary from parent */}
    <Button>Small Secondary Only</Button>
  </ThemeProvider>
</ThemeProvider>
```

### Common Customization Patterns

#### Brand-specific Theme

```tsx
function App() {
  return (
    <ThemeProvider
      themeDefaults={{
        button: { primary: true, lg: true, semibold: true },
        title: { primary: true, semibold: true },
        sectionTitle: { primary: true, bold: true },
        card: { primary: true, outline: true }
      }}
      extraClasses={{
        button: {
          primary: 'shadow-lg hover:shadow-xl transition-shadow'
        }
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

#### Section-specific Styling

```tsx
function LandingPage() {
  return (
    <div>
      {/* Hero section with large, bold elements */}
      <ThemeProvider themeDefaults={{
        button: { xl: true, filled: true },
        title: { xl: true }
      }}>
        <Hero />
      </ThemeProvider>

      {/* Content section with smaller, subtle elements */}
      <ThemeProvider themeDefaults={{
        button: { md: true, outline: true },
        text: { sm: true }
      }}>
        <Content />
      </ThemeProvider>

      {/* Footer with compact elements */}
      <ThemeProvider themeDefaults={{
        button: { xs: true },
        text: { xs: true }
      }}>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
```

#### Dark Mode Support

```tsx
function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <ThemeProvider
        themeOverride={(theme) => {
          if (darkMode) {
            // Customize appearance for dark mode
            theme.card.base += ' bg-gray-800 text-white';
            theme.button.base += ' border-gray-600';
          }
          return theme;
        }}
      >
        <YourApp />
      </ThemeProvider>
    </div>
  );
}
```

### Component Flexibility

#### Custom HTML Tags

Most components support the `tag` prop to render as different HTML elements:

```tsx
<Button tag="a" href="/about">Link as Button</Button>
<Text tag="span">Text as span</Text>
<Card tag="article">Card as article</Card>
```

#### Card as Link (Auto Tag Switching)

The `Card` component automatically switches to an `<a>` tag when `href` is provided, ensuring valid HTML:

```tsx
// Automatically renders as <a> tag with all card styling
<Card href="/products" primary filled>
  <Title>Product Card</Title>
  <Text>Click to view products</Text>
</Card>

// External link with target and rel attributes
<Card href="https://github.com" target="_blank" rel="noopener noreferrer">
  <Title>GitHub</Title>
  <Text>Opens in new tab</Text>
</Card>
```

This pattern ensures semantic HTML (no `<div>` with `href`) while maintaining all card styling and behavior.

#### Custom Classes

All components accept a `className` prop that merges with theme classes:

```tsx
<Button className="custom-class">
  Custom styled button
</Button>
```

User-provided `className` takes precedence over theme classes for the same properties (via `twMerge`).

#### Ref Forwarding

All components support ref forwarding for direct DOM access:

```tsx
const buttonRef = useRef<HTMLButtonElement>(null);

<Button ref={buttonRef} onClick={() => buttonRef.current?.focus()}>
  Click me
</Button>
```

---

## Best Practices

### Choosing the Right Layout Component

**Stack vs Col vs Row:**
- Use `Stack` for vertical layouts that need responsive breakpoints (`mobileCol`, `tabletCol`)
- Use `Col` for simple vertical layouts without responsive switching
- Use `Row` for horizontal layouts (supports responsive breakpoints)

```tsx
// Good: Stack for responsive hero section
<Stack row tabletCol>
  <Img src="/hero.jpg" />
  <Col>
    <Title>Welcome</Title>
    <Text>Description</Text>
  </Col>
</Stack>

// Good: Col for simple vertical grouping
<Col>
  <Title>Form</Title>
  <Input placeholder="Name" />
  <Input placeholder="Email" />
</Col>
```

**Card vs Section vs Container:**
- Use `Card` for distinct content blocks with visual boundaries (padding, borders, shadows)
- Use `Section` for semantic page sections (full-width, responsive padding)
- Use `Container` for constraining content width within sections

```tsx
// Good: Section with Container for page structure
<Section>
  <Container>
    <PageTitle>About Us</PageTitle>
    <Row>
      <Card>Feature 1</Card>
      <Card>Feature 2</Card>
    </Row>
  </Container>
</Section>
```

**Typography hierarchy:**
- Use `PageTitle` for the main page heading (h1) - one per page
- Use `SectionTitle` for major sections (h2)
- Use `Title` for subsections and card headings (h3)
- Use `Text` for body content (p)

### Props and Styling

**Don't specify props that are already true by default:**

VaneUI components have sensible defaults. Specifying props that are already `true` by default is redundant and adds noise to your code.

Key defaults to know:
- **Layout components** (`Row`, `Col`, `Stack`, `Card`, `Section`, `Container`, `Grid*`): `gap: true`, `md: true`, `outline: true`
- **Row**: `itemsCenter: true`
- **Stack/Card**: `padding: true`, `rounded: true` (Card only)
- **Button**: `primary: true`, `outline: true`, `semibold: true`, `rounded: true`
- **Input**: `primary: true`, `outline: true`, `rounded: true`
- **Badge**: `primary: true`, `outline: true`, `pill: true`
- **Chip**: `secondary: true` (not primary!), `outline: true`, `rounded: true`
- **Link**: `link: true` (not primary!), `outline: true`, `underline: true`
- **Typography** (`Text`, `Title`, etc.): `md: true`, `primary: true`, `outline: true`

```tsx
// Good: Clean, relies on defaults
<Row>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Row>

// Avoid: Redundant gap prop (gap is true by default)
<Row gap>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Row>

// Good: Only specify what differs from defaults
<Stack noPadding>
  <Text>No padding needed here</Text>
</Stack>

// Avoid: Specifying defaults
<Stack gap padding md>
  <Text>These props are already true</Text>
</Stack>
```

**Use ThemeProvider for consistency, inline props for exceptions:**
```tsx
// Good: ThemeProvider for site-wide defaults
<ThemeProvider themeDefaults={{ button: { filled: true } }}>
  <Button>Primary Action</Button>
  <Button secondary outline>Secondary Action</Button>  {/* Override for this button */}
</ThemeProvider>

// Avoid: Repeating the same props everywhere
<Button filled>Action 1</Button>
<Button filled>Action 2</Button>
<Button filled>Action 3</Button>
```

**Combine appearance with variant for visual hierarchy:**
```tsx
// Primary actions: filled
<Button primary filled>Submit</Button>
<Button success filled>Confirm</Button>

// Secondary actions: outline
<Button secondary outline>Cancel</Button>
<Button primary outline>Learn More</Button>

// Destructive actions: danger
<Button danger filled>Delete</Button>
<Button danger outline>Remove</Button>
```

**Use consistent sizing within contexts:**
```tsx
// Good: Consistent sizing in a form
<Col>
  <Input lg placeholder="Name" />
  <Input lg placeholder="Email" />
  <Button lg filled>Submit</Button>
</Col>

// Avoid: Mixed sizes without purpose
<Col>
  <Input sm placeholder="Name" />
  <Input lg placeholder="Email" />
  <Button xl>Submit</Button>
</Col>
```

**Prefer VaneUI props over Tailwind classes:**

VaneUI provides boolean props for most common styling needs. Use these instead of Tailwind classes to ensure consistent theming and proper integration with the size system.

| Instead of Tailwind | Use VaneUI prop |
|---------------------|-----------------|
| `className="uppercase"` | `uppercase` |
| `className="lowercase"` | `lowercase` |
| `className="capitalize"` | `capitalize` |
| `className="font-bold"` | `bold` |
| `className="font-semibold"` | `semibold` |
| `className="font-mono"` | `mono` |
| `className="italic"` | `italic` |
| `className="underline"` | `underline` |
| `className="line-through"` | `lineThrough` |
| `className="text-center"` | `textCenter` |
| `className="text-left"` | `textLeft` |
| `className="text-right"` | `textRight` |
| `className="sticky"` | `sticky` |
| `className="relative"` | `relative` |
| `className="absolute"` | `absolute` |
| `className="fixed"` | `fixed` |
| `className="flex"` | `flex` |
| `className="inline-flex"` | `inlineFlex` |
| `className="items-center"` | `itemsCenter` |
| `className="justify-between"` | `justifyBetween` |
| `className="flex-wrap"` | `flexWrap` |
| `className="border-b"` | `borderB` |
| `className="border-t"` | `borderT` |
| `className="rounded-full"` | `pill` |
| `className="rounded-none"` | `sharp` |
| `className="shadow"` | `shadow` |
| `className="overflow-hidden"` | `overflowHidden` |
| `className="overflow-auto"` | `overflowAuto` |

```tsx
// Good: Using VaneUI props
<Text uppercase semibold>IMPORTANT</Text>
<Badge sticky>Pinned</Badge>
<Card borderB>Card with bottom border</Card>
<Row itemsCenter justifyBetween>Content</Row>

// Avoid: Tailwind classes that duplicate props
<Text className="uppercase font-semibold tracking-wider">IMPORTANT</Text>
<Badge className="sticky top-0">Pinned</Badge>
<Card className="border-b">Card with bottom border</Card>
<Row className="items-center justify-between">Content</Row>
```

**Don't override gap with Tailwind classes:**

Gap is controlled by the size prop system (`xs`, `sm`, `md`, `lg`, `xl`). Don't use Tailwind gap classes.

```tsx
// Good: Size prop controls gap
<Row lg>Large gap between items</Row>
<Stack sm>Small gap between items</Stack>

// Avoid: Tailwind gap classes
<Row className="gap-10">Don't do this</Row>
<Stack className="gap-4">Don't do this either</Stack>
```

**Don't override backgrounds with Tailwind when appearance works:**

Background colors are controlled by appearance + variant props. Only use `bg-*` classes for edge cases not covered by the theme.

```tsx
// Good: Appearance controls color
<Card primary filled>Primary background via theme</Card>
<Button success filled>Success background via theme</Button>
<Section danger filled>Danger section via theme</Section>

// Avoid: Tailwind bg classes when appearance would work
<Card className="bg-blue-500">Don't fight the theme</Card>
<Button className="bg-green-500">Use success instead</Button>

// OK: Tailwind for colors not in the theme
<div className="bg-gradient-to-r from-purple-500 to-pink-500">
  Custom gradient (not available as appearance)
</div>
```

**Letter spacing (tracking) is built into typography:**

Typography components have appropriate letter spacing built in. Don't add `tracking-*` classes.

```tsx
// Good: Built-in tracking
<Badge uppercase>STATUS</Badge>  // Badge has tracking built-in
<Title>Heading</Title>           // Title has appropriate tracking

// Avoid: Manual tracking
<Badge uppercase className="tracking-wider">STATUS</Badge>
<Title className="tracking-tight">Heading</Title>
```

### Responsive Design

VaneUI uses a **desktop-first** approach. Components default to their desktop layout, and breakpoint props adapt them for smaller screens.

**Understanding the breakpoint props:**
- `mobileCol` - Switch to column at mobile and below (≤768px)
- `tabletCol` - Switch to column at tablet and below (≤1024px)
- `desktopCol` - Switch to column at desktop and below (≤1280px)

```tsx
// Default: horizontal row on all screens
<Row>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Row>

// Desktop: horizontal, Tablet and below: vertical
<Row tabletCol>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Row>

// Desktop/Tablet: horizontal, Mobile only: vertical
<Row mobileCol>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Row>
```

**Design for desktop first, then adapt for smaller screens:**
```tsx
// Start with your desktop layout
<Card row>
  <Img src="/product.jpg" />
  <Col>
    <Title>Product Name</Title>
    <Text>Product description.</Text>
    <Button>Buy Now</Button>
  </Col>
</Card>

// Add tabletCol to stack on smaller screens
<Card row tabletCol>
  <Img src="/product.jpg" />
  <Col>
    <Title>Product Name</Title>
    <Text>Product description.</Text>
    <Button>Buy Now</Button>
  </Col>
</Card>
```

**Use hide props to remove content on smaller screens:**
```tsx
// Hide secondary content on mobile
<Row tabletCol>
  <Card>Primary content - always visible</Card>
  <Card mobileHide>Secondary content - hidden on mobile</Card>
</Row>

// Hide decorative elements on smaller screens
<Row>
  <Img src="/hero.jpg" tabletHide />
  <Col>
    <Title>Welcome</Title>
    <Text>Content that works on all screens</Text>
  </Col>
</Row>
```

**Typography scales automatically:**
```tsx
// PageTitle, SectionTitle, and Title automatically scale down on smaller screens
// No props needed - this is built-in behavior
<PageTitle lg>Large on desktop, smaller on mobile</PageTitle>
<SectionTitle>Scales automatically</SectionTitle>

// Use 'responsive' prop on Text if you want it to scale too
<Text lg responsive>This text also scales down</Text>
```

**Choose the right breakpoint:**
```tsx
// Two-column layout that needs space - use tabletCol
<Row tabletCol>
  <Card className="flex-1">Needs horizontal space</Card>
  <Card className="flex-1">Also needs space</Card>
</Row>

// Compact items that fit on tablet - use mobileCol
<Row mobileCol>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Row>
```

### Accessibility

**Use semantic components:**
```tsx
// Good: Semantic HTML
<nav>
  <Row>
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
  </Row>
</nav>

<main>
  <PageTitle>Page Title</PageTitle>
  <Section>
    <SectionTitle>Section</SectionTitle>
    <Text>Content...</Text>
  </Section>
</main>
```

**Ensure sufficient color contrast:**
```tsx
// Good: Filled variants have high contrast
<Button primary filled>High contrast</Button>
<Badge success filled>Status</Badge>

// Be careful: Outline/default variants on colored backgrounds
<Card primary filled>
  <Text primary filled>Use filled text on filled backgrounds</Text>
</Card>
```

**Use Card href for clickable cards (not onClick on div):**
```tsx
// Good: Semantic link
<Card href="/product/123" primary>
  <Title>Product</Title>
  <Text>Click to view</Text>
</Card>

// Avoid: Non-semantic click handler
<Card onClick={() => navigate('/product/123')}>
  <Title>Product</Title>
</Card>
```

### Performance

**Minimize ThemeProvider nesting:**
```tsx
// Good: Single provider with comprehensive defaults
<ThemeProvider themeDefaults={{
  button: { primary: true },
  card: { outline: true },
  title: { semibold: true }
}}>
  <App />
</ThemeProvider>

// Avoid: Deeply nested providers for small changes
<ThemeProvider themeDefaults={{ button: { primary: true } }}>
  <ThemeProvider themeDefaults={{ card: { outline: true } }}>
    <ThemeProvider themeDefaults={{ title: { semibold: true } }}>
      <App />
    </ThemeProvider>
  </ThemeProvider>
</ThemeProvider>
```

**Use Tailwind CSS setup when possible:**
```css
/* Recommended: Let Tailwind tree-shake unused styles */
@import "tailwindcss";
@import "@vaneui/ui/vars.css";
@source "@vaneui/ui";
```

### Common Patterns

**Navigation with active states:**
```tsx
<Row>
  <Link href="/" primary={isActive('/')}>Home</Link>
  <Link href="/about" primary={isActive('/about')}>About</Link>
  <Link href="/contact" primary={isActive('/contact')}>Contact</Link>
</Row>
```

**Form with validation states:**
```tsx
<Col>
  <Label>Email</Label>
  <Input
    placeholder="email@example.com"
    danger={hasError}
    success={isValid}
  />
  {hasError && <Text danger sm>Please enter a valid email</Text>}
</Col>
```

**Card grid with consistent spacing:**
```tsx
<Row flexWrap>
  {items.map(item => (
    <Card key={item.id} href={`/item/${item.id}`} outline className="flex-1 min-w-64">
      <Title>{item.name}</Title>
      <Text secondary>{item.description}</Text>
    </Card>
  ))}
</Row>
```

**Hero section pattern:**
```tsx
<Section primary filled>
  <Container>
    <Stack textCenter>
      <PageTitle xl primary filled>Welcome to Our App</PageTitle>
      <Text lg primary filled>Build something amazing today</Text>
      <Row justifyCenter>
        <Button xl filled>Get Started</Button>
        <Button xl outline>Learn More</Button>
      </Row>
    </Stack>
  </Container>
</Section>
```

### Anti-patterns to Avoid

**Don't use layout components for single elements:**
```tsx
// Avoid: Unnecessary wrapper
<Stack>
  <Text>Just one element</Text>
</Stack>

// Good: Direct usage
<Text>Just one element</Text>
```

**Don't mix conflicting props:**
```tsx
// Avoid: Conflicting sizes
<Button xs xl>Confusing</Button>

// Avoid: Multiple appearances
<Button primary secondary>Pick one</Button>
```

**Don't override theme with className for themed properties:**
```tsx
// Avoid: Fighting the theme system
<Button primary className="bg-red-500">Confusing</Button>

// Good: Use the right appearance
<Button danger>Clear intent</Button>
```

---

## Contributing

For information on developing VaneUI itself (architecture, theme system internals, creating new components), see [CONTRIBUTING.md](./CONTRIBUTING.md).
