// Category building blocks shared by keys.ts and component-specific category files.

export const LAYOUT_CORE = ['size', 'hide', 'items', 'justify', 'position', 'display', 'overflow'] as const;
export const LAYOUT_FLEX = ['wrap', 'gap', 'flexDirection', 'reverse', 'flex', 'shrink'] as const;
// Per-item cross-axis alignment (align-self). Opt-in per component (not part of
// LAYOUT_CORE) so a child can override its parent's align-items.
export const ALIGN_SELF = ['alignSelf'] as const;
// Per-item inline-axis alignment within a grid area (justify-self). Opt-in.
export const JUSTIFY_SELF = ['justifySelf'] as const;
export const PADDING = ['padding'] as const;
export const BREAKPOINT = ['breakpoint'] as const;
export const VISUAL_CORE = ['appearance'] as const;
export const BORDER = ['border'] as const;
export const VISUAL_DECORATION = ['shadow', 'ring', 'focusVisible'] as const;
// Excludes focusVisible (not relevant for non-interactive layout elements)
export const VISUAL_DECORATION_LAYOUT = ['shadow', 'ring'] as const;
export const SHAPE = ['shape'] as const;
export const TEXT_ALIGN = ['textAlign'] as const;
export const TRUNCATE = ['truncate'] as const;
export const TYPOGRAPHY_STYLE_CORE = ['fontWeight', 'fontStyle', 'textDecoration', 'textTransform', 'fontFamily'] as const;
export const TYPOGRAPHY_STYLE = [...TYPOGRAPHY_STYLE_CORE, ...TEXT_ALIGN, ...TRUNCATE] as const;
export const LIST_STYLE = ['listStyle'] as const;
export const LIST_POSITION = ['listPosition'] as const;
export const GAP = ['gap'] as const;
export const VARIANT = ['variant'] as const;
export const TRANSPARENT = ['transparent'] as const;
export const RESPONSIVE = ['responsive'] as const;
export const WIDTH = ['width'] as const;
export const COMMON_MODIFIERS = [...TRANSPARENT, ...RESPONSIVE] as const;

export const CURSOR = ['cursor'] as const;
export const TRANSITION = ['transition'] as const;
export const WHITESPACE = ['whitespace'] as const;
export const HEIGHT = ['height'] as const;
export const STATUS = ['status'] as const;
export const DISABLED = ['disabled'] as const;
export const ORIENTATION = ['orientation'] as const;
export const PLACEMENT = ['placement'] as const;
export const MIN_WIDTH = ['minWidth'] as const;
export const MAX_HEIGHT = ['maxHeight'] as const;
export const INHERIT_SIZE = ['inheritSize'] as const;
export const INHERIT_COLOR = ['inheritColor'] as const;
export const INHERIT_BG = ['inheritBg'] as const;
export const INHERIT_BORDER = ['inheritBorder'] as const;

export const LAYOUT_FULL = [...LAYOUT_CORE, ...LAYOUT_FLEX] as const;
export const VISUAL_FULL = [...VISUAL_CORE, ...BORDER, ...VISUAL_DECORATION, ...SHAPE] as const;
export const VISUAL_LAYOUT = [...VISUAL_CORE, ...BORDER, ...VISUAL_DECORATION_LAYOUT, ...SHAPE] as const;
export const TYPOGRAPHY_FULL = [...TYPOGRAPHY_STYLE] as const;

// UI Element Categories (Code, Badge, Chip, Button)

export const UI_ELEMENT_CATEGORIES = [
  ...LAYOUT_FULL,
  ...VISUAL_FULL,
  ...TYPOGRAPHY_STYLE_CORE,
  ...TEXT_ALIGN,
  ...PADDING,
  ...VARIANT,
  ...CURSOR,
  ...TRANSITION,
  ...WHITESPACE,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
  ...DISABLED,
  ...INHERIT_SIZE,
] as const;

export const BADGE_CATEGORIES = UI_ELEMENT_CATEGORIES;
export const CHIP_CATEGORIES = UI_ELEMENT_CATEGORIES;
export const CODE_CATEGORIES = UI_ELEMENT_CATEGORIES;
export const BUTTON_CATEGORIES = UI_ELEMENT_CATEGORIES;

export const ICON_CATEGORIES = [
  'size', 'appearance', 'variant', 'display', 'hide', 'items', 'justify',
  'position', 'shape', 'padding', 'border', 'ring', 'shadow',
  'width', 'height', 'shrink', 'transition', 'transparent',
] as const;

// Grid excludes breakpoint/shadow/ring/textAlign — no corresponding mappers on a grid container.
// Wrap in a Card/Section if needed.
export const GRID_CATEGORIES = [
  ...LAYOUT_FULL,
  ...PADDING,
  ...VISUAL_CORE,
  ...BORDER,
  ...SHAPE,
  ...VARIANT,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
] as const;

// Container is a flex column wrapper — supports breakpoint/shadow/ring/textAlign (unlike Grid).
export const CONTAINER_CATEGORIES = [
  ...GRID_CATEGORIES,
  ...BREAKPOINT,
  ...VISUAL_DECORATION_LAYOUT,
  ...TEXT_ALIGN,
] as const;

// Adds `focusVisible` (excluded from VISUAL_DECORATION_LAYOUT by default) so
// Row/Stack can render a keyboard focus ring when href turns the tag into <a>.
// Col mirrors this in its own COL_CATEGORIES.
export const RESPONSIVE_LAYOUT_CATEGORIES = [
  ...LAYOUT_FULL,
  ...BREAKPOINT,
  ...PADDING,
  ...VISUAL_LAYOUT,
  ...VARIANT,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
  ...TEXT_ALIGN,
  'focusVisible',
] as const;

export const STACK_CATEGORIES = RESPONSIVE_LAYOUT_CATEGORIES;
export const ROW_CATEGORIES = RESPONSIVE_LAYOUT_CATEGORIES;

/** @deprecated Use UI_ELEMENT_CATEGORIES */
export const INTERACTIVE_CATEGORIES = UI_ELEMENT_CATEGORIES;
/** @deprecated Use CONTAINER_CATEGORIES */
export const BASIC_LAYOUT_CATEGORIES = CONTAINER_CATEGORIES;
/** @deprecated Use RESPONSIVE_LAYOUT_CATEGORIES */
export const FLEX_LAYOUT_CATEGORIES = RESPONSIVE_LAYOUT_CATEGORIES;
