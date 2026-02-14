import { BaseClassMapper } from "../common";
import type { CategoryProps } from "../../props";
import { BorderKey, BORDER_KEYS } from "../../props";

export class BorderClassMapper extends BaseClassMapper implements Record<BorderKey, string> {
  /** Show border - adds appearance-based border styling */
  border: string = "border-[length:var(--bw)]";
  /** Show top border */
  borderT: string = "border-t-[length:var(--bw)]";
  /** Show bottom border */
  borderB: string = "border-b-[length:var(--bw)]";
  /** Show left border */
  borderL: string = "border-l-[length:var(--bw)]";
  /** Show right border */
  borderR: string = "border-r-[length:var(--bw)]";
  /** Show horizontal borders (left and right) */
  borderX: string = "border-x-[length:var(--bw)]";
  /** Show vertical borders (top and bottom) */
  borderY: string = "border-y-[length:var(--bw)]";

  getClasses(extractedKeys: CategoryProps): string[] {
    const classes: string[] = [];

    // Now all border variations and noBorder come through the 'border' category
    const borderValue = extractedKeys?.border;
    
    // If noBorder is selected, don't apply any border classes
    if (borderValue === "noBorder") {
      return [];
    }

    // Check if the border value matches any of our border keys (BORDER_KEYS excludes noBorder)
    if (borderValue && BORDER_KEYS.includes(borderValue as BorderKey)) {
      classes.push(this[borderValue as BorderKey]);
    }

    return classes;
  }
}
