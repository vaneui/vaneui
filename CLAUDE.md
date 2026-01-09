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
- `Card` - Content containers with flex column layout
- `Container` - Page-level content wrapper with max-width
- `Section` - Semantic page sections
- `Stack` - Vertical stacking layout
- `Row` - Horizontal layout
- `Col` - Column layout
- `Grid2`, `Grid3`, `Grid4`, `Grid5`, `Grid6` - CSS Grid layouts (2-6 column variants)
- `Divider` - Visual separators
- `Img` - Image component

**Typography Components** (`data-vane-type="ui"`):
- `Text` - Body text (p tag)
- `Title` - Subsection heading (h3)
- `SectionTitle` - Section heading (h2)
- `PageTitle` - Page heading (h1)
- `Link` - Anchor links with hover effects
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
    <Stack gap>
      <Card>
        <Text>Welcome to VaneUI!</Text>
        <Button primary>Get Started</Button>
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

**Variant Props**: `filled`, `outline`
```tsx
<Button filled>Filled</Button>
<Button outline>Outline</Button>

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

**Breakpoint Props** (Layout components): `mobileCol`, `tabletCol`, `desktopCol`
```tsx
<Row tabletCol>Content switches to column on tablets and below</Row>
<Stack desktopCol gap>Stacks vertically on desktops and below</Stack>
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

// Stack with gap that becomes vertical on mobile
<Stack mobileCol gap>
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
        button: { xs: true,  },
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

## Library Development Guide

**Note**: The sections below are for developers working on the VaneUI library itself, not for end-users consuming the library. End-users should refer to the "Using VaneUI Components" section above.

### Common Commands

#### Build Commands
- `npm run build` - Full build process (includes TypeScript compilation, CSS generation, and cleanup)
- `npm run build:js` - TypeScript compilation and bundling only
- `npm run build:css:ui` - Generate main UI CSS file using Tailwind CLI v4
- `npm run build:css:vars` - Generate CSS variables file using Tailwind CLI v4
- `npm run clean` - Clean the dist directory

#### Development Commands
- `npm run type-check` - Run TypeScript type checking without emitting files
- `npm test` - Run Jest tests (includes TypeScript type checking)
- `npm run playground` - Start development playground with CSS hot reloading

#### Component Development
- All components use the `ComponentTheme` pattern for consistent theming
- Components are exported from `src/index.ts` for public API
- CSS is built using Tailwind CLI v4 and exported separately as `vars.css` and `ui.css`

### Architecture

#### Core Theme System
The library uses a sophisticated theme system centered around `ComponentTheme<P, T>` class:
- **ThemeProvider**: Context provider for global theme configuration (supports nesting, defaults, and extra classes)
- **ComponentTheme**: Base class that handles prop-to-class mapping and component configuration
- **ThemedComponent**: Generic component wrapper that applies themes
- **BaseTheme**: Foundation for all theme implementations (each theme extends this)

#### Component Structure
```
src/
├── components/
│   ├── ui/                      # Basic UI components (Button, Card, Code, Text, etc.)
│   │   ├── props/               # Component prop type definitions
│   │   ├── theme/               # Theme implementations for each component
│   │   │   ├── appearance/      # Color and visual appearance themes
│   │   │   ├── size/            # Size-related themes (font, padding, gap, line height)
│   │   │   ├── layout/          # Layout themes (radius, border, ring, etc.)
│   │   │   ├── typography/      # Typography themes (font family, weight, alignment)
│   │   │   ├── list/            # List-specific themes
│   │   │   └── common/          # Shared theme utilities and base classes
│   │   └── classes/             # Pre-defined class mappings for appearances
│   ├── complex/                 # Composite components (DataTable, etc.)
│   ├── css/                     # CSS files
│   │   ├── vars.css             # CSS variable definitions (@theme block)
│   │   └── index.css            # Main component styles
│   ├── utils/                   # Utility functions (componentUtils, deepMerge)
│   ├── themeContext.tsx         # Theme provider and context
│   └── themedComponent.tsx      # Generic themed component wrapper
├── tests/                       # Component tests
└── index.ts                     # Main export file
```

