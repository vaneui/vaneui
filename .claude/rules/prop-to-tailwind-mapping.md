---
paths:
  - "**/*.tsx"
  - "**/*.jsx"
  - "**/*.ts"
---

# VaneUI Boolean Prop → Tailwind Class Mapping

This file enumerates every VaneUI boolean prop that replaces a standard Tailwind CSS utility class. When writing or reviewing VaneUI consumer code, use this table to spot `className="..."` values that should be converted to props.

**Source of truth**: `src/components/ui/theme/**/*ClassMapper.ts`. Regenerate by reading those files if the list here drifts.

## Rule

If a Tailwind class has a prop equivalent, **use the prop**. Never put these classes in a consumer `className` or in a component's base-class string.

---

## Display

| Prop | Tailwind Class |
|------|---------------|
| `inline` | `inline` |
| `block` | `block` |
| `inlineBlock` | `inline-block` |
| `flex` | `flex` |
| `inlineFlex` | `inline-flex` |
| `grid` | `grid` |
| `inlineGrid` | `inline-grid` |
| `contents` | `contents` |
| `table` | `table` |
| `tableCell` | `table-cell` |
| `hidden` | `hidden` |

## Flex Direction

| Prop | Tailwind Class |
|------|---------------|
| `row` | `flex-row` |
| `column` | `flex-col` |
| `rowReverse` | `flex-row-reverse` |
| `columnReverse` | `flex-col-reverse` |

## Flex Alignment (Cross-Axis)

| Prop | Tailwind Class |
|------|---------------|
| `itemsStart` | `items-start` |
| `itemsEnd` | `items-end` |
| `itemsCenter` | `items-center` |
| `itemsBaseline` | `items-baseline` |
| `itemsStretch` | `items-stretch` |

## Flex Alignment (Main-Axis)

| Prop | Tailwind Class |
|------|---------------|
| `justifyStart` | `justify-start` |
| `justifyEnd` | `justify-end` |
| `justifyCenter` | `justify-center` |
| `justifyBetween` | `justify-between` |
| `justifyAround` | `justify-around` |
| `justifyEvenly` | `justify-evenly` |
| `justifyStretch` | `justify-stretch` |
| `justifyBaseline` | `justify-baseline` |

## Flex Wrap

| Prop | Tailwind Class |
|------|---------------|
| `flexWrap` | `flex-wrap` |
| `flexNoWrap` | `flex-nowrap` |
| `flexWrapReverse` | `flex-wrap-reverse` |

## Width

| Prop | Tailwind Class |
|------|---------------|
| `wFull` | `w-full` |
| `wFit` | `w-fit` |
| `wAuto` | `w-auto` |
| `wScreen` | `w-screen max-w-none` |

## Height

| Prop | Tailwind Class |
|------|---------------|
| `hFull` | `h-full` |
| `hFit` | `h-fit` |
| `hAuto` | `h-auto` |
| `hScreen` | `h-screen max-h-none` |

## Position

| Prop | Tailwind Class |
|------|---------------|
| `relative` | `relative` |
| `absolute` | `absolute` |
| `fixed` | `fixed` |
| `sticky` | `sticky` |
| `static` | `static` |

## Cursor

| Prop | Tailwind Class |
|------|---------------|
| `cursorPointer` | `cursor-pointer` |
| `cursorDefault` | `cursor-default` |
| `cursorNotAllowed` | `cursor-not-allowed` |
| `cursorNone` | `cursor-none` |
| `cursorText` | `cursor-text` |
| `cursorMove` | `cursor-move` |
| `cursorWait` | `cursor-wait` |

## Pointer Events

| Prop | Tailwind Class |
|------|---------------|
| `pointerEventsNone` | `pointer-events-none` |
| `pointerEventsAuto` | `pointer-events-auto` |

## Object Fit

| Prop | Tailwind Class |
|------|---------------|
| `objectCover` | `object-cover` |
| `objectContain` | `object-contain` |
| `objectFill` | `object-fill` |
| `objectNone` | `object-none` |
| `objectScaleDown` | `object-scale-down` |

## Overflow

| Prop | Tailwind Class |
|------|---------------|
| `overflowAuto` | `overflow-auto` |
| `overflowHidden` | `overflow-hidden` |
| `overflowClip` | `overflow-clip` |
| `overflowVisible` | `overflow-visible` |
| `overflowScroll` | `overflow-scroll` |
| `overflowXAuto` | `overflow-x-auto` |
| `overflowYAuto` | `overflow-y-auto` |
| `overflowXHidden` | `overflow-x-hidden` |
| `overflowYHidden` | `overflow-y-hidden` |
| `overflowXClip` | `overflow-x-clip` |
| `overflowYClip` | `overflow-y-clip` |
| `overflowXVisible` | `overflow-x-visible` |
| `overflowYVisible` | `overflow-y-visible` |
| `overflowXScroll` | `overflow-x-scroll` |
| `overflowYScroll` | `overflow-y-scroll` |

## Text Alignment

| Prop | Tailwind Class |
|------|---------------|
| `textLeft` | `text-left` |
| `textCenter` | `text-center` |
| `textRight` | `text-right` |
| `textJustify` | `text-justify` |

## Font Weight

| Prop | Tailwind Class |
|------|---------------|
| `thin` | `font-thin` |
| `extralight` | `font-extralight` |
| `light` | `font-light` |
| `normal` | `font-normal` |
| `medium` | `font-medium` |
| `semibold` | `font-semibold` |
| `bold` | `font-bold` |
| `extrabold` | `font-extrabold` |
| `black` | `font-black` |

