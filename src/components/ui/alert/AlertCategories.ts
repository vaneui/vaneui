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
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

/** Card's list without cursor/focusVisible: an Alert is a surface, never a link. */
export const ALERT_CATEGORIES = [
  ...TEXT_ALIGN,
  ...LAYOUT_FULL,
  ...BREAKPOINT,
  ...VISUAL_LAYOUT,
  ...PADDING,
  ...MARGIN,
  ...VARIANT,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
] as const;
