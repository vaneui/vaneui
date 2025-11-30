/**
 * Wrap props for controlling flex wrapping behavior
 */

export interface WrapProps {
  /** Allow flex items to wrap to new lines when container is too narrow */
  flexWrap?: boolean;
  /** Force flex items to stay on single line (may overflow) */
  flexNoWrap?: boolean;
  /** Wrap flex items in reverse order (last items wrap first) */
  flexWrapReverse?: boolean;
}
