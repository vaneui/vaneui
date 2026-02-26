import {
  LAYOUT_CORE,
  VISUAL_CORE,
  PADDING,
  VARIANT,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
  ORIENTATION,
} from "../props/categoryBuilders";

/** Categories for MenuSeparator components */
export const MENU_SEPARATOR_CATEGORIES = [
  ...LAYOUT_CORE,
  ...VISUAL_CORE,
  ...PADDING,
  ...VARIANT,
  ...ORIENTATION,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
] as const;
