import {
  LAYOUT_FULL,
  PADDING,
  VISUAL_LAYOUT,
  VARIANT,
  COMMON_MODIFIERS,
  TEXT_ALIGN,
} from "../props/categoryBuilders";

/** Categories for column layout components */
export const COL_CATEGORIES = [
  ...LAYOUT_FULL,
  ...PADDING,
  ...VISUAL_LAYOUT,
  ...VARIANT,
  ...COMMON_MODIFIERS,
  ...TEXT_ALIGN,
] as const;
