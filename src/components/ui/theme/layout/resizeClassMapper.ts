import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, ResizeKey } from "../../props";

/**
 * Resize handle of a Textarea. `autosize` sizes the box from its content, so a
 * handle would fight it: with `autosize` set the handle is always off.
 */
export class ResizeClassMapper extends BaseClassMapper implements Record<ResizeKey, string> {
  /** Drag vertically */
  resizeY: string = "resize-y";
  /** Drag horizontally */
  resizeX: string = "resize-x";
  /** Drag in both directions */
  resize: string = "resize";
  /** No handle */
  resizeNone: string = "resize-none";

  getClasses(extractedKeys: CategoryProps): string[] {
    const resize = extractedKeys?.resize;
    if (extractedKeys?.autosize) return [this.resizeNone];
    return resize ? [this[resize]] : [];
  }
}
