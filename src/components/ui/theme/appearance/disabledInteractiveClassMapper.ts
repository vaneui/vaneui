import { BaseClassMapper } from "../common";
import type { CategoryProps, DisabledKey } from "../../props";

/**
 * DisabledInteractiveClassMapper applies cursor and pointer-events for disabled state.
 * Used on input elements where opacity is handled by the wrapper.
 */
export class DisabledInteractiveClassMapper extends BaseClassMapper implements Record<DisabledKey, string> {
  /** Disabled state - not-allowed cursor and no pointer events */
  disabled: string = "cursor-not-allowed pointer-events-none";

  getClasses(extractedKeys: CategoryProps): string[] {
    const value = extractedKeys?.disabled;

    if (value && value in this) {
      return [this[value as DisabledKey]];
    }

    return [];
  }
}
