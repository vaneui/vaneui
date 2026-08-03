/**
 * Constrain-width props for popup/floating components.
 * When enabled, applies a size-dependent minimum width via --popup-min-w CSS variable.
 */

export interface MinWidthProps {
  /** Constrain to a size-dependent minimum width (uses --popup-min-w CSS variable) */
  constrainWidth?: boolean;
}
