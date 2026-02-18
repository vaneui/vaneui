/**
 * Disabled state for interactive components.
 * Applies reduced opacity, not-allowed cursor, and disables pointer events.
 */

export interface DisabledProps {
  /** Disable the component — reduces opacity, changes cursor to not-allowed, and prevents interaction */
  disabled?: boolean;
}