### CSS Variable Architecture

VaneUI uses a **three-tier CSS variable system** that integrates with Tailwind CSS v4:

#### Tier 1: Unit Variables (Set by Theme Classes)
Theme classes use Tailwind's arbitrary value syntax to set CSS variable values:

```typescript
// Example from FontSizeTheme (src/components/ui/theme/size/fontSizeTheme.ts)
xs: string = "[--fs-unit:6]"   // Sets --fs-unit to 6
md: string = "[--fs-unit:8]"   // Sets --fs-unit to 8 (default)
lg: string = "[--fs-unit:9]"   // Sets --fs-unit to 9

// Example from PyTheme (src/components/ui/theme/size/pyTheme.ts)
xs: "[--py-unit:1]"    // Sets --py-unit to 1
md: "[--py-unit:2]"    // Sets --py-unit to 2

// Example from PxTheme with aspect ratio (src/components/ui/theme/size/pxTheme.ts)
xs: "[--aspect-ratio:2]"   // Sets --aspect-ratio to 2 (px is 2x py)

// Example with responsive breakpoint modifiers
xs: "[--fs-unit:15] max-tablet:[--fs-unit:12] max-mobile:[--fs-unit:9]"
// Sets different values at different breakpoints: 15 on desktop, 12 on tablet, 9 on mobile
```

**Pattern:** Theme classes return arrays with both the setter and consumer:
```typescript
getClasses(extractedKeys: CategoryProps): string[] {
  const fsUnitClass = this[extractedKeys.size];
  return [fsUnitClass, "text-(length:--fs)"];  // ["[--fs-unit:8]", "text-(length:--fs)"]
}
```

#### Tier 2: Computed Variables (Defined in vars.css)
Computed variables are calculated from unit variables in `@layer base`:

```css
/* From src/components/css/vars.css */
@theme {
  --fs-base: calc(var(--spacing) * 0.5);  /* 0.5rem when spacing is 1rem */

  /* Responsive breakpoints for custom Tailwind modifiers */
  --breakpoint-mobile: 48rem;   /* 768px */
  --breakpoint-tablet: 64rem;   /* 1024px */
  --breakpoint-desktop: 80rem;  /* 1280px */
}

@layer base {
  :where(*) {
    /* Font size: unit * base */
    --fs: calc(var(--fs-unit) * var(--fs-base));

    /* Padding Y: unit * spacing */
    --py: calc(var(--py-unit) * var(--spacing));

    /* Padding X: aspect-ratio * py-unit * spacing */
    --px: calc(var(--aspect-ratio) * var(--py-unit) * var(--spacing));

    /* Gap: gap-unit * spacing */
    --gap: calc(var(--gap-unit) * var(--spacing));

    /* Size: size-unit * spacing (for checkboxes, etc.) */
    --size: calc(var(--size-unit) * var(--spacing));

    /* Border radius: br-unit * base */
    --br: calc(var(--br-unit) * var(--br-base));
  }
}
```

#### Tier 3: Semantic Variables (Pre-defined Tokens)
Color variables and breakpoints are mapped to semantic names in the `@theme` block:

```css
/* From src/components/css/vars.css */
@theme {
  /* Text Colors */
  --color-text-default: var(--color-gray-900);
  --color-text-primary: var(--color-blue-600);
  --color-text-secondary: var(--color-gray-600);
  --color-text-success: var(--color-emerald-600);
  --color-text-danger: var(--color-red-600);

  /* Background Colors */
  --color-bg-default: var(--color-white);
  --color-bg-primary: var(--color-blue-50);
  --color-bg-filled-primary: var(--color-blue-600);
  --color-bg-hover-primary: var(--color-blue-100);

  /* Border Colors */
  --color-border-default: var(--color-gray-300);
  --color-border-primary: var(--color-blue-500);
  --color-border-filled-primary: var(--color-blue-700);
}
```

