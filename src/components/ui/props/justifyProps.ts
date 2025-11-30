/**
 * Justify props for controlling flex content alignment (justify-content)
 */

export interface JustifyProps {
  /** Pack items toward the start of the main axis */
  justifyStart?: boolean;
  /** Pack items toward the end of the main axis */
  justifyEnd?: boolean;
  /** Center items along the main axis */
  justifyCenter?: boolean;
  /** Distribute items with space between them */
  justifyBetween?: boolean;
  /** Distribute items with space around them */
  justifyAround?: boolean;
  /** Distribute items with equal space around them */
  justifyEvenly?: boolean;
  /** Stretch items to fill the main axis */
  justifyStretch?: boolean;
  /** Align items along their baseline on main axis */
  justifyBaseline?: boolean;
}
