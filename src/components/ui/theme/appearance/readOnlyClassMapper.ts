import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, ReadOnlyKey } from "../../props";

/**
 * ReadOnlyClassMapper handles the read-only visual treatment for form controls.
 * Mirrors DisabledClassMapper but lighter (opacity-70 vs opacity-50) because a
 * read-only field is still focusable, selectable, and submittable. The opacity
 * and cursor live here as Tailwind classes (not a raw CSS rule) so they go
 * through the theme system like every other visual state.
 */
export class ReadOnlyClassMapper extends BaseClassMapper implements Record<ReadOnlyKey, string> {
  /** Read-only state - muted opacity + default cursor */
  readOnly: string = "opacity-70 cursor-default";

  getClasses(extractedKeys: CategoryProps): string[] {
    const value = extractedKeys?.readOnly;
    if (value && value in this) {
      return [this[value as ReadOnlyKey]];
    }
    return [];
  }
}
