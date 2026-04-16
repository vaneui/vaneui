/**
 * Inherit border props for controlling border color inheritance
 * from a parent typography ancestor via CSS variable cascade.
 */
export interface InheritBorderProps {
  /** Inherit border color from parent via CSS variable cascade */
  inheritBorder?: boolean;
  /** Keep own border color; do not inherit from parent */
  noInheritBorder?: boolean;
}