#### Tailwind Classes Consume Variables

Theme classes and appearance classes use Tailwind's arbitrary value syntax to consume CSS variables:

```typescript
// Size themes return both setter and consumer
["[--fs-unit:8]", "text-(length:--fs)"]           // Font size
["[--py-unit:2]", "py-(--py)"]                     // Padding Y
["[--aspect-ratio:2]", "px-(--px)"]                // Padding X (with aspect ratio)
["[--br-unit:4]", "rounded-(--br)"]                // Border radius
["[--lh:1.6]", "leading-(--lh)"]                   // Line height
["[--gap-unit:2]", "gap-(--gap)"]                  // Gap
["[--size-unit:4]", "size-(--size)"]               // Size (for checkboxes)

// Appearance classes consume pre-defined color variables
"bg-(--color-bg-filled-primary)"                   // Background color
"text-(--color-text-primary)"                      // Text color
"border-(--color-border-default)"                  // Border color
"ring-(--color-border-primary)"                    // Ring color
```

#### Unified CSS Variables

All components use the same CSS variable names. The computed values are controlled by unit variables:
- `--py` - Padding Y, computed from `--py-unit * --spacing`
- `--px` - Padding X, computed from `--aspect-ratio * --py-unit * --spacing`
- `--gap` - Gap, computed from `--gap-unit * --spacing`
- `--fs` - Font size, computed from `--fs-unit * --fs-base`
- `--br` - Border radius, computed from `--br-unit * --br-base`
- `--size` - Size (for checkboxes), computed from `--size-unit * --spacing`
- `--lh` - Line height (set directly, e.g., `[--lh:1.6]`)
- `--bw` - Border width (default: 1px)
- `--rw` - Ring width (default: 1px)

#### Data Attributes

Components emit data attributes used for CSS-driven styling:
- `data-vane-type` - Component type (`"ui"` or `"layout"`) - controls spacing scales
- `data-size` - Current size (`"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`)
- `data-appearance` - Current appearance (`"primary"`, `"secondary"`, etc.)
- `data-variant` - Current variant (`"filled"` or `"outline"`)

These attributes are used by CSS rules in `vars.css` to set appearance-specific color variables and component-type-specific spacing.

**UI vs Layout spacing:**
- UI components (`data-vane-type="ui"`) use compact spacing for interactive elements
- Layout components (`data-vane-type="layout"`) use generous spacing for structural elements

#### Complete Example: Button Component

```typescript
// User code
<Button primary md filled>Click me</Button>

// ComponentTheme.getClasses() collects classes from theme tree:
// From FontSizeTheme:
["[--fs-unit:8]", "text-(length:--fs)"]

// From PyTheme:
["[--py-unit:2]", "py-(--py)"]

// From PxTheme (with aspect ratio):
["[--aspect-ratio:2]", "px-(--px)"]

// From LineHeightTheme:
["[--lh:1.3]", "leading-(--lh)"]

// From RadiusTheme:
["[--br-unit:4]", "rounded-(--br)"]

// From GenericVariantTheme (appearance):
["bg-(--color-bg-filled-primary)"]
["text-(--color-text-filled-primary)"]
["ring-(--color-border-filled-primary)"]

// Final merged classes:
"[--fs-unit:8] text-(length:--fs) [--py-unit:2] py-(--py) [--aspect-ratio:2] px-(--px) [--lh:1.3] leading-(--lh) [--br-unit:4] rounded-(--br) bg-(--color-bg-filled-primary) text-(--color-text-filled-primary) ring-(--color-border-filled-primary)"

// CSS execution:
// 1. [--fs-unit:8] sets --fs-unit=8
// 2. --fs = calc(8 * 0.0625rem) = 0.5rem (computed in @layer base)
// 3. text-(length:--fs) applies font-size: var(--fs) = 0.5rem

// 4. [--py-unit:2] sets --py-unit=2
// 5. --py = calc(2 * 0.5rem) = 1rem
// 6. py-(--py) applies padding-top/bottom: 1rem

// 7. [--aspect-ratio:2] sets --aspect-ratio=2
// 8. --px = calc(2 * 2 * 0.5rem) = 2rem
// 9. px-(--px) applies padding-left/right: 2rem

// 10. bg-(--color-bg-filled-primary) applies background: var(--color-blue-600)
```

