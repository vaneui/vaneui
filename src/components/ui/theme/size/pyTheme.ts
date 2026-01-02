import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Vertical padding theme - only outputs the consumer class py-(--py).
 * CSS variable values (--py-unit) are now set via CSS rules
 * in vars.css using semantic classes and data attributes.
 */
export class PyTheme extends BaseTheme {
  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      return ["py-(--py)"];
    }
    return [];
  }
}
