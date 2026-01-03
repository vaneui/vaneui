import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Gap theme - outputs the consumer class gap-(--gap).
 * CSS variable values (--gap-unit) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 *
 * When the 'responsive' prop is set, adds Tailwind classes to switch
 * between breakpoint-specific variables for automatic size adaptation.
 */
export class GapTheme extends BaseTheme {
  /** Consumer class for gap spacing */
  gap: string = "gap-(--gap)";
  /** Responsive desktop unit class */
  responsiveDesktop: string = "[--gap-unit:var(--gap-unit-desktop)]";
  /** Responsive laptop unit class */
  responsiveLaptop: string = "max-laptop:[--gap-unit:var(--gap-unit-laptop)]";
  /** Responsive tablet unit class */
  responsiveTablet: string = "max-tablet:[--gap-unit:var(--gap-unit-tablet)]";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.gap === 'gap') {
      if (extractedKeys?.responsive === 'responsive') {
        return [
          this.responsiveDesktop,
          this.responsiveLaptop,
          this.responsiveTablet,
          this.gap
        ];
      }
      return [this.gap];
    }
    return [];
  }
}
