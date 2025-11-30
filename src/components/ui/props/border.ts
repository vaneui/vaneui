/** Hide border - removes border styling (overrides appearance colors) */
export const NO_BORDER = 'noBorder' as const;

/** All border property values - includes all border variations and noBorder */
export const BORDER_VALUES = ['border', 'borderT', 'borderB', 'borderL', 'borderR', 'borderX', 'borderY', 'noBorder'] as const;

/** All border side keys (excluding noBorder since it doesn't have a CSS class) */
export const BORDER_KEYS = ['border', 'borderT', 'borderB', 'borderL', 'borderR', 'borderX', 'borderY'] as const;

/** Type for all border side keys (excluding noBorder) */
export type BorderKey = typeof BORDER_KEYS[number];
