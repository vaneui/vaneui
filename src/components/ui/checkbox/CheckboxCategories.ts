import {
  LAYOUT_CORE,
  VISUAL_CORE,
  BORDER,
  VISUAL_DECORATION,
  SHAPE,
  VARIANT,
  CURSOR,
  TRANSITION,
  STATUS,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

/** Categories for checkbox form components */
export const CHECKBOX_CATEGORIES = [
  ...LAYOUT_CORE,
  ...VISUAL_CORE,
  ...BORDER,
  ...VISUAL_DECORATION,
  ...SHAPE,
  ...VARIANT,
  ...CURSOR,
  ...TRANSITION,
  ...STATUS,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
] as const;
