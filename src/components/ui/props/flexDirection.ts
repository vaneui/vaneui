/** Horizontal flex direction (left to right) */
export const ROW = 'row' as const;
/** Vertical flex direction (top to bottom) */
export const COLUMN = 'column' as const;
/** Horizontal flex direction reversed (right to left) */
export const ROW_REVERSE = 'rowReverse' as const;
/** Vertical flex direction reversed (bottom to top) */
export const COLUMN_REVERSE = 'columnReverse' as const;

/** All flex direction property values */
export const FLEX_DIRECTION_VALUES = [ROW, COLUMN, ROW_REVERSE, COLUMN_REVERSE] as const;