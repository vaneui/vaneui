import {
  LAYOUT_CORE,
  VISUAL_CORE,
  BORDER,
  VISUAL_DECORATION,
  SHAPE,
  VARIANT,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

/** Object fit property for images/videos */
export const OBJECT_FIT = ['objectFit'] as const;

/** Categories for image media components */
export const IMG_CATEGORIES = [...LAYOUT_CORE, ...VISUAL_CORE, ...BORDER, ...VISUAL_DECORATION, ...SHAPE, ...VARIANT, ...OBJECT_FIT, ...WIDTH, ...HEIGHT, ...COMMON_MODIFIERS] as const;
