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

## Key Types Pattern

**All Key types must be defined in one place: `keys.ts`**

The pattern for defining and using Key types:

1. **Define keys in `ComponentKeys`** in `src/components/ui/props/keys.ts`:
   ```typescript
   export const ComponentKeys = {
     // ... existing categories
     myCategory: ['optionA', 'optionB', 'optionC'] as const,
   };
   ```

2. **Export the Key type from `keys.ts`**:
   ```typescript
   export type MyCategoryKey = typeof ComponentKeys.myCategory[number];
   // Results in: 'optionA' | 'optionB' | 'optionC'
   ```

3. **Theme files import from `keys.ts`** — never define their own Key types:
   ```typescript
   // CORRECT - import from props (which re-exports from keys.ts)
   import type { CategoryProps, MyCategoryKey } from "../../props";

   export class MyCategoryTheme extends BaseTheme implements Record<MyCategoryKey, string> {
     optionA: string = "class-a";
     optionB: string = "class-b";
     optionC: string = "class-c";
     // ...
   }
   ```

   ```typescript
   // WRONG - don't define Key types locally in theme files
   export type MyCategoryKey = 'optionA' | 'optionB' | 'optionC';  // ❌ Don't do this
   ```

This ensures:
- Single source of truth for all keys
- Type safety across the codebase
- Easy updates when adding/removing options
- Consistent prop descriptions generation

## Adding a New Prop Category

1. **Add category to `ComponentKeys`** in `src/components/ui/props/keys.ts`:
   ```typescript
   export const ComponentKeys = {
     // ... existing
     newCategory: ['value1', 'value2', 'value3'] as const,
   };
   ```

2. **Export the Key type** from `keys.ts`:
   ```typescript
   export type NewCategoryKey = typeof ComponentKeys.newCategory[number];
   ```

3. **Create prop type** in `src/components/ui/props/newCategoryProps.ts` (with JSDoc for each prop)

4. **Add to `interfaceToCategoryMap`** in `scripts/generatePropDescriptions.ts`

5. **Add category to component category arrays** (e.g., `INTERACTIVE_CATEGORIES`)

6. **Create theme class** in `src/components/ui/theme/` — import Key type from props:
   ```typescript
   import type { CategoryProps, NewCategoryKey } from "../../props";
   ```

7. **Wire into component theme's `getClasses()` method**

8. **Run `npm run props:generate`** to update prop descriptions

## Defaults Must Be Extracted (Never Inline)

**Every component's defaults MUST live in a separate `{component}Defaults.ts` file.**

Never pass inline object literals as the defaults argument to `new ComponentTheme(...)`:

```typescript
// WRONG — hardcoded inline defaults, not customizable
export const defaultMenuDividerTheme = new ComponentTheme<DividerProps, DividerTheme>(
  defaultDividerTheme.tag,
  defaultDividerTheme.base,
  defaultDividerTheme.themes,
  { sm: true, outline: true, inherit: true, paddingY: true, horizontal: true },  // ❌
  DIVIDER_CATEGORIES,
);

// RIGHT — extracted to a file, customizable via ThemeProvider
import { menuDividerDefaults } from "./menuDividerDefaults";
export const defaultMenuDividerTheme = new ComponentTheme<DividerProps, DividerTheme>(
  defaultDividerTheme.tag,
  defaultDividerTheme.base,
  defaultDividerTheme.themes,
  menuDividerDefaults,  // ✅
  DIVIDER_CATEGORIES,
);
```

This applies to sub-theme variants too (e.g., `menuPopupDefaults`, `menuDividerDefaults`, `modalHeaderDefaults`). Each must:
1. Be defined in a `{name}Defaults.ts` file
2. Be exported from the component's barrel `index.ts`
3. Be included in `src/components/ui/theme/defaults.ts` aggregator

## Size-Dependent Padding and Border-Radius

Padding and border-radius values MUST scale with the component's size prop. A component cannot use the same padding or border-radius when `xs` vs `xl` is applied — these are driven by CSS variables that change per size (`--pd-unit`, `--rounded`, etc.).

When reviewing or creating themes, verify that:
- Padding class mappers use size-aware CSS variables (e.g., `PyClassMapper`, `PxClassMapper`)
- Border-radius comes from the shape system which respects size
- No fixed Tailwind padding/radius classes are used that would ignore the size prop
