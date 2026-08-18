import {
  LAYOUT_FULL,
  PADDING,
  MARGIN,
  VISUAL_LAYOUT,
  VARIANT,
  BREAKPOINT,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
  TEXT_ALIGN,
} from "../props/categoryBuilders";

/** Field wraps a control in a column. Col's list minus `focusVisible`: Field is
 * always a div, never an anchor, so a focus ring would be a dead prop. */
export const FIELD_CATEGORIES = [
  ...LAYOUT_FULL,
  ...PADDING,
  ...MARGIN,
  ...VISUAL_LAYOUT,
  ...VARIANT,
  ...BREAKPOINT,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
  ...TEXT_ALIGN,
] as const;
