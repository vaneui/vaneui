import { VISUAL_CORE, VARIANT, COMMON_MODIFIERS } from "../props/categoryBuilders";

/** Categories for the Tbody (`<tbody>`) grouping wrapper. */
export const TBODY_CATEGORIES = [
  'size',
  ...VISUAL_CORE,
  ...VARIANT,
  'hide',
  ...COMMON_MODIFIERS,
] as const;
