import { BaseClassMapper } from "../common";
import type { CategoryProps, StatusKey } from "../../props";

/**
 * StatusClassMapper handles validation status styling for form components.
 * Changes border/ring colors to indicate validation state.
 */
export class StatusClassMapper extends BaseClassMapper implements Record<StatusKey, string> {
  /** Error state - red border/ring */
  error: string = "border-red-500 ring-red-500/30 focus-visible:ring-red-500/30";

  getClasses(extractedKeys: CategoryProps): string[] {
    const classes: string[] = [];

    const statusValue = extractedKeys?.status;

    if (statusValue && statusValue in this) {
      classes.push(this[statusValue as StatusKey]);
    }

    return classes;
  }
}
