import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/** Status keys for validation state */
export type StatusKey = 'error';

/**
 * StatusTheme handles validation status styling for form components.
 * Changes border/ring colors to indicate validation state.
 */
export class StatusTheme extends BaseTheme implements Record<StatusKey, string> {
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
