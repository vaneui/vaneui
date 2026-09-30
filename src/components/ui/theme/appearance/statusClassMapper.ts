import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, ValidityKey } from "../../props";

/**
 * Validation-state styling for form components.
 * Changes border/ring colors to indicate an invalid field.
 */
export class StatusClassMapper extends BaseClassMapper implements Record<ValidityKey, string> {
  /** Invalid state - full-strength danger border/ring (the danger text token), readable in both themes */
  invalid: string = "border-(--color-text-danger) ring-(--color-text-danger)";

  getClasses(extractedKeys: CategoryProps): string[] {
    const classes: string[] = [];

    const value = extractedKeys?.validity;

    if (value && value in this) {
      classes.push(this[value as ValidityKey]);
    }

    return classes;
  }
}
