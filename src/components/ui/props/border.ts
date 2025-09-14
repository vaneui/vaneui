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

/** All border property values */
export const BORDER_VALUES = [BORDER] as const;
/** All borderT property values */
export const BORDER_T_VALUES = [BORDER_T] as const;
/** All borderB property values */
export const BORDER_B_VALUES = [BORDER_B] as const;
/** All borderL property values */
export const BORDER_L_VALUES = [BORDER_L] as const;
/** All borderR property values */
export const BORDER_R_VALUES = [BORDER_R] as const;
/** All borderX property values */
export const BORDER_X_VALUES = [BORDER_X] as const;
/** All borderY property values */
export const BORDER_Y_VALUES = [BORDER_Y] as const;
/** All noBorder property values */
export const NO_BORDER_VALUES = [NO_BORDER] as const;

/** All border side keys */
export const BORDER_KEYS = [BORDER, BORDER_T, BORDER_B, BORDER_L, BORDER_R, BORDER_X, BORDER_Y] as const;

/** Type for all border side keys */
export type BorderKey = typeof BORDER_KEYS[number];