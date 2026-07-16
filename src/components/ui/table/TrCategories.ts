import { VISUAL_CORE, VARIANT, COMMON_MODIFIERS } from "../props/categoryBuilders";

/** Categories for the Tr (`<tr>`) row wrapper. */
export const TR_CATEGORIES = [
  'size',
  ...VISUAL_CORE,
  ...VARIANT,
  'hide',
  ...COMMON_MODIFIERS,
] as const;
