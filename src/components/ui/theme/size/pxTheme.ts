import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Horizontal padding theme - only outputs the consumer class px-(--px).
 * CSS variable values (--aspect-ratio, --py-unit) are now set via CSS rules
 * in vars.css using semantic classes and data attributes.
 */
export class PxTheme extends BaseTheme {
  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      return ["px-(--px)"];
    }
    return [];
  }
}
