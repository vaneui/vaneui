import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Vertical padding theme - outputs the consumer class py-(--py).
 * CSS variable values (--py-unit) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 *
 * When the 'responsive' prop is set, adds Tailwind classes to switch
 * between breakpoint-specific variables for automatic size adaptation.
 */
export class PyTheme extends BaseTheme {
  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      if (extractedKeys?.responsive === 'responsive') {
        return [
          "[--py-unit:var(--py-unit-desktop)]",
          "max-laptop:[--py-unit:var(--py-unit-laptop)]",
          "max-tablet:[--py-unit:var(--py-unit-tablet)]",
          "py-(--py)"
        ];
      }
      return ["py-(--py)"];
    }
    return [];
  }
}
