/**
 * Inherit color props for controlling text color inheritance
 * from a parent typography ancestor via CSS variable cascade.
 */
export interface InheritColorProps {
  /** Inherit text color from parent via CSS variable cascade (suppresses data-appearance emission) */
  inheritColor?: boolean;
  /** Keep own text color; do not inherit from parent */
  noInheritColor?: boolean;
}
