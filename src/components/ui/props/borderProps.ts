/**
 * Border props for controlling component borders
 */

export interface BorderProps {
  /** Enable border on all sides */
  border?: boolean;
  /** Enable border on top */
  borderT?: boolean;
  /** Enable border on bottom */
  borderB?: boolean;
  /** Enable border on left */
  borderL?: boolean;
  /** Enable border on right */
  borderR?: boolean;
  /** Enable border on left and right */
  borderX?: boolean;
  /** Enable border on top and bottom */
  borderY?: boolean;
  /** Disable all borders */
  noBorder?: boolean;
}
