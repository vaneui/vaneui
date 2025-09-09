/** Allow flex items to wrap to new lines */
export const FLEX_WRAP = 'flexWrap' as const;
/** Prevent flex items from wrapping (single line) */
export const FLEX_NO_WRAP = 'flexNoWrap' as const;
/** Allow flex items to wrap in reverse order */
export const FLEX_WRAP_REVERSE = 'flexWrapReverse' as const;

/** All wrap property values */
export const WRAP_VALUES = [FLEX_WRAP, FLEX_NO_WRAP, FLEX_WRAP_REVERSE] as const;