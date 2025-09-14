import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { BorderKey, BORDER_KEYS } from "../../props";

export class BorderTheme extends BaseTheme implements Record<BorderKey, string> {
  /** Show border - adds appearance-based border styling */
  border: string = "border";
  /** Show top border */
  borderT: string = "border-t";
  /** Show bottom border */
  borderB: string = "border-b";
  /** Show left border */
  borderL: string = "border-l";
  /** Show right border */
  borderR: string = "border-r";
  /** Show horizontal borders (left and right) */
  borderX: string = "border-x";
  /** Show vertical borders (top and bottom) */
  borderY: string = "border-y";

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
