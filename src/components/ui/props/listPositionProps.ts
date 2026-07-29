/**
 * List position props for controlling list-style-position.
 *
 * `listInside` places markers inline with content (compact, wraps with text).
 * `listOutside` hangs markers outside the content box (traditional, aligns
 * multi-line text under the first character). Mutually exclusive.
 */
export interface ListPositionProps {
  /** Place list markers inside the content area — emits list-inside */
  listInside?: boolean;
  /** Hang list markers outside the content area — emits list-outside */
  listOutside?: boolean;
}
