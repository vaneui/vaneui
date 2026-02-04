import {
  TYPOGRAPHY_FULL,
  LAYOUT_FULL,
  BREAKPOINT,
  VISUAL_LAYOUT,
  PADDING,
  VARIANT,
  WIDTH,
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

/** Categories for card components with full typography and layout support */
export const CARD_CATEGORIES = [
  ...TYPOGRAPHY_FULL,
  ...LAYOUT_FULL,
  ...BREAKPOINT,
  ...VISUAL_LAYOUT,
  ...PADDING,
  ...VARIANT,
  ...WIDTH,
  ...COMMON_MODIFIERS,
] as const;
