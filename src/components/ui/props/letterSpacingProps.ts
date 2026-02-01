/**
 * Letter spacing props for controlling text tracking
 */

export interface LetterSpacingProps {
  /** Tighter letter spacing (-0.05em) */
  trackingTighter?: boolean;
  /** Tight letter spacing (-0.025em) */
  trackingTight?: boolean;
  /** Normal letter spacing (0) */
  trackingNormal?: boolean;
  /** Wide letter spacing (0.025em) */
  trackingWide?: boolean;
  /** Wider letter spacing (0.05em) */
  trackingWider?: boolean;
  /** Widest letter spacing (0.1em) */
  trackingWidest?: boolean;
}
