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

/** Categories for the Th (`<th>`) header cell. */
export const TH_CATEGORIES = [
  'size',
  ...VISUAL_CORE,
  ...VARIANT,
  ...BORDER,
  ...PADDING,
  ...TEXT_ALIGN,
  'fontWeight',
  ...WIDTH,
  ...HEIGHT,
  ...RESPONSIVE,
] as const;
