/** Pill shape - fully rounded corners */
export const PILL = 'pill' as const;
/** Sharp shape - no border radius */
export const SHARP = 'sharp' as const;
/** Rounded shape - medium border radius */
export const ROUNDED = 'rounded' as const;

/** All shape property values */
export const SHAPE_VALUES = [PILL, SHARP, ROUNDED] as const;