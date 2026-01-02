import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Line height theme - only outputs the consumer class leading-(--lh).
 * CSS variable values (--lh) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 */
export class LineHeightTheme extends BaseTheme {
  getClasses(_extractedKeys: CategoryProps): string[] {
    return ["leading-(--lh)"];
  }
}
