import {
  TEXT_ALIGN,
  LAYOUT_FULL,
  BREAKPOINT,
  VISUAL_LAYOUT,
  PADDING,
  VARIANT,
  WIDTH,
  HEIGHT,
  CURSOR,
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

/** Categories for card components with layout support and text alignment */
export const CARD_CATEGORIES = [
  ...TEXT_ALIGN,
  ...LAYOUT_FULL,
  ...BREAKPOINT,
  ...VISUAL_LAYOUT,
  ...PADDING,
  ...VARIANT,
  ...WIDTH,
  ...HEIGHT,
  ...CURSOR,
  ...COMMON_MODIFIERS,
] as const;
