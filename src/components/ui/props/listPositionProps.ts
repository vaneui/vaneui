/**
 * List position props for controlling list-style-position.
 *
 * `inside` places markers inline with content (compact, wraps with text).
 * `outside` hangs markers outside the content box (traditional, aligns
 * multi-line text under the first character). Mutually exclusive.
 */
export interface ListPositionProps {
  /** Place list markers inside the content area (list-style-position: inside) */
  inside?: boolean;
  /** Hang list markers outside the content area (list-style-position: outside) */
  outside?: boolean;
}
