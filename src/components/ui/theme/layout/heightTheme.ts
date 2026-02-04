import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, HeightKey } from "../../props";

/**
 * HeightTheme handles height styling for components.
 */
export class HeightTheme extends BaseTheme implements Record<HeightKey, string> {
  /** Height fit-content */
  hFit: string = "h-fit";
  /** Height 100% */
  hFull: string = "h-full";
  /** Height auto */
  hAuto: string = "h-auto";

  getClasses(extractedKeys: CategoryProps): string[] {
    const classes: string[] = [];

    const heightValue = extractedKeys?.height;

    if (heightValue && heightValue in this) {
      classes.push(this[heightValue as HeightKey]);
    }

    return classes;
  }
}
