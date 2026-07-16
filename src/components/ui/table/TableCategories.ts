import {
  VISUAL_CORE,
  VARIANT,
  SHAPE,
  BORDER,
  WIDTH,
  MARGIN,
  TEXT_ALIGN,
  RESPONSIVE,
} from "../props/categoryBuilders";

/** Categories for the Table (`<table>`) component. */
export const TABLE_CATEGORIES = [
  'size',
  ...VISUAL_CORE,
  ...VARIANT,
  ...SHAPE,
  ...BORDER,
  ...WIDTH,
  ...MARGIN,
  ...TEXT_ALIGN,
  'hide',
  ...RESPONSIVE,
] as const;
