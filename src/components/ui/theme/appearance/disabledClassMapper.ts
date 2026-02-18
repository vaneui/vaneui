import { BaseClassMapper } from "../common";
import type { CategoryProps, DisabledKey } from "../../props";

/**
 * DisabledClassMapper handles disabled state styling for interactive components.
 * Applies reduced opacity, not-allowed cursor, and disables pointer events.
 */
export class DisabledClassMapper extends BaseClassMapper implements Record<DisabledKey, string> {
  /** Disabled state - reduced opacity, not-allowed cursor, no pointer events */
  disabled: string = "opacity-50 cursor-not-allowed pointer-events-none";

  getClasses(extractedKeys: CategoryProps): string[] {
    const value = extractedKeys?.disabled;

    if (value && value in this) {
      return [this[value as DisabledKey]];
    }

    return [];
  }
}
