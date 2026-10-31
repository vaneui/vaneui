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
  /** Sticky positioning at the top edge; set --sticky-top to stick below a fixed header */
  sticky?: boolean;
  /** Static positioning */
  static?: boolean;
}
