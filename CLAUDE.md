# CLAUDE.md

## Project Overview

VaneUI (`@vaneui/ui`, v0.9.0) is a React component library with 24 customizable UI components. Built with TypeScript, React 19, Tailwind CSS v4, and Rollup. Uses a boolean props API (`<Button primary lg filled>`) and CSS variable-based theming via `ThemeProvider`.

## CRITICAL: Verification After ANY Code Change

**After making ANY code changes** (new features, bug fixes, refactoring, import changes, theme updates, etc.), you MUST run the full verification pipeline. Do NOT report work as complete until all checks pass.

```bash
cd C:/GitHub/vaneui

npm run type-check    # TypeScript type validation
npm run lint          # ESLint — zero errors required
npm test              # Jest — all tests must pass
npm run build         # Full build (includes type-check + lint + rollup + CSS)
```

**`npm run build` is the most comprehensive check** — it runs type-check, lint, rollup bundling, and CSS generation. If build passes, type-check and lint also passed. However, it does NOT run tests, so always run `npm test` separately.

**Common pitfall**: `tsc --noEmit` (type-check) can pass while runtime tests fail due to circular dependencies. Always run BOTH type-check AND tests.

## Component Implementation Workflow

When creating or modifying components, **ALL steps below must be completed**. Use the `component-implementation` agent for guidance or `pre-commit-checker` agent to verify.

### Required Steps for New Components

1. **Create Component**
   - Component file: `src/components/ui/{component}.tsx`
   - Theme file: `src/components/ui/theme/{component}Theme.ts`
   - Add categories to `src/components/ui/props/keys.ts` if needed
   - **Key Type Pattern**: Define keys in `ComponentKeys`, export Key type from `keys.ts`, theme files import from `../../props`

2. **Integrate with Theme System**
   - Update `src/components/themeContext.tsx` (import, ThemeProps, defaultTheme, ThemeDefaults, ThemeExtraClasses)
   - Update `src/index.ts` (export component and props type)

3. **Write Tests (REQUIRED)**
   - Create `src/components/tests/{component}.test.tsx`
   - Test: default rendering, size variants, appearance variants, variant modifiers, shape variants, ref forwarding, prop leak prevention, className merging, tag switching (if applicable)
   - See `.claude/rules/testing.md` for patterns

4. **Verify (ALL must pass)**
   ```bash
   npm run type-check    # TypeScript
   npm run lint          # ESLint — zero errors required
   npm test              # Jest — all tests must pass
   npm run build         # Full build
   ```

**Work is NOT complete until tests are written and all verification passes.**

### Subagents

- `component-implementation` — Guides complete implementation workflow
- `pre-commit-checker` — Verifies all checks pass before commit
- `test-runner` — Runs tests and reports results
- `component-auditor` — Audits component for completeness

## Commands

- `npm run build` — Full build (type-check + lint + rollup + CSS generation to `dist/`)
- `npm test` — Jest test suite (ts-jest, jsdom)
- `npm run playground` — Dev server with CSS hot reload
- `npm run build:js` — TypeScript/Rollup only
- `npm run build:css:ui` — Tailwind CLI for component styles
- `npm run build:css:vars` — Tailwind CLI for CSS variables

## Component Inventory

| Category | Components | `data-vane-type` |
|----------|-----------|-----------------|
| **Interactive** | Button, Badge, Chip, Code, Input, Checkbox, Label | `ui` |
| **Layout** | Card, Section, Container, Row, Col, Stack, Grid2-6, Divider, Img | `layout` |
| **Typography** | Text, Title, SectionTitle, PageTitle, Link, List, ListItem | `ui` |

## Prop System (Boolean Flags)

Props are grouped into **mutually exclusive categories** — only one value per category is active:

