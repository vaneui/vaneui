/** Transform text to UPPERCASE */
export const UPPERCASE = 'uppercase' as const;
/** Transform text to lowercase */
export const LOWERCASE = 'lowercase' as const;
/** Transform text to Capitalize Each Word */
export const CAPITALIZE = 'capitalize' as const;
/** Normal case - no transformation */
export const NORMAL_CASE = 'normalCase' as const;

/** All text transform property values */
export const TEXT_TRANSFORM_VALUES = [UPPERCASE, LOWERCASE, CAPITALIZE, NORMAL_CASE] as const;