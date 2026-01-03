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
  /** Consumer class for font size */
  fontSize: string = "text-(length:--fs)";
  /** Responsive desktop unit class */
  responsiveDesktop: string = "[--fs-unit:var(--fs-unit-desktop)]";
  /** Responsive laptop unit class */
  responsiveLaptop: string = "max-laptop:[--fs-unit:var(--fs-unit-laptop)]";
  /** Responsive tablet unit class */
  responsiveTablet: string = "max-tablet:[--fs-unit:var(--fs-unit-tablet)]";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.responsive === 'responsive') {
      return [
        this.responsiveDesktop,
        this.responsiveLaptop,
        this.responsiveTablet,
        this.fontSize
      ];
    }
    return [this.fontSize];
  }
}
