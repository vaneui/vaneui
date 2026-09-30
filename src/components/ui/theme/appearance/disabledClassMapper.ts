import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, DisabledKey } from "../../props";

/**
 * DisabledClassMapper handles disabled state styling for interactive components.
 * Applies reduced opacity, not-allowed cursor, and disables pointer events.
 */
export class DisabledClassMapper extends BaseClassMapper implements Record<DisabledKey, string> {
  /** Disabled state - reduced opacity, not-allowed cursor, no pointer events */
  disabled: string = "opacity-(--disabled-opacity) cursor-not-allowed pointer-events-none";

  getClasses(extractedKeys: CategoryProps): string[] {
    const value = extractedKeys?.disabled;

    if (value && value in this) {
      return [this[value as DisabledKey]];
    }

    return [];
  }
}

/** For elements whose own semantics block activation (native disabled fields, a disabled Link): pointer events stay on, so the cursor shows. */
export class DisabledVisualClassMapper extends DisabledClassMapper {
  disabled: string = "opacity-(--disabled-opacity) cursor-not-allowed";
}
