import {
  LAYOUT_CORE,
  ALIGN_SELF,
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
  DISABLED,
} from "../props/categoryBuilders";

/** Categories for checkbox form components.
 *
 * Includes `alignSelf` so the wrapper can pin itself to the top of a flex line
 * (`selfStart`), keeping the box centered on the first text row inside a Label
 * with multi-line content. */
export const CHECKBOX_CATEGORIES = [
  ...LAYOUT_CORE,
  ...ALIGN_SELF,
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
  ...DISABLED,
] as const;
