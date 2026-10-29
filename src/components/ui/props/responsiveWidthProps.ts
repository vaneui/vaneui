/**
 * Responsive width props: full width below a breakpoint, keeping the base width above it
 */

export interface ResponsiveWidthProps {
  /** Set width to 100% on mobile, below 768px (max-mobile: 48rem) */
  mobileWFull?: boolean;
  /** Set width to 100% on tablet and below, below 1024px (max-tablet: 64rem) */
  tabletWFull?: boolean;
  /** Set width to 100% on desktop and below, below 1280px (max-desktop: 80rem) */
  desktopWFull?: boolean;
}
