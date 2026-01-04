import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, PyClassKey } from "../../props";

/**
 * Vertical padding theme - outputs the consumer class py-(--py).
 * CSS variable values (--py-unit) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 *
 * When the 'responsive' prop is set, adds Tailwind classes to switch
 * between breakpoint-specific variables for automatic size adaptation.
 */
export class PyTheme extends BaseTheme implements Record<PyClassKey, string> {
  /** Consumer class for vertical padding */
  py: string = "py-(--py)";
  /** Responsive desktop unit class */
  responsiveDesktop: string = "[--py-unit:var(--py-unit-desktop)]";
  /** Responsive laptop unit class */
  responsiveTablet: string = "max-tablet:[--py-unit:var(--py-unit-tablet)]";
  /** Responsive tablet unit class */
  responsiveMobile: string = "max-mobile:[--py-unit:var(--py-unit-mobile)]";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      if (extractedKeys?.responsive === 'responsive') {
        return [
          this.responsiveDesktop,
          this.responsiveTablet,
          this.responsiveMobile,
          this.py
        ];
      }
      return [this.py];
    }
    return [];
  }
}
