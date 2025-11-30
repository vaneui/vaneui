/**
 * Hide props for responsive element visibility
 */

export interface HideProps {
  /** Hide element on mobile devices and below (max-mobile: 20rem) */
  mobileHide?: boolean;
  /** Hide element on tablet devices and below (max-tablet: 40rem) */
  tabletHide?: boolean;
  /** Hide element on laptop devices and below (max-laptop: 64rem) */
  laptopHide?: boolean;
  /** Hide element on desktop devices and below (max-desktop: 80rem) */
  desktopHide?: boolean;
}
