/** Pack items toward the start of the main axis */
export const JUSTIFY_START = 'justifyStart' as const;
/** Pack items toward the end of the main axis */
export const JUSTIFY_END = 'justifyEnd' as const;
/** Center items along the main axis */
export const JUSTIFY_CENTER = 'justifyCenter' as const;
/** Distribute items with space between them */
export const JUSTIFY_BETWEEN = 'justifyBetween' as const;
/** Distribute items with space around them */
export const JUSTIFY_AROUND = 'justifyAround' as const;
/** Distribute items with equal space around them */
export const JUSTIFY_EVENLY = 'justifyEvenly' as const;
/** Stretch items to fill the main axis */
export const JUSTIFY_STRETCH = 'justifyStretch' as const;
/** Align items along their baseline on main axis */
export const JUSTIFY_BASELINE = 'justifyBaseline' as const;

/** All justify property values */
export const JUSTIFY_VALUES = [JUSTIFY_START, JUSTIFY_END, JUSTIFY_CENTER, JUSTIFY_BETWEEN, JUSTIFY_AROUND, JUSTIFY_EVENLY, JUSTIFY_STRETCH, JUSTIFY_BASELINE] as const;