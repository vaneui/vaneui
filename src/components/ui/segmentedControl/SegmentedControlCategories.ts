import { LAYOUT_CORE, VISUAL_CORE, VARIANT, SHAPE, PADDING, MARGIN, WIDTH, TYPOGRAPHY_STYLE_CORE } from "../props/categoryBuilders";

/** Categories for the SegmentedControl track (`role="radiogroup"`). Its size, appearance, variant
 *  and shape also reach its segments; the track itself stays a neutral surface. */
export const SEGMENTED_CONTROL_CATEGORIES = [
  ...LAYOUT_CORE,
  ...VISUAL_CORE,
  ...VARIANT,
  ...SHAPE,
  ...PADDING,
  ...MARGIN,
  ...WIDTH,
] as const;

/** Categories for one segment (a `<label>` around a native radio) */
export const SEGMENTED_CONTROL_ITEM_CATEGORIES = [
  ...LAYOUT_CORE,
  ...VISUAL_CORE,
  ...VARIANT,
  ...SHAPE,
  ...PADDING,
  'gap',
  ...TYPOGRAPHY_STYLE_CORE,
  'cursor',
  'transition',
  'whitespace',
  'disabled',
] as const;
