/**
 * Hide props for responsive element visibility
 */

export interface HideProps {
  /** Hide element on mobile devices and below (max-mobile: 48rem) */
  mobileHide?: boolean;
  /** Hide element on tablet devices and below (max-tablet: 64rem) */
  tabletHide?: boolean;
  /** Hide element on desktop devices and below (max-desktop: 80rem) */
  desktopHide?: boolean;
}
