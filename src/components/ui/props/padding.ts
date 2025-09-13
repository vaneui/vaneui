/** Enable internal padding - uses size-responsive padding values */
export const PADDING = 'padding' as const;
/** Disable internal padding - no padding applied */
export const NO_PADDING = 'noPadding' as const;

/** All padding property values */
export const PADDING_VALUES = [PADDING, NO_PADDING] as const;