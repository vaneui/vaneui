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

    // Check each border key and add corresponding class if prop is set
    BORDER_KEYS.forEach((borderKey) => {
      if (extractedKeys?.[borderKey] === borderKey) {
        classes.push(this[borderKey]);
      }
    });

    return classes;
  }
}
