/**
 * Shape props for controlling component border radius
 */

export interface ShapeProps {
  /** Medium rounded corners (default) */
  rounded?: boolean;
  /** Fully rounded corners (circular) */
  pill?: boolean;
  /** No rounded corners (square) */
  sharp?: boolean;
}
