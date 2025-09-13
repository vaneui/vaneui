/** Enable drop shadow - adds size-responsive shadow styling */
export const SHADOW = 'shadow' as const;
/** Disable drop shadow - removes all shadow styling */
export const NO_SHADOW = 'noShadow' as const;

/** All shadow property values */
export const SHADOW_VALUES = [SHADOW, NO_SHADOW] as const;