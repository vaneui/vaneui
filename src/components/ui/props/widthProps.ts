/**
 * Width props for controlling component width
 */

export interface WidthProps {
  /** Set width to 100% */
  wFull?: boolean;
  /** Set width to fit-content */
  wFit?: boolean;
  /** Set width to auto */
  wAuto?: boolean;
  /** Set width to 100vw (viewport width), removes max-width constraint */
  wScreen?: boolean;
}