| Category | Values |
|----------|--------|
| **size** | `xs`, `sm`, `md` (default), `lg`, `xl` |
| **appearance** | `primary`, `brand`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`, `link` |
| **variant** | `filled`, `outline` (default) |
| **shape** | `pill`, `rounded` (default), `sharp` |
| **display** | `flex`, `inlineFlex`, `block`, `inline`, `grid`, etc. |
| **flexDirection** | `row`, `column`, `rowReverse`, `columnReverse` |
| **fontWeight** | `thin` through `black` |
| **textAlign** | `textLeft`, `textCenter`, `textRight`, `textJustify` |

Additional toggle props: `gap`/`noGap`, `padding`/`noPadding`, `shadow`/`noShadow`, `ring`/`noRing`, `border`/`noBorder`, `underline`, `uppercase`, `italic`, `bold`, `semibold`, `mono`, `reverse`, `transparent`, `responsive`, `sticky`, `flexWrap`, `itemsCenter`, `justifyBetween`, etc.

**Breakpoints** (layout components): `mobileCol`, `tabletCol`, `desktopCol`
**Hide**: `mobileHide`, `tabletHide`, `desktopHide`

## Key Defaults (Do NOT Redundantly Specify)

| Component | Defaults |
|-----------|----------|
| **Button** | primary, outline, semibold, rounded, padding, gap, shadow, ring, focusVisible |
| **Card** | padding, rounded, outline, gap |
| **Row** | itemsCenter, gap, outline |
| **Stack** | padding, gap, outline |
| **Badge** | primary, outline, pill |
| **Chip** | secondary (not primary!), outline, rounded |
| **Link** | link (not primary!), outline, underline, cursorPointer |
| **Input** | primary, outline, rounded, wFull |
| **Icon** | md, inlineFlex, itemsCenter, justifyCenter, outline |
| **Checkbox** | md, primary, border, rounded, filled, focusVisible, cursorPointer |
| **Modal** | md, wFull, flex, column, overflowAuto, relative, gap, rounded, shadow, primary, outline |
| **Container** | md, wFull, flex, column, itemsCenter, gap, noPadding, outline, sharp |
| **Section** | md, wFull, flex, column, itemsStart, gap, padding, outline, sharp, responsive |
| **Typography** (Text, Title, etc.) | md, primary, outline |
| **Layout** (Row, Col, Stack, Card, Grid*) | gap, md, outline |

## Architecture

```
src/
├── components/
│   ├── ui/              # Component files (button.tsx, card.tsx, etc.)
│   │   ├── props/       # 30+ prop type definition files + keys.ts (category system)
│   │   ├── theme/       # Theme implementations (appearance/, size/, layout/, typography/)
│   │   ├── classes/     # CSS class mappings
│   │   └── css/         # vars.css (CSS variables), index.css
│   ├── tests/           # 40+ test files (Jest + Testing Library)
│   ├── utils/           # deepMerge, componentUtils
│   ├── themeContext.tsx  # ThemeProvider & useTheme
│   └── themedComponent.tsx  # Generic themed component wrapper
└── index.ts             # Barrel exports
```

**Component pattern**: `forwardRef` + `useTheme()` + `ThemedComponent` wrapper. All components support `className` (merged via `twMerge`), `ref`, `tag` prop, and `href` for tag switching (renders as `<a>`).

**Theming**: CSS variables set by theme classes (`[--fs-unit:8]`) -> computed in `vars.css` (`calc(var(--fs-unit) * var(--fs-base))`) -> consumed by utility classes (`text-(length:--fs)`). Colors driven by `data-appearance` + `data-variant` attributes.

**ThemeProvider**: Supports `themeDefaults`, `extraClasses`, `themeOverride`, nested providers with `mergeStrategy` ("merge" | "replace").

## Exports

- `@vaneui/ui` — All components + ThemeProvider + useTheme + defaultTheme + types
- `@vaneui/ui/vars` — CSS variables (`vars.css`)
- `@vaneui/ui/css` — Pre-built component styles (`ui.css`)

## Critical Rules

1. **Prefer VaneUI props over Tailwind classes** — Use `bold` not `className="font-bold"`, `textCenter` not `className="text-center"`, `pill` not `className="rounded-full"`, etc.
2. **Don't override themed properties with className** — Use `danger` not `className="bg-red-500"`. Use size props not `className="gap-*"`.
3. **Don't specify default props** — `<Row gap>` is redundant (gap is true by default).
4. **Boolean props must not leak to DOM** — They are consumed by the theme system and stripped by `getComponentConfig()`.
5. **Desktop-first responsive** — Breakpoints: mobile (48rem/768px), tablet (64rem/1024px), desktop (80rem/1280px). Use `tabletCol`/`mobileCol` to adapt layouts for smaller screens.
6. **No replaceable Tailwind classes in base class strings** — When a Tailwind class has an equivalent boolean prop (e.g., `items-center` → `itemsCenter`, `cursor-pointer` → `cursorPointer`, `relative` → `relative`), it MUST go in the component's defaults object, not in the base class string of `new ComponentTheme(...)`. The base class string is only for classes that have NO boolean prop equivalent (e.g., `align-middle`, `aspect-square`, `w-full`, child selectors like `[&_svg]:shrink-0`, conditional selectors like `hover:underline`). This is enforced by the `theme-collections.test.ts` quality check. When adding a boolean prop default, ensure the component's categories include the prop's category, the theme has the corresponding class mapper, and the prop type includes the prop interface.

## Detailed Conventions

Path-scoped rules in `.claude/rules/` provide detailed guidance when working with specific file types:
- `component-patterns.md` — Component structure, categories, defaults (for `src/components/**`)
- `css-conventions.md` — CSS variable system, Tailwind v4 patterns (for `**/*.css` and theme files)
- `testing.md` — Test patterns and conventions (for `**/*.test.*`)
- `props-and-theme.md` — Theme internals, prop resolution pipeline (for props/ and theme/ files)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for architecture details, CSS variable system internals, and development workflows.
