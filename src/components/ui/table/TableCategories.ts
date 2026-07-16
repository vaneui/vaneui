import {
  VISUAL_CORE,
  VARIANT,
  BORDER,
  WIDTH,
  MARGIN,
  TEXT_ALIGN,
  RESPONSIVE,
} from "../props/categoryBuilders";

// No `shape`: border-radius has no effect on a border-collapse table, so the
// rounded/pill/sharp props would be silently inert.
/** Categories for the Table (`<table>`) component. */
export const TABLE_CATEGORIES = [
  'size',
  ...VISUAL_CORE,
  ...VARIANT,
  ...BORDER,
  ...WIDTH,
  ...MARGIN,
  ...TEXT_ALIGN,
  'hide',
  ...RESPONSIVE,
] as const;
