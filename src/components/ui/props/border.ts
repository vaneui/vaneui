/** Show border - adds appearance-based border styling */
export const BORDER = 'border' as const;
/** Hide border - removes border styling (overrides appearance colors) */
export const NO_BORDER = 'noBorder' as const;

/** All border property values */
export const BORDER_VALUES = [BORDER, NO_BORDER] as const;