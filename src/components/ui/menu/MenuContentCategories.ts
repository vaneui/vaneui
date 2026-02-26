import {
  LAYOUT_FULL,
  VISUAL_LAYOUT,
  PADDING,
  SHAPE,
  VARIANT,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
  PLACEMENT,
} from "../props/categoryBuilders";

/** Categories for MenuContent components */
export const MENU_CONTENT_CATEGORIES = [
  ...LAYOUT_FULL,
  ...VISUAL_LAYOUT,
  ...PADDING,
  ...SHAPE,
  ...VARIANT,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
  ...PLACEMENT,
] as const;
