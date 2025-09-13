/** Extra small size - affects padding, font-size, border-radius, and spacing */
export const XS = 'xs' as const;
/** Small size - affects padding, font-size, border-radius, and spacing */
export const SM = 'sm' as const;
/** Medium size (default) - affects padding, font-size, border-radius, and spacing */
export const MD = 'md' as const;
/** Large size - affects padding, font-size, border-radius, and spacing */
export const LG = 'lg' as const;
/** Extra large size - affects padding, font-size, border-radius, and spacing */
export const XL = 'xl' as const;

/** All size property values */
export const SIZE_VALUES = [XS, SM, MD, LG, XL] as const;