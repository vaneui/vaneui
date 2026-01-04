import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, FontSizeClassKey } from "../../props";

/**
 * Font size theme - outputs the consumer class text-(length:--fs).
 * CSS variable values (--fs-unit) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 *
 * When the 'responsive' prop is set, adds Tailwind classes to switch
 * between breakpoint-specific variables for automatic size adaptation.
 */
export class FontSizeTheme extends BaseTheme implements Record<FontSizeClassKey, string> {
  /** Consumer class for font size */
  fontSize: string = "text-(length:--fs)";
  /** Responsive desktop unit class */
  responsiveDesktop: string = "[--fs-unit:var(--fs-unit-desktop)]";
  /** Responsive laptop unit class */
  responsiveTablet: string = "max-tablet:[--fs-unit:var(--fs-unit-tablet)]";
  /** Responsive tablet unit class */
  responsiveMobile: string = "max-mobile:[--fs-unit:var(--fs-unit-mobile)]";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.responsive === 'responsive') {
      return [
        this.responsiveDesktop,
        this.responsiveTablet,
        this.responsiveMobile,
        this.fontSize
      ];
    }
    return [this.fontSize];
  }
}
