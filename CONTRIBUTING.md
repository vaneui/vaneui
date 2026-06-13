# Contributing to VaneUI

This guide is for developers working on the VaneUI library itself. For information on how to use VaneUI components in your projects, see the [README](./README.md) and the [documentation](https://vaneui.com/).

## Getting Started

```bash
git clone <repo-url>
cd vaneui
npm install
npm run playground   # Build CSS then start the Vite playground with hot reload
```

## Common Commands

### Build Commands
- `npm run build` - Full build process (includes TypeScript compilation, CSS generation, and cleanup)
- `npm run build:js` - TypeScript compilation and bundling only
- `npm run build:css:ui` - Generate main UI CSS file using Tailwind CLI v4
- `npm run build:css:vars` - Generate CSS variables file using Tailwind CLI v4
- `npm run clean` - Clean the dist directory

### Development Commands
- `npm run type-check` - Run TypeScript type checking without emitting files
- `npm test` - Run Jest tests (includes TypeScript type checking)
- `npm run playground` - Start development playground with CSS hot reloading

### Component Development
- All components use the `ComponentTheme` pattern for consistent theming
- Components are exported from `src/index.ts` for public API
- CSS is built using Tailwind CLI v4 and exported separately as `vars.css` and `ui.css`

## Architecture

### Core Theme System
The library uses a sophisticated theme system centered around `ComponentTheme<P, T>` class:
- **ThemeProvider**: Context provider for global theme configuration (supports nesting, defaults, and extra classes)
- **ComponentTheme**: Base class that handles prop-to-class mapping and component configuration
- **ThemedComponent**: Generic component wrapper that applies themes
- **BaseTheme**: Foundation for all theme implementations (each theme extends this)

### Component Structure
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

## CSS Variable Architecture

VaneUI uses a **three-tier CSS variable system** that integrates with Tailwind CSS v4:

### Tier 1: Unit Variables (Set by Theme Classes)
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

### Tier 2: Computed Variables (Defined in vars.css)
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

### Tier 3: Semantic Variables (Pre-defined Tokens)
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

### Tailwind Classes Consume Variables

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

### Unified CSS Variables

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

### Data Attributes

Components emit data attributes used for CSS-driven styling:
- `data-vane-type` - Component type (`"ui"` or `"layout"`) - controls spacing scales
- `data-size` - Current size (`"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`)
- `data-appearance` - Current appearance (`"primary"`, `"secondary"`, etc.)
- `data-variant` - Current variant (`"filled"` or `"outline"`)

These attributes are used by CSS rules in `vars.css` to set appearance-specific color variables and component-type-specific spacing.

**UI vs Layout spacing:**
- UI components (`data-vane-type="ui"`) use compact spacing for interactive elements
- Layout components (`data-vane-type="layout"`) use generous spacing for structural elements

### Complete Example: Button Component

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

## Theme System Details

### ComponentTheme Class
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
  private readonly tagFunction?: (props: P) => React.ElementType;  // Dynamic tag based on props

  getClasses(props: P): string[] {
    // 1. Extract which props are set (size, appearance, variant, etc.)
    const extractedKeys = pickFirstTruthyKeyByCategory(props, defaults, categories);

    // 2. Walk theme tree and collect classes from each BaseTheme
    // 3. Each BaseTheme.getClasses() returns CSS variable setting classes
    // 4. Return array of all classes
  }

  getComponentConfig(props: P): { className: string; tag: ElementType; attrs: Record<string, string> } {
    // Returns final className, resolved tag, and data attributes
    // Tag is determined by: tagFunction(props) > props.tag > this.tag (default)
    // Attributes include: data-vane-type, data-size, data-appearance, data-variant
  }
}
```

**tagFunction Pattern**: Used to dynamically switch HTML tag based on props. For example, Card uses this to render as `<a>` when `href` is provided:

```typescript
// In cardTheme.ts
new ComponentTheme<CardProps, CardTheme>(
  "div",  // default tag
  "vane-card",
  themes,
  defaults,
  CARD_CATEGORIES,
  (props: CardProps) => props.href ? "a" : "div",  // tagFunction
  'layout'
);
```

### BaseTheme Classes
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

### Theme Provider System
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

### Prop Categories
Components use category-based prop organization (defined in `src/components/ui/props/keys.ts`):

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

// Category constants for composition
export const TEXT_ALIGN = ['textAlign'] as const;
export const TYPOGRAPHY_STYLE_CORE = ['fontWeight', 'fontStyle', 'textDecoration', 'textTransform', 'fontFamily'] as const;
export const TYPOGRAPHY_STYLE = [...TYPOGRAPHY_STYLE_CORE, ...TEXT_ALIGN] as const;

// Component categories use composition for DRY code
export const COL_CATEGORIES = [...LAYOUT_FULL, ...VISUAL_LAYOUT, ...VARIANT, ...COMMON_MODIFIERS, ...TEXT_ALIGN] as const;
export const ROW_CATEGORIES = [...LAYOUT_FULL, ...BREAKPOINT, ...VISUAL_LAYOUT, ...VARIANT, ...COMMON_MODIFIERS, ...TEXT_ALIGN] as const;
export const STACK_CATEGORIES = [...LAYOUT_FULL, ...BREAKPOINT, ...PADDING, ...VISUAL_LAYOUT, ...VARIANT, ...COMMON_MODIFIERS, ...TEXT_ALIGN] as const;
```

