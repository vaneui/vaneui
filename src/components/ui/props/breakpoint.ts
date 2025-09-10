/** Extra-small column breakpoint - responsive grid column sizing for xs screens */
export const XS_COL = 'xsCol' as const;
/** Small column breakpoint - responsive grid column sizing for sm screens */
export const SM_COL = 'smCol' as const;
/** Medium column breakpoint - responsive grid column sizing for md screens */
export const MD_COL = 'mdCol' as const;
/** Large column breakpoint - responsive grid column sizing for lg screens */
export const LG_COL = 'lgCol' as const;
/** Extra-large column breakpoint - responsive grid column sizing for xl screens */
export const XL_COL = 'xlCol' as const;

/** All breakpoint property values */
export const BREAKPOINT_VALUES = [XS_COL, SM_COL, MD_COL, LG_COL, XL_COL] as const;