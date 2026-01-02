import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Font size theme - only outputs the consumer class text-(length:--fs).
 * CSS variable values (--fs-unit) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 */
export class FontSizeTheme extends BaseTheme {
  getClasses(_extractedKeys: CategoryProps): string[] {
    return ["text-(length:--fs)"];
  }
}
