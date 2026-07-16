import { VISUAL_CORE, VARIANT, COMMON_MODIFIERS } from "../props/categoryBuilders";

/** Categories for the Thead (`<thead>`) grouping wrapper. */
export const THEAD_CATEGORIES = [
  'size',
  ...VISUAL_CORE,
  ...VARIANT,
  'hide',
  ...COMMON_MODIFIERS,
] as const;
