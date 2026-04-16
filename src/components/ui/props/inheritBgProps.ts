/**
 * Inherit background props for controlling background color inheritance
 * from a parent typography ancestor via CSS variable cascade.
 */
export interface InheritBgProps {
  /** Inherit background color from parent via CSS variable cascade */
  inheritBg?: boolean;
  /** Keep own background; do not inherit from parent */
  noInheritBg?: boolean;
}
