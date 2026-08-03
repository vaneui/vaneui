import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, ValidityKey } from "../../props";

/**
 * Validation-state styling for form components.
 * Changes border/ring colors to indicate an invalid field.
 */
export class StatusClassMapper extends BaseClassMapper implements Record<ValidityKey, string> {
  /** Invalid state - danger border/ring via tokens (adapts to dark mode) */
  invalid: string = "border-(--color-border-danger) ring-(--color-border-danger)/30 focus-visible:ring-(--color-border-danger)/30";

  getClasses(extractedKeys: CategoryProps): string[] {
    const classes: string[] = [];

    const value = extractedKeys?.validity;

    if (value && value in this) {
      classes.push(this[value as ValidityKey]);
    }

    return classes;
  }
}
