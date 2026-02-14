import { BaseClassMapper } from "../common";
import type { CategoryProps, HeightKey } from "../../props";

/**
 * HeightClassMapper handles height styling for components.
 */
export class HeightClassMapper extends BaseClassMapper implements Record<HeightKey, string> {
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
