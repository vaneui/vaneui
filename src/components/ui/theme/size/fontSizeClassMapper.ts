import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, ResponsiveBreakpointClassKey } from "../../props";

/**
 * Font size theme - applies text size using CSS variables.
 * Uses breakpoint-specific variables when responsive=true, otherwise uses simple --fs variable.
 */
export class FontSizeClassMapper extends BaseClassMapper implements Record<ResponsiveBreakpointClassKey, string> {
  /** Base: apply font size using --fs (non-responsive) */
  base: string = "text-(length:--fs)";
  /** Desktop: apply font size using --fs-desktop */
  desktop: string = "text-(length:--fs-desktop)";
  /** Tablet: apply font size using --fs-tablet */
  tablet: string = "max-tablet:text-(length:--fs-tablet)";
  /** Mobile: apply font size using --fs-mobile */
  mobile: string = "max-mobile:text-(length:--fs-mobile)";

  getClasses(extractedKeys: CategoryProps): string[] {
    // Use breakpoint-specific classes if responsive=true
    if (extractedKeys?.responsive === 'responsive') {
      return [this.desktop, this.tablet, this.mobile];
    }
    // Otherwise use simple --fs variable
    return [this.base];
  }
}
