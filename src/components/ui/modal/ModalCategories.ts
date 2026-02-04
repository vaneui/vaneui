import {
  TYPOGRAPHY_FULL,
  LAYOUT_FULL,
  VISUAL_LAYOUT,
  PADDING,
  SHAPE,
  VARIANT,
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

/** Categories for modal dialog components */
export const MODAL_CATEGORIES = [
  ...TYPOGRAPHY_FULL,
  ...LAYOUT_FULL,
  ...VISUAL_LAYOUT,
  ...PADDING,
  ...SHAPE,
  ...VARIANT,
  ...COMMON_MODIFIERS,
] as const;
