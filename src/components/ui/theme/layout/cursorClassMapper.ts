import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, CursorKey } from "../../props";

/**
 * Cursor theme for controlling cursor appearance on hover.
 */
export class CursorClassMapper extends BaseClassMapper implements Record<CursorKey, string> {
  /** Pointer cursor - indicates clickable element */
  cursorPointer: string = "cursor-pointer";
  /** Default cursor - standard arrow */
  cursorDefault: string = "cursor-default";
  /** Not-allowed cursor - indicates disabled state */
  cursorNotAllowed: string = "cursor-not-allowed";
  /** No cursor - hides the cursor */
  cursorNone: string = "cursor-none";
  /** Text cursor - indicates selectable text */
  cursorText: string = "cursor-text";
  /** Move cursor - indicates draggable element */
  cursorMove: string = "cursor-move";
  /** Wait cursor - indicates loading/processing */
  cursorWait: string = "cursor-wait";

  getClasses(extractedKeys: CategoryProps): string[] {
    const cursor = extractedKeys?.cursor;
    return cursor ? [this[cursor]] : [];
  }
}
