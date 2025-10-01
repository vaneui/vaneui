/** Mobile column breakpoint - switch to column layout on mobile devices (max-mobile: 20rem) */
export const MOBILE_COL = 'mobileCol' as const;
/** Tablet column breakpoint - switch to column layout on tablet devices (max-tablet: 40rem) */
export const TABLET_COL = 'tabletCol' as const;
/** Laptop column breakpoint - switch to column layout on laptop devices (max-laptop: 64rem) */
export const LAPTOP_COL = 'laptopCol' as const;
/** Desktop column breakpoint - switch to column layout on desktop devices (max-desktop: 80rem) */
export const DESKTOP_COL = 'desktopCol' as const;

/** All breakpoint property values */
export const BREAKPOINT_VALUES = [MOBILE_COL, TABLET_COL, LAPTOP_COL, DESKTOP_COL] as const;