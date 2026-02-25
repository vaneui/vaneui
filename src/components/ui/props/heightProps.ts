/**
 * Height props for controlling component height
 */

export interface HeightProps {
  /** Set height to fit-content */
  hFit?: boolean;
  /** Set height to 100% */
  hFull?: boolean;
  /** Set height to auto */
  hAuto?: boolean;
  /** Set height to 100vh (viewport height), removes max-height constraint */
  hScreen?: boolean;
}
