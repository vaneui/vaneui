/** Show border - adds appearance-based border styling */
export const BORDER = 'border' as const;
/** Show top border */
export const BORDER_T = 'borderT' as const;
/** Show bottom border */
export const BORDER_B = 'borderB' as const;
/** Show left border */
export const BORDER_L = 'borderL' as const;
/** Show right border */
export const BORDER_R = 'borderR' as const;
/** Show horizontal borders (left and right) */
export const BORDER_X = 'borderX' as const;
/** Show vertical borders (top and bottom) */
export const BORDER_Y = 'borderY' as const;

/** Hide border - removes border styling (overrides appearance colors) */
export const NO_BORDER = 'noBorder' as const;

/** All border property values - includes all border variations and noBorder */
export const BORDER_VALUES = [BORDER, BORDER_T, BORDER_B, BORDER_L, BORDER_R, BORDER_X, BORDER_Y, NO_BORDER] as const;

/** All border side keys (excluding noBorder since it doesn't have a CSS class) */
export const BORDER_KEYS = [BORDER, BORDER_T, BORDER_B, BORDER_L, BORDER_R, BORDER_X, BORDER_Y] as const;

/** Type for all border side keys (excluding noBorder) */
export type BorderKey = typeof BORDER_KEYS[number];
