/**
 * Breakpoint props for responsive layout changes
 */

export interface BreakpointProps {
  /** Switch to column layout on mobile and below (max-mobile: 40rem) */
  mobileCol?: boolean;
  /** Switch to column layout on tablet and below (max-tablet: 48rem) */
  tabletCol?: boolean;
  /** Switch to column layout on laptop and below (max-laptop: 64rem) */
  laptopCol?: boolean;
  /** Switch to column layout on desktop and below (max-desktop: 80rem) */
  desktopCol?: boolean;
}
