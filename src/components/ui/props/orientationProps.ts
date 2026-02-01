/**
 * Orientation props for horizontal/vertical layout
 *
 * Used by components like Divider that can be oriented in different directions.
 */

export interface OrientationProps {
  /** Display as a horizontal line (default) */
  horizontal?: boolean;
  /** Display as a vertical line instead of horizontal */
  vertical?: boolean;
}