### Theme System Details

#### ComponentTheme Class
Located in `src/components/ui/theme/common/ComponentTheme.tsx`:

```typescript
export class ComponentTheme<P extends ComponentProps, TTheme extends object> {
  readonly tag: React.ElementType;              // Default HTML tag
  readonly base: string;                         // Base classes always applied
  readonly themes: TTheme;                       // Theme tree structure
  readonly vaneType?: VaneComponentType;         // 'ui' | 'layout' - sets data-vane-type attribute
  defaults: Partial<P>;                          // Default prop values
  extraClasses: Partial<Record<keyof P, string>>; // Additional classes
  private readonly categories: readonly ComponentCategoryKey[];
  private readonly tagFunction?: (props: P) => React.ElementType;

  getClasses(props: P): string[] {
    // 1. Extract which props are set (size, appearance, variant, etc.)
    const extractedKeys = pickFirstTruthyKeyByCategory(props, defaults, categories);

    // 2. Walk theme tree and collect classes from each BaseTheme
    // 3. Each BaseTheme.getClasses() returns CSS variable setting classes
    // 4. Return array of all classes
  }

  getComponentConfig(props: P): { className: string; tag: ElementType; attrs: Record<string, string> } {
    // Returns final className, resolved tag, and data attributes
    // Attributes include: data-vane-type, data-size, data-appearance, data-variant
  }
}
```

#### BaseTheme Classes
All theme classes extend `BaseTheme` and implement `getClasses(extractedKeys)`:

```typescript
// Example: FontSizeTheme (src/components/ui/theme/size/fontSizeTheme.ts)
export class FontSizeTheme extends BaseTheme implements Record<SizeKey, string> {
  xs: string = "[--fs-unit:6]";
  sm: string = "[--fs-unit:7]";
  md: string = "[--fs-unit:8]";
  lg: string = "[--fs-unit:9]";
  xl: string = "[--fs-unit:10]";

  getClasses(extractedKeys: CategoryProps): string[] {
    const size = extractedKeys?.size ?? 'md';
    const fsUnitClass = this[size];
    return [fsUnitClass, "text-(length:--fs)"];
  }
}

// Example: PyTheme (src/components/ui/theme/size/pyTheme.ts)
export class PyTheme extends PaddingTheme {
  getClasses(extractedKeys: CategoryProps): string[] {
    const paddingClass = this[extractedKeys?.size ?? 'md'];
    return [paddingClass, "py-(--py)"];
  }

  static createForUI(): PyTheme {
    return new PyTheme({
      xs: "[--py-unit:1]",
      sm: "[--py-unit:1.5]",
      md: "[--py-unit:2]",
      lg: "[--py-unit:2.5]",
      xl: "[--py-unit:3]",
    });
  }
}
```

#### Theme Provider System
Located in `src/components/themeContext.tsx`:

```typescript
export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: PartialTheme;              // Override specific component themes
  themeDefaults?: ThemeDefaults;      // Change default prop values
  extraClasses?: ThemeExtraClasses;   // Add extra classes to components
  themeOverride?: (theme: ThemeProps) => ThemeProps;  // Function to modify theme
  mergeStrategy?: 'merge' | 'replace';  // How to merge with parent theme
}

// Example usage:
<ThemeProvider themeDefaults={{ button: { md: true, primary: true } }}>
  <Button>I'm medium and primary by default</Button>
</ThemeProvider>

// Nested providers merge by default:
<ThemeProvider themeDefaults={{ button: { primary: true } }}>
  <ThemeProvider themeDefaults={{ button: { lg: true } }}>
    <Button>I'm both primary and lg</Button>
  </ThemeProvider>
</ThemeProvider>
```

