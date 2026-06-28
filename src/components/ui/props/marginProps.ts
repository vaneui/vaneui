/**
 * Margin props for controlling external spacing.
 * The value is size-driven (scales with the component's size prop, like gap).
 */

export interface MarginProps {
  /** Enable margin on all sides */
  margin?: boolean;
  /** Enable only horizontal (inline) margin */
  marginX?: boolean;
  /** Enable only vertical (block) margin */
  marginY?: boolean;
  /** Disable margin (reset to 0) */
  noMargin?: boolean;
}
