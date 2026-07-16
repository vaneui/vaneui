import {
  VISUAL_CORE,
  VARIANT,
  BORDER,
  PADDING,
  TEXT_ALIGN,
  WIDTH,
  HEIGHT,
  RESPONSIVE,
} from "../props/categoryBuilders";

/** Categories for the Td (`<td>`) data cell. */
export const TD_CATEGORIES = [
  'size',
  ...VISUAL_CORE,
  ...VARIANT,
  ...BORDER,
  ...PADDING,
  ...TEXT_ALIGN,
  ...WIDTH,
  ...HEIGHT,
  ...RESPONSIVE,
] as const;
