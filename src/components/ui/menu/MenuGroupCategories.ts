import {
  LAYOUT_FULL,
  VISUAL_LAYOUT,
  PADDING,
  VARIANT,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

/** Categories for MenuGroup components */
export const MENU_GROUP_CATEGORIES = [
  ...LAYOUT_FULL,
  ...VISUAL_LAYOUT,
  ...PADDING,
  ...VARIANT,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
] as const;
