import { VISUAL_CORE, VARIANT, COMMON_MODIFIERS } from "../props/categoryBuilders";

/** Categories for the Tfoot (`<tfoot>`) grouping wrapper. */
export const TFOOT_CATEGORIES = [
  'size',
  ...VISUAL_CORE,
  ...VARIANT,
  'hide',
  ...COMMON_MODIFIERS,
] as const;
