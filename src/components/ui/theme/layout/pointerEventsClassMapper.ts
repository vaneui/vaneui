import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, PointerEventsKey } from "../../props";

/**
 * Pointer events theme for controlling element interactivity.
 */
export class PointerEventsClassMapper extends BaseClassMapper implements Record<PointerEventsKey, string> {
  /** Disable pointer events - clicks pass through */
  pointerEventsNone: string = "pointer-events-none";
  /** Enable pointer events (default browser behavior) */
  pointerEventsAuto: string = "pointer-events-auto";

  getClasses(extractedKeys: CategoryProps): string[] {
    const pointerEvents = extractedKeys?.pointerEvents;
    return pointerEvents ? [this[pointerEvents]] : [];
  }
}
