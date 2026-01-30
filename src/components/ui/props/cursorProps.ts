/**
 * Cursor props for controlling cursor appearance
 */

export interface CursorProps {
  /** Pointer cursor - indicates clickable element */
  cursorPointer?: boolean;
  /** Default cursor - standard arrow */
  cursorDefault?: boolean;
  /** Not-allowed cursor - indicates disabled state */
  cursorNotAllowed?: boolean;
  /** No cursor - hides the cursor */
  cursorNone?: boolean;
  /** Text cursor - indicates selectable text */
  cursorText?: boolean;
  /** Move cursor - indicates draggable element */
  cursorMove?: boolean;
  /** Wait cursor - indicates loading/processing */
  cursorWait?: boolean;
}
