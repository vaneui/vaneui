---
paths:
  - "**/*.css"
  - "src/components/ui/theme/**/*.ts"
  - "src/components/ui/classes/**/*.ts"
---

# VaneUI CSS & Theme Conventions

## Three-Tier CSS Variable System

### Tier 1: Unit Variables (Set by Theme Classes)
Theme classes use Tailwind v4 arbitrary value syntax to set CSS variable units:
```typescript
// FontSizeTheme: xs = "[--fs-unit:6]", md = "[--fs-unit:8]", lg = "[--fs-unit:9]"
// PyTheme:       xs = "[--py-unit:1]", md = "[--py-unit:2]"
// GapTheme:      xs = "[--gap-unit:2]", md = "[--gap-unit:4]"
// BrTheme:       rounded = "[--br-unit:2]", pill = "[--br-unit:9999]", sharp = "[--br-unit:0]"
```

### Tier 2: Computed Variables (vars.css @layer base)
```css
--fs: calc(var(--fs-unit) * var(--fs-base));        /* font-size */
--py: calc(var(--py-unit) * var(--spacing));         /* padding-y */
--px: calc(var(--aspect-ratio) * var(--py-unit) * var(--spacing)); /* padding-x */
--gap: calc(var(--gap-unit) * var(--spacing));       /* gap */
--br: calc(var(--br-unit) * var(--br-base));         /* border-radius */
```

### Tier 3: Semantic Variables (vars.css @theme block)
```css
--color-text-primary, --color-bg-primary, --color-border-primary /* per appearance */
--breakpoint-mobile: 48rem; --breakpoint-tablet: 64rem; --breakpoint-desktop: 80rem;
```

## Appearance/Variant System
Colors are driven by data attributes, NOT hardcoded classes:
```css
[data-variant="outline"][data-appearance="primary"] {
  --text-color: var(--color-text-primary);
  --bg-color: var(--color-bg-primary);
  --border-color: var(--color-border-primary);
}
```

Consumer classes then use: `bg-(--bg-color)`, `text-(--text-color)`, `border-(--border-color)`

## Rules
- Never hardcode colors — use appearance props that map to CSS variables
- Size props control gap/padding/font-size/border-radius via the unit variable system
- Don't use Tailwind `gap-*`, `bg-*`, `tracking-*` classes — use VaneUI's prop/variable system
- `data-vane-type` scoping in vars.css sets different default units for `"ui"` vs `"layout"` components
- Responsive typography uses breakpoint modifiers: `max-tablet:[--fs-unit:12] max-mobile:[--fs-unit:9]`
