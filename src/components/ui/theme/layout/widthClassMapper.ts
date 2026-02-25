import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, WidthKey } from "../../props";

export class WidthClassMapper extends BaseClassMapper implements Record<WidthKey, string> {
  /** Full width (100%) */
  wFull: string = "w-full";
  /** Fit content width */
  wFit: string = "w-fit";
  /** Auto width (default browser behavior) */
  wAuto: string = "w-auto";
  /** Viewport width (100vw), removes max-width constraint */
  wScreen: string = "w-screen max-w-none";

  getClasses(extractedKeys: CategoryProps): string[] {
    const classes: string[] = [];

    const widthValue = extractedKeys?.width;

    if (widthValue && widthValue in this) {
      classes.push(this[widthValue as WidthKey]);
    }

    return classes;
  }
}
