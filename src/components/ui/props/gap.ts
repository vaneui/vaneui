/** Enable spacing between flex/grid items - uses size-responsive gap values */
export const GAP = 'gap' as const;
/** Disable spacing between flex/grid items - no gap applied */
export const NO_GAP = 'noGap' as const;

/** All gap property values */
export const GAP_VALUES = [GAP, NO_GAP] as const;