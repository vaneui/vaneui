/** Hide element on extra-small screens and up - visible only on mobile */
export const XS_HIDE = 'xsHide' as const;
/** Hide element on small screens and up - visible only on extra-small mobile */
export const SM_HIDE = 'smHide' as const;
/** Hide element on medium screens and up - visible only on small screens and below */
export const MD_HIDE = 'mdHide' as const;
/** Hide element on large screens and up - visible only on medium screens and below */
export const LG_HIDE = 'lgHide' as const;
/** Hide element on extra-large screens and up - visible only on large screens and below */
export const XL_HIDE = 'xlHide' as const;

/** All hide property values */
export const HIDE_VALUES = [XS_HIDE, SM_HIDE, MD_HIDE, LG_HIDE, XL_HIDE] as const;