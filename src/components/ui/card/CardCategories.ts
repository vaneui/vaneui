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
} from "../props/categoryBuilders";

/** Categories for card components with layout support and text alignment.
 * Adds `focusVisible` (excluded from VISUAL_DECORATION_LAYOUT by default) so
 * Card can render a keyboard focus ring when href turns the tag into `<a>`. */
export const CARD_CATEGORIES = [
  ...TEXT_ALIGN,
  ...LAYOUT_FULL,
  ...BREAKPOINT,
  ...VISUAL_LAYOUT,
  ...PADDING,
  ...MARGIN,
  ...VARIANT,
  ...WIDTH,
  ...HEIGHT,
  ...CURSOR,
  ...COMMON_MODIFIERS,
  'focusVisible',
] as const;