#### Prop Categories
Components use category-based prop organization (defined in `src/components/ui/props/index.ts`):

```typescript
export const ComponentKeys = {
  size: ['xs', 'sm', 'md', 'lg', 'xl'],
  appearance: ['primary', 'brand', 'accent', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info', 'link'],
  variant: ['filled', 'outline'],
  shape: ['rounded', 'pill', 'sharp'],
  fontFamily: ['sans', 'serif', 'mono'],
  fontWeight: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
  textAlign: ['textLeft', 'textCenter', 'textRight', 'textJustify'],
  padding: ['padding', 'noPadding'],
  gap: ['gap', 'noGap'],
  // ... more categories
};
```

The `pickFirstTruthyKeyByCategory` utility selects one prop from each category based on priority (prop > default).

### Component Development Guidelines

#### Creating New Components

1. **Define props interface** in `src/components/ui/props/`:
   ```typescript
   export interface MyComponentProps extends ComponentProps {
     // Component inherits size, appearance, variant, className, tag, etc.
   }
   ```

2. **Create theme** in `src/components/ui/theme/`:
   ```typescript
   export const myComponentTheme = new ComponentTheme<MyComponentProps, MyComponentTheme>(
     "div",  // default tag
     "base classes here",  // always applied
     {
       size: {
         text: new FontSizeTheme(),
         py: PyTheme.createForUI(),
         px: new PxTheme(aspectRatioMap, true),
       },
       appearance: {
         background: GenericVariantTheme.createBgAppearanceTheme(),
         text: GenericVariantTheme.createUIElementTextTheme(),
       },
       layout: {
         radius: RadiusTheme.createUITheme(),
       },
       typography: defaultTypographyThemes,
     },
     { md: true },  // defaults
     MY_COMPONENT_CATEGORIES  // which prop categories this component uses
   );
   ```

3. **Create component** in `src/components/ui/`:
   ```typescript
   export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
     function MyComponent(props, ref) {
       const theme = useTheme();
       return <ThemedComponent ref={ref} theme={theme.myComponent} {...props} />
     }
   );
   ```

4. **Add to theme interface** in `src/components/themeContext.tsx`:
   ```typescript
   export interface ThemeProps {
     // ... existing components
     myComponent: ComponentTheme<MyComponentProps, MyComponentTheme>;
   }

   export const defaultTheme: ThemeProps = {
     // ... existing components
     myComponent: myComponentTheme,
   };
   ```

5. **Export component** from `src/index.ts`

#### Testing Components

Tests should verify:
- Default theme classes are applied
- Size variants work (xs, sm, md, lg, xl)
- Appearance variants work (primary, secondary, success, etc.)
- Variant modifiers work (filled, outline)
- Custom className prop is merged correctly
- Ref forwarding works
- TypeScript types are correct

Example test structure:
```typescript
describe('MyComponent', () => {
  it('should have default theme classes', () => {
    const { container } = render(<MyComponent>test</MyComponent>);
    const element = container.querySelector('div');
    expect(element).toHaveClass('[--fs-unit:8]');
    expect(element).toHaveClass('text-(length:--fs)');
  });

  it('should apply size variants', () => {
    const { container } = render(<MyComponent lg>test</MyComponent>);
    const element = container.querySelector('div');
    expect(element).toHaveClass('[--fs-unit:9]');
  });
});
```

### Key Patterns and Best Practices

1. **CSS Variable Pattern**: Always return both setter and consumer classes
   - `["[--fs-unit:8]", "text-(length:--fs)"]`
   - Unit variable sets the value, consumer class applies it

2. **Unified Variables**: All components use the same CSS variable names
   - All components use `py-(--py)`, `px-(--px)`, `gap-(--gap)`, `rounded-(--br)`
   - Static factory methods like `PyTheme.createForUI()` provide appropriate unit values

