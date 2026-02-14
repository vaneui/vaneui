import { BaseClassMapper } from "../common";
import type { CategoryProps, ResponsiveBreakpointClassKey } from "../../props";

/**
 * Vertical padding theme - applies py using CSS variables.
 * Uses breakpoint-specific variables when responsive=true, otherwise uses simple --py variable.
 */
export class PyClassMapper extends BaseClassMapper implements Record<ResponsiveBreakpointClassKey, string> {
  /** Base: apply vertical padding using --py (non-responsive) */
  base: string = "py-(--py)";
  /** Desktop: apply vertical padding using --py-desktop */
  desktop: string = "py-(--py-desktop)";
  /** Tablet: apply vertical padding using --py-tablet */
  tablet: string = "max-tablet:py-(--py-tablet)";
  /** Mobile: apply vertical padding using --py-mobile */
  mobile: string = "max-mobile:py-(--py-mobile)";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      // Use breakpoint-specific classes if responsive=true
      if (extractedKeys?.responsive === 'responsive') {
        return [this.desktop, this.tablet, this.mobile];
      }
      // Otherwise use simple --py variable
      return [this.base];
    }
    return [];
  }
}
