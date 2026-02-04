import {
  TYPOGRAPHY_FULL,
  LAYOUT_FULL,
  VISUAL_CORE,
  BORDER,
  VISUAL_DECORATION_LAYOUT,
  VARIANT,
  CURSOR,
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

/** Categories for label form components with typography support */
export const LABEL_CATEGORIES = [
  ...TYPOGRAPHY_FULL,
  ...LAYOUT_FULL,
  ...VISUAL_CORE,
  ...BORDER,
  ...VISUAL_DECORATION_LAYOUT,
  ...VARIANT,
  ...CURSOR,
  ...COMMON_MODIFIERS,
] as const;
