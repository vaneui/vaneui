import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/** Width keys for width control */
export type WidthKey = 'wFull' | 'wFit' | 'wAuto';

export class WidthTheme extends BaseTheme implements Record<WidthKey, string> {
  /** Full width (100%) */
  wFull: string = "w-full";
  /** Fit content width */
  wFit: string = "w-fit";
  /** Auto width (default browser behavior) */
  wAuto: string = "w-auto";

  getClasses(extractedKeys: CategoryProps): string[] {
    const classes: string[] = [];

    const widthValue = extractedKeys?.width;

    if (widthValue && widthValue in this) {
      classes.push(this[widthValue as WidthKey]);
    }

    return classes;
  }
}
