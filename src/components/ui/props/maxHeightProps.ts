/**
 * Clamp-height props for components.
 * When enabled, applies a size-dependent maximum height via --max-height CSS variable.
 */

export interface MaxHeightProps {
  /** Clamp to a size-dependent maximum height (uses --max-height CSS variable) */
  clampHeight?: boolean;
}
