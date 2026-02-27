---
paths:
  - "playground/src/App.tsx"
---

# Playground Examples — Required for New/Changed Components

Every new component or significant feature change MUST include visual examples in `playground/src/App.tsx`. This is part of the implementation workflow — not optional.

## File Size Management

`App.tsx` should stay focused and manageable — it is a living showcase, not an append-only log. Before adding a new section:

- **Remove or condense older sections** that are no longer relevant (e.g., a previous component's showcase when a newer one replaces it, or overly detailed variants that aren't needed for day-to-day development)
- **Keep the most recent and actively developed showcases** — the file should highlight what was recently built or changed
- **Target**: Aim for ~3-5 component sections at a time. If the file exceeds ~500 lines, trim older sections first
- **Preserve sections for components still under active iteration** — only remove sections for stable, fully tested components

## When to Add Examples

- **New component** — Full showcase section (sizes, appearances, variants, real-world usage)
- **New prop or feature** — Dedicated section showing the feature with all relevant variations
- **Refactored component** — Update existing examples if behavior or API changed
- **Bug fix** — Add an example that demonstrates the fix (the scenario that was broken)

## Section Structure

Each component/feature gets its own section following this pattern:

```tsx
{/* ═══ COMPONENT NAME ═══════════════════════════════════════ */}
<Divider />
<SectionTitle>Component Name</SectionTitle>

<Card>
  <Title>Basic Usage</Title>
  <Text sm secondary>Brief description of what this shows.</Text>
  {/* Examples */}
</Card>

<Card>
  <Title>Size Variants</Title>
  <Text sm secondary>Description.</Text>
  {/* xs, sm, md, lg, xl examples */}
</Card>

<Card>
  <Title>Appearance Variants</Title>
  {/* primary, brand, accent, success, danger, warning, info, secondary */}
</Card>

<Card>
  <Title>Real-World Usage</Title>
  <Text sm secondary>How this looks in a realistic context.</Text>
  {/* Contextual examples */}
</Card>
```

## Required Example Categories

For a **new component**, include at minimum:

1. **Basic/Default** — Simplest usage with no extra props
2. **Sizes** — All 5 size variants (xs, sm, md, lg, xl)
3. **Appearances** — All relevant appearance variants
4. **Variants** — filled, outline if applicable
5. **Shapes** — rounded, pill, sharp if applicable
6. **Key props** — Any unique props the component has (e.g., `external` for Link)
7. **Real-world context** — The component used naturally inside Text, Card, or other components

For a **feature change/new prop**, include at minimum:

1. **Feature in isolation** — The prop/feature on its own
2. **Comparison** — Before/after or with/without the feature
3. **Variants** — The feature combined with sizes, appearances, etc.
4. **Real-world context** — Realistic usage scenario

## Import Checklist

When adding examples for a component, ensure it is imported at the top of `App.tsx`:

```tsx
import {
  // ... existing imports
  NewComponent,       // Add component
  HelperExport,       // Add any related exports
} from '../../src';
```

## Conventions

- Use `<Text sm secondary>` for descriptions under each `<Title>`
- Use `<Code sm>` for inline prop/class references within descriptions
- Use `<Stack noGap noPadding>` for vertical lists of examples
- Use `<Row flexWrap>` for horizontal variant grids
- Use real URLs or realistic placeholder text — not "lorem ipsum"
- Keep each `<Card>` focused on one concept
- Add descriptive `<Title>` tags — they serve as visual anchors when scrolling

## Verification

After adding examples, run `npm run playground` and visually confirm:
- All examples render without errors
- Sizes scale correctly (strictly increasing)
- Appearances show correct colors
- Interactive elements (links, buttons) work as expected
- Layout doesn't break at different viewport widths
