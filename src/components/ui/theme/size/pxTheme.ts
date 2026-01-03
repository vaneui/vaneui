import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, PxClassKey } from "../../props";

/**
 * Horizontal padding theme - only outputs the consumer class px-(--px).
 * CSS variable values (--aspect-ratio, --py-unit) are now set via CSS rules
 * in vars.css using semantic classes and data attributes.
 */
export class PxTheme extends BaseTheme implements Record<PxClassKey, string> {
  /** Consumer class for horizontal padding */
  px: string = "px-(--px)";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      return [this.px];
    }
    return [];
  }
}
