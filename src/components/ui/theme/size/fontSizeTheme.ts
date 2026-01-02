import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Font size theme - outputs the consumer class text-(length:--fs).
 * CSS variable values (--fs-unit) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 *
 * When the 'responsive' prop is set, adds Tailwind classes to switch
 * between breakpoint-specific variables for automatic size adaptation.
 */
export class FontSizeTheme extends BaseTheme {
  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.responsive === 'responsive') {
      return [
        "[--fs-unit:var(--fs-unit-desktop)]",
        "max-laptop:[--fs-unit:var(--fs-unit-laptop)]",
        "max-tablet:[--fs-unit:var(--fs-unit-tablet)]",
        "text-(length:--fs)"
      ];
    }
    return ["text-(length:--fs)"];
  }
}
