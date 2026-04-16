/**
 * Inherit size props for controlling font-size and line-height inheritance
 * from a parent typography ancestor.
 */
export interface InheritSizeProps {
  /** Inherit font-size and line-height from the nearest parent typography element */
  inheritSize?: boolean;
  /** Keep own font-size; do not inherit from parent */
  noInheritSize?: boolean;
}