3. **Responsive Support**: Use Tailwind's responsive syntax in CSS variable classes
   - `"[--fs-unit:15] max-tablet:[--fs-unit:12] max-mobile:[--fs-unit:9]"`
   - Available breakpoint modifiers: `max-mobile`, `max-tablet`, `max-desktop`
   - Typography components (PageTitle, SectionTitle, Title) use this for automatic responsive scaling
   - Layout components use BreakpointTheme for responsive flex direction changes

4. **Theme Composition**: Use static factory methods for common patterns
   - `FontSizeTheme.createForPageTitle()` - different scale for page titles
   - `RadiusTheme.createUITheme()` - UI-specific border radius
   - `GapTheme.createForUI()` - UI-specific gap spacing

5. **Boolean Props**: Components use boolean props for variants
   - `<Button primary md filled>` instead of `<Button appearance="primary" size="md" variant="filled">`
   - Provides better DX and cleaner JSX

6. **Class Merging**: `twMerge` deduplicates conflicting classes
   - User `className` takes precedence over theme classes
   - Later classes override earlier ones for same property

7. **Default Props**: Set via `themeDefaults` in ThemeProvider or component theme constructor
   - Defaults are applied before prop extraction
   - Component props always win over defaults

8. **Type Safety**: All props and themes are fully typed
   - TypeScript ensures only valid prop combinations
   - Theme structure is type-checked

### Common Pitfalls to Avoid

1. **Don't mix unit and consumer classes incorrectly**
   - ❌ `["text-(length:--fs)"]` without setting `--fs-unit` first
   - ✅ `["[--fs-unit:8]", "text-(length:--fs)"]`

2. **Use factory methods for appropriate unit values**
   - Use `PyTheme.createForUI()` for UI components (smaller spacing)
   - Use `new PyTheme()` for layout components (larger spacing)

3. **Don't hardcode sizes in theme classes**
   - ❌ `base: "p-4 text-base"`
   - ✅ Use CSS variables for all sizing: `["[--fs-unit:8]", "text-(length:--fs)"]`

4. **Don't skip test updates when changing theme values**
   - When updating CSS variable values in theme files, update corresponding tests
   - Tests verify the actual classes applied, not behavior

5. **Don't forget to export new components from index.ts**
   - Component must be exported to be part of public API

6. **Don't skip JSDoc documentation for components**
   - Add comprehensive JSDoc to component exports for IntelliSense support
   - Document all props using `@param` tags
   - Include 3-5 usage examples showing common patterns
   - **Use reusable documentation blocks** from `src/components/ui/docs/propDocs.ts` (see `REUSABLE_JSDOC_GUIDE.md`)
   - See `COMPONENT_DOCUMENTATION_TEMPLATE.md` for templates and guidelines

### Component Documentation Guidelines

VaneUI components should have comprehensive JSDoc documentation to provide excellent IntelliSense support in IDEs. Since props are generated via mapped types, JSDoc must be added directly to component exports.

#### Documentation Requirements

Every component export should include:

1. **Component Description** - Brief summary of purpose and behavior
2. **Usage Examples** - 3-5 realistic code examples showing:
   - Basic usage
   - Common prop combinations
   - Link mode (if supported via `href`)
   - Special features or behaviors
3. **Prop Documentation** - Document all props by category:
   - Size props (xs, sm, md, lg, xl)
   - Appearance props (primary, secondary, success, etc.)
   - Variant props (filled, outline)
   - Shape props (rounded, pill, sharp)
   - Typography props (font family, weight, style, alignment)
   - Layout props (gap, padding, flex, alignment)
   - Responsive props (breakpoint modifiers)
   - Special props (href, tag, className, children)
4. **Type Reference** - Link to full type definition with `@see` tag

#### Automated Documentation Generation

**VaneUI uses automated JSDoc generation** to eliminate manual work and ensure consistency across all components.

