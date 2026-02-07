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

/** Categories for divider components with basic layout and visual properties */
export const DIVIDER_CATEGORIES = [
  ...LAYOUT_CORE,
  ...VISUAL_CORE,
  ...PADDING,
  ...VARIANT,
  ...ORIENTATION,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
] as const;