## Font Style / Family

| Prop | Tailwind Class |
|------|---------------|
| `italic` | `italic` |
| `notItalic` | `not-italic` |
| `sans` | `font-sans` |
| `serif` | `font-serif` |
| `mono` | `font-mono` |
| `heading` | `font-heading` |

## Text Decoration

| Prop | Tailwind Class |
|------|---------------|
| `underline` | `underline` |
| `lineThrough` | `line-through` |
| `noUnderline` | `no-underline` |
| `overline` | `overline` |

## Text Transform

| Prop | Tailwind Class |
|------|---------------|
| `uppercase` | `uppercase` |
| `lowercase` | `lowercase` |
| `capitalize` | `capitalize` |
| `normalCase` | `normal-case` |

## Truncation / Line Clamp

| Prop | Tailwind Class |
|------|---------------|
| `truncate` | `truncate` |
| `lineClamp2` | `line-clamp-2` |
| `lineClamp3` | `line-clamp-3` |
| `lineClamp4` | `line-clamp-4` |
| `lineClamp5` | `line-clamp-5` |
| `noTruncate` | `line-clamp-none` |

## Letter Spacing

| Prop | Tailwind Class |
|------|---------------|
| `trackingTighter` | `tracking-tighter` |
| `trackingTight` | `tracking-tight` |
| `trackingNormal` | `tracking-normal` |
| `trackingWide` | `tracking-wide` |
| `trackingWider` | `tracking-wider` |
| `trackingWidest` | `tracking-widest` |

## Whitespace

| Prop | Tailwind Class |
|------|---------------|
| `whitespaceNowrap` | `whitespace-nowrap` |
| `whitespaceNormal` | `whitespace-normal` |
| `whitespacePre` | `whitespace-pre` |
| `whitespacePreWrap` | `whitespace-pre-wrap` |
| `whitespacePreLine` | `whitespace-pre-line` |
| `whitespaceBreakSpaces` | `whitespace-break-spaces` |

## Borders

| Prop | Tailwind Class |
|------|---------------|
| `border` | `border-[length:var(--bw)]` |
| `borderT` | `border-t-[length:var(--bw)]` |
| `borderB` | `border-b-[length:var(--bw)]` |
| `borderL` | `border-l-[length:var(--bw)]` |
| `borderR` | `border-r-[length:var(--bw)]` |
| `borderX` | `border-x-[length:var(--bw)]` |
| `borderY` | `border-y-[length:var(--bw)]` |
| `noBorder` | (removes border) |

## Shape (Border Radius)

| Prop | Tailwind Class |
|------|---------------|
| `pill` | `rounded-full` |
| `sharp` | `rounded-none` |
| `rounded` | `rounded-(--br)` (size-driven, default) |

## Shadow / Ring / Focus

| Prop | Tailwind Class |
|------|---------------|
| `shadow` | `shadow-(--shadow-base)` |
| `noShadow` | (removes shadow) |
| `ring` | `ring-[length:var(--rw)] ring-inset` |
| `noRing` | (removes ring) |
| `focusVisible` | `focus-visible:outline-2 focus-visible:outline-offset-2` |
| `noFocusVisible` | (removes focus outline) |

## Responsive Breakpoints (Desktop-First)

| Prop | Tailwind Class |
|------|---------------|
| `mobileCol` | `max-mobile:flex-col` |
| `tabletCol` | `max-tablet:flex-col` |
| `desktopCol` | `max-desktop:flex-col` |
| `mobileHide` | `max-mobile:hidden` |
| `tabletHide` | `max-tablet:hidden` |
| `desktopHide` | `max-desktop:hidden` |

## Misc

| Prop | Tailwind Class |
|------|---------------|
| `transition` | `transition-all duration-200` |
| `noTransition` | `transition-none` |
| `blur` | `backdrop-blur-(--overlay-blur)` |
| `noBlur` | (removes blur) |
| `disc` | `list-disc` |
| `decimal` | `list-decimal` |
| `horizontal` | `h-(--bw) w-full` |
| `vertical` | `w-(--bw) h-full` |
| `transparent` | `bg-transparent` |

---

## Not Listed Here (Intentionally)

These do not map 1:1 to Tailwind utilities — they drive the CSS variable system:

- **Size**: `xs`, `sm`, `md`, `lg`, `xl` → set `--fs-unit`, `--py-unit`, `--gap-unit`, `--br-unit`
- **Appearance**: `primary`, `brand`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`, `link` → set `data-appearance` for color tokens
- **Variant**: `filled`, `outline` → set `data-variant`
- **Padding / Gap**: `padding`, `noPadding`, `gap`, `noGap` → use `px-(--px) py-(--py)` and `gap-(--gap)` (size-driven)
- **Font size**: controlled by size props via `text-(length:--fs)`

---

## When to Use `className` Anyway

`className` is still appropriate for things VaneUI props don't cover:

- Custom widths/heights beyond `full/fit/auto/screen` (e.g., `w-64`, `max-w-3xl`, `min-h-screen`)
- Positioning offsets (`top-0`, `left-4`, `inset-0`, `z-10`)
- Grid-specific utilities (`col-span-2`, `grid-cols-[...]`)
- Margin (VaneUI has no margin props — use `className="mt-4"` etc.)
- Gradients, backgrounds beyond appearance system
- Hover/focus variants not covered by component state
- `sr-only`, accessibility utilities