The `pickFirstTruthyKeyByCategory` utility selects one prop from each category based on priority (prop > default).

### Key Types Pattern

**All Key types must be defined in `keys.ts` — theme files must import them, not define their own.**

```typescript
// ✅ CORRECT: Define in keys.ts
export const ComponentKeys = {
  myCategory: ['optionA', 'optionB', 'optionC'] as const,
};
export type MyCategoryKey = typeof ComponentKeys.myCategory[number];

// ✅ CORRECT: Theme file imports from props
import type { CategoryProps, MyCategoryKey } from "../../props";

export class MyCategoryTheme extends BaseTheme implements Record<MyCategoryKey, string> {
  optionA: string = "class-a";
  optionB: string = "class-b";
  optionC: string = "class-c";
}

// ❌ WRONG: Don't define Key types locally in theme files
export type MyCategoryKey = 'optionA' | 'optionB' | 'optionC';
```

This pattern ensures:
- **Single source of truth** — keys defined once in `ComponentKeys`
- **Type safety** — TypeScript enforces theme properties match keys
- **Consistent prop descriptions** — `generatePropDescriptions.ts` uses `ComponentKeys` to validate coverage
- **Easy maintenance** — add/remove options in one place

## Component Development Guidelines

### Creating New Components

1. **Define props interface** in `src/components/ui/props/`:
   ```typescript
   export interface MyComponentProps extends ComponentProps {
     // Component inherits size, appearance, variant, className, tag, etc.
   }
   ```

2. **If adding new prop categories**, update `keys.ts` first:
   ```typescript
   // Add to ComponentKeys
   export const ComponentKeys = {
     // ... existing
     myCategory: ['optionA', 'optionB'] as const,
   };

   // Export the Key type
   export type MyCategoryKey = typeof ComponentKeys.myCategory[number];
   ```

3. **Create theme** in `src/components/ui/theme/` — import Key types from props:
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

4. **Create component** in `src/components/ui/`:
   ```typescript
   export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
     function MyComponent(props, ref) {
       const theme = useTheme();
       return <ThemedComponent ref={ref} theme={theme.myComponent} {...props} />
     }
   );
   ```

5. **Add to theme interface** in `src/components/themeContext.tsx`:
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

6. **Export component** from `src/index.ts`

### Testing Components

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

## Key Patterns and Best Practices

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

## Common Pitfalls to Avoid

1. **Don't mix unit and consumer classes incorrectly**
   - :x: `["text-(length:--fs)"]` without setting `--fs-unit` first
   - :white_check_mark: `["[--fs-unit:8]", "text-(length:--fs)"]`

2. **Use factory methods for appropriate unit values**
   - Use `PyTheme.createForUI()` for UI components (smaller spacing)
   - Use `new PyTheme()` for layout components (larger spacing)

3. **Don't hardcode sizes in theme classes**
   - :x: `base: "p-4 text-base"`
   - :white_check_mark: Use CSS variables for all sizing: `["[--fs-unit:8]", "text-(length:--fs)"]`

4. **Don't skip test updates when changing theme values**
   - When updating CSS variable values in theme files, update corresponding tests
   - Tests verify the actual classes applied, not behavior

5. **Don't forget to export new components from index.ts**
   - Component must be exported to be part of public API

6. **Don't skip JSDoc on prop interfaces**
   - Every prop key in `ComponentKeys` must have a JSDoc description on its prop
     interface in `src/components/ui/props/` — the build fails listing the
     missing ones (see "Prop Documentation Pipeline" below)

## Prop Documentation Pipeline

Prop descriptions are written **once**, as JSDoc comments on the prop category
interfaces in `src/components/ui/props/` (e.g. `SizeProps`, `AppearanceProps`,
`VariantProps`). Because component props are composed from these shared
interfaces, IDEs surface the descriptions on every component that uses the
category — there is no per-component JSDoc duplication.

`scripts/generatePropDescriptions.ts` additionally extracts the JSDoc into a
runtime-consumable module:

- **Output:** `src/components/ui/props/propDescriptions.ts` (committed, auto-generated — never edit by hand).
- **Regenerate with:** `npm run props:generate`. The script also runs automatically as the first step of `npm run build`.
- **Validation:** the script cross-checks the extracted descriptions against `ComponentKeys` and fails the build if any prop lacks a JSDoc description (orphaned/extra descriptions produce warnings).
- **Determinism:** the output contains no timestamps, so rebuilding without source changes leaves the file untouched. CI enforces this with `git diff --exit-code` after the build.

**Workflow when adding or changing a prop:**

1. Add the prop key to its category in `src/components/ui/props/keys.ts`.
2. Add/update the JSDoc comment on the matching interface member in `src/components/ui/props/`.
3. Run `npm run props:generate` and commit the regenerated `propDescriptions.ts` together with your change.
