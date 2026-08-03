/**
 * Breakpoint props for responsive layout changes
 */

export interface BreakpointProps {
  /** Stack into a column at mobile width and below (max-mobile: 48rem) */
  mobileStack?: boolean;
  /** Stack into a column at tablet width and below (max-tablet: 64rem) */
  tabletStack?: boolean;
  /** Stack into a column at desktop width and below (max-desktop: 80rem) */
  desktopStack?: boolean;
}
