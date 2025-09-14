import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { BorderKey, BORDER_KEYS } from "../../props";

export class BorderTheme extends BaseTheme implements Record<BorderKey, string> {
  border: string = "border";
  borderT: string = "border-t";
  borderB: string = "border-b";
  borderL: string = "border-l";
  borderR: string = "border-r";
  borderX: string = "border-x";
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
