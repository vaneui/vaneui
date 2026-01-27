---
paths:
  - "src/components/ui/props/**"
  - "src/components/ui/theme/**"
  - "src/components/themedComponent.tsx"
  - "src/components/themeContext.tsx"
---

# VaneUI Props & Theme System Internals

## Prop Resolution Pipeline
1. Component receives props (boolean flags + HTML attributes)
2. `pickFirstTruthyKeyByCategory()` selects ONE value per category (first truthy wins, falls back to defaults)
3. `getClasses()` walks the theme tree using extracted keys to build CSS class arrays
4. `twMerge()` combines theme classes + user `className` (user wins on conflicts)
5. `getComponentConfig()` strips boolean props, keeps only HTML-valid attributes for DOM
6. Data attributes (`data-size`, `data-appearance`, `data-variant`) are emitted for CSS targeting

## Category System
Defined in `src/components/ui/props/keys.ts`:
- `ComponentKeys` — Maps each category to its possible values (e.g., `size: ['xs','sm','md','lg','xl']`)
- `ComponentCategories` — Maps each component name to its allowed categories
- Categories are mutually exclusive: only one value per category is active

## Theme Tree Structure
Each component's theme is a `ComponentTheme<P, T>` with:
- `tag` — Default HTML element type
- `base` — Always-applied CSS classes
- `themes` — Nested theme object walked by `getClasses()`
- `defaults` — Default prop values (e.g., `{ md: true, primary: true, outline: true }`)
- `categories` — Array of allowed category keys
- `vaneType` — `'ui'` or `'layout'` (sets `data-vane-type` attribute)
- `tagFunction` — Optional dynamic tag selection (e.g., render as `<a>` when `href` is present)

## ThemeProvider
- `themeDefaults` — Set default props for any component globally
- `extraClasses` — Add CSS classes per component per prop
- `themeOverride` — Programmatic theme modification function
- `mergeStrategy` — `"merge"` (default, inherits parent) or `"replace"` (fresh from defaultTheme)
- Supports nesting: child providers merge with parent settings

## Adding a New Prop Category
1. Create prop type in `src/components/ui/props/newPropName.ts`
2. Add category key and values to `ComponentKeys` in `keys.ts`
3. Add category to relevant component category arrays (e.g., `INTERACTIVE_CATEGORIES`)
4. Create theme class in `src/components/ui/theme/`
5. Wire into component theme's `getClasses()` method
