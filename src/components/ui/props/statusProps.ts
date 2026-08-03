/**
 * Validity props for form validation state
 *
 * Note: For success/warning validation states, use the appearance props
 * (success, warning) which provide similar visual feedback.
 */

export interface StatusProps {
  /** Mark the field invalid (red border/ring), layered over any appearance */
  invalid?: boolean;
}
