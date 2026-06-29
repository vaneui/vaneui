import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, StatusKey } from "../../props";

/**
 * StatusClassMapper handles validation status styling for form components.
 * Changes border/ring colors to indicate validation state.
 */
export class StatusClassMapper extends BaseClassMapper implements Record<StatusKey, string> {
  /** Error state - danger border/ring via tokens (adapts to dark mode) */
  error: string = "border-(--color-border-danger) ring-(--color-border-danger)/30 focus-visible:ring-(--color-border-danger)/30";

  getClasses(extractedKeys: CategoryProps): string[] {
    const classes: string[] = [];

    const statusValue = extractedKeys?.status;

    if (statusValue && statusValue in this) {
      classes.push(this[statusValue as StatusKey]);
    }

    return classes;
  }
}