**Key files:**
- **`src/components/ui/docs/propDocs.ts`** - Single source of truth for all prop documentation blocks
- **`scripts/generateComponentDocs.ts`** - Automated script that generates JSDoc for components

**How it works:**

1. Component metadata (name, description, examples) is defined in `scripts/generateComponentDocs.ts`
2. The script reads which prop categories each component uses (from `keys.ts`)
3. It maps categories to documentation blocks from `propDocs.ts`
4. JSDoc is automatically generated and injected into component source files
5. The script runs automatically before every build

**Workflow for adding new components:**

1. **Add component metadata to `scripts/generateComponentDocs.ts`:**
   ```typescript
   const COMPONENTS: ComponentMetadata[] = [
     {
       name: 'MyComponent',
       file: 'mycomponent.tsx',
       propsType: 'MyComponentProps',
       refType: 'HTMLDivElement',
       description: 'A brief description of what this component does',
       examples: [
         '// Basic usage',
         '<MyComponent>Content</MyComponent>',
         '',
         '// With props',
         '<MyComponent primary lg>Styled</MyComponent>',
       ],
     },
     // ... other components
   ];
   ```

2. **Run the documentation generator:**
   ```bash
   npm run docs:generate
   ```

3. **Build and verify:**
   ```bash
   npm run build
   cat dist/components/ui/mycomponent.d.ts
   ```

**Benefits:**
- ✅ **Fully automated** - JSDoc generated programmatically, zero manual copying
- ✅ **Single source of truth** - All prop descriptions in `propDocs.ts`
- ✅ **Consistency** - All components use identical wording for same props
- ✅ **Zero duplication** - Documentation blocks reused across all components
- ✅ **Easy maintenance** - Update `propDocs.ts` once, regenerate all docs
- ✅ **Integrated build** - Runs automatically before every build

#### Example: Button Component JSDoc

```typescript
/**
 * Button component - A clickable button element with customizable appearance and behavior.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With size, appearance, and variant
 * <Button lg primary filled>Submit</Button>
 *
 * // As a link
 * <Button href="/about">About</Button>
 * ```
 *
 * @param props - Button props
 * @param props.children - Button content
 * @param props.className - Additional CSS classes
 *
 * SIZE PROPS:
 * @param props.xs - Extra small size
 * @param props.sm - Small size
 * @param props.md - Medium size (default)
 * @param props.lg - Large size
 * @param props.xl - Extra large size
 *
 * APPEARANCE PROPS:
 * @param props.primary - Primary color appearance (blue)
 * @param props.secondary - Secondary color appearance (gray)
 * @param props.success - Success color appearance (green)
 * @param props.danger - Danger color appearance (red)
 * // ... more appearances
 *
 * VARIANT PROPS:
 * @param props.filled - Filled variant with solid background
 * @param props.outline - Outline variant with border only
 *
 * // ... more prop categories
 *
 * @see {@link ButtonProps} for the complete type definition
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(...);
```

#### Verification Steps

After adding documentation:

1. **Build the package**: `npm run build`
2. **Check `.d.ts` files**: Verify JSDoc is preserved in `dist/components/ui/[component].d.ts`
3. **Test in IDE**: Open a consuming project and verify IntelliSense shows:
   - Component description on hover
   - Prop descriptions when typing
   - Examples in completion details
4. **Validate examples**: Ensure code examples are syntactically correct

#### Documentation Best Practices

- **Be complete but concise** - List all props, but keep descriptions brief (one line each)
- **Group props logically** - Organize by category (size, appearance, variant, etc.)
- **Show real examples** - Use actual use cases, not contrived examples
- **Mention defaults** - Note which props are default (e.g., "`md` - Medium size (default)")
- **Document special behavior** - Call out auto-responsive, link conversion, tag polymorphism
- **Include TypeScript reference** - Always link to the full Props type with `@see`
- **Update on changes** - When adding new props or features, update JSDoc immediately