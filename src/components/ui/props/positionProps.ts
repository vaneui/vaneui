/**
 * Position props for controlling CSS position property
 */

export interface PositionProps {
  /** Relative positioning */
  relative?: boolean;
  /** Absolute positioning */
  absolute?: boolean;
  /** Fixed positioning */
  fixed?: boolean;
  /** Sticky positioning */
  sticky?: boolean;
  /** Static positioning */
  static?: boolean;
}
