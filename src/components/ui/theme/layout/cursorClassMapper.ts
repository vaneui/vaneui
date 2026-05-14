import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, CursorKey } from "../../props";

export class CursorClassMapper extends BaseClassMapper implements Record<CursorKey, string> {
  cursorPointer: string = "cursor-pointer";
  cursorDefault: string = "cursor-default";
  cursorNotAllowed: string = "cursor-not-allowed";
  cursorNone: string = "cursor-none";
  cursorText: string = "cursor-text";
  cursorMove: string = "cursor-move";
  cursorWait: string = "cursor-wait";

  getClasses(extractedKeys: CategoryProps): string[] {
    const cursor = extractedKeys?.cursor;
    return cursor ? [this[cursor]] : [];
  }
}
