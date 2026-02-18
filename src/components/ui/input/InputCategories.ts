import {
  LAYOUT_FULL,
  VISUAL_FULL,
  TYPOGRAPHY_STYLE,
  PADDING,
  VARIANT,
  CURSOR,
  TRANSITION,
  WHITESPACE,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
  STATUS,
  DISABLED,
} from "../props/categoryBuilders";

/** Categories for input form components with interactive and form-specific properties */
export const INPUT_CATEGORIES = [
  ...LAYOUT_FULL,
  ...VISUAL_FULL,
  ...TYPOGRAPHY_STYLE,
  ...PADDING,
  ...VARIANT,
  ...CURSOR,
  ...TRANSITION,
  ...WHITESPACE,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
  ...STATUS,
  ...DISABLED,
] as const;
