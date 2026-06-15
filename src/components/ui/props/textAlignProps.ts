/**
 * Text alignment props for controlling text position
 */

export interface TextAlignProps {
  /** Align text to left (physical side, does not flip under RTL) */
  textLeft?: boolean;
  /** Align text to center */
  textCenter?: boolean;
  /** Align text to right (physical side, does not flip under RTL) */
  textRight?: boolean;
  /** Justify text */
  textJustify?: boolean;
  /** Align text to the reading-direction start (left in LTR, right in RTL) */
  textStart?: boolean;
  /** Align text to the reading-direction end (right in LTR, left in RTL) */
  textEnd?: boolean;
}
