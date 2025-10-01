/** Hide element on mobile devices and below (max-mobile: 20rem) */
export const MOBILE_HIDE = 'mobileHide' as const;
/** Hide element on tablet devices and below (max-tablet: 40rem) */
export const TABLET_HIDE = 'tabletHide' as const;
/** Hide element on laptop devices and below (max-laptop: 64rem) */
export const LAPTOP_HIDE = 'laptopHide' as const;
/** Hide element on desktop devices and below (max-desktop: 80rem) */
export const DESKTOP_HIDE = 'desktopHide' as const;

/** All hide property values */
export const HIDE_VALUES = [MOBILE_HIDE, TABLET_HIDE, LAPTOP_HIDE, DESKTOP_HIDE] as const;