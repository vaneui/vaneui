/** Hide on extra-small screens and up */
export const XS_HIDE = 'xsHide' as const;
/** Hide on small screens and up */
export const SM_HIDE = 'smHide' as const;
/** Hide on medium screens and up */
export const MD_HIDE = 'mdHide' as const;
/** Hide on large screens and up */
export const LG_HIDE = 'lgHide' as const;
/** Hide on extra-large screens and up */
export const XL_HIDE = 'xlHide' as const;

/** All hide property values */
export const HIDE_VALUES = [XS_HIDE, SM_HIDE, MD_HIDE, LG_HIDE, XL_HIDE] as const;