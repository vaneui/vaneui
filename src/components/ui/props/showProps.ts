/**
 * Show props: show an element only below a breakpoint, the reverse of the hide props
 */

export interface ShowProps {
  /** Show element only on mobile, below 768px (hidden from 48rem up) */
  mobileShow?: boolean;
  /** Show element only on tablet and below, below 1024px (hidden from 64rem up) */
  tabletShow?: boolean;
  /** Show element only on desktop and below, below 1280px (hidden from 80rem up) */
  desktopShow?: boolean;
}
