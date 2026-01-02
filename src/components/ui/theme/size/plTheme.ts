import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Left padding theme - only outputs the consumer class pl-(--pl).
 * CSS variable values (--pl-unit) are now set via CSS rules
 * in vars.css using semantic classes and data attributes.
 */
export class PlTheme extends BaseTheme {
  getClasses(_extractedKeys: CategoryProps): string[] {
    return ["pl-(--pl)"];
  }
}
