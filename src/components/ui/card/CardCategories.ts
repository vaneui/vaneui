import {
  TEXT_ALIGN,
  LAYOUT_FULL,
  BREAKPOINT,
  VISUAL_LAYOUT,
  PADDING,
  MARGIN,
  VARIANT,
  WIDTH,
  HEIGHT,
  CURSOR,
  COMMON_MODIFIERS,
  STRONG_BORDER,
  POINTER_EVENTS,
  WHITESPACE,
} from "../props/categoryBuilders";

/** Categories for card components with layout support and text alignment.
 * Adds `focusVisible` (excluded from VISUAL_DECORATION_LAYOUT by default) so
 * Card can render a keyboard focus ring when href turns the tag into `<a>`. */
export const CARD_CATEGORIES = [
  ...TEXT_ALIGN,
  ...LAYOUT_FULL,
  ...BREAKPOINT,
  ...VISUAL_LAYOUT,
  ...STRONG_BORDER,
  ...PADDING,
  ...MARGIN,
  ...VARIANT,
  ...WIDTH,
  ...HEIGHT,
  ...CURSOR,
  ...COMMON_MODIFIERS,
  ...POINTER_EVENTS,
  ...WHITESPACE,
  'focusVisible',
] as const;
