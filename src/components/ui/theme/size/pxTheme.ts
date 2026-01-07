import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, ResponsiveBreakpointClassKey } from "../../props";

/**
 * Horizontal padding theme - applies px using CSS variables.
 * Uses breakpoint-specific variables when responsive=true, otherwise uses simple --px variable.
 */
export class PxTheme extends BaseTheme implements Record<ResponsiveBreakpointClassKey, string> {
  /** Base: apply horizontal padding using --px (non-responsive) */
  base: string = "px-(--px)";
  /** Desktop: apply horizontal padding using --px-desktop */
  desktop: string = "px-(--px-desktop)";
  /** Tablet: apply horizontal padding using --px-tablet */
  tablet: string = "max-tablet:px-(--px-tablet)";
  /** Mobile: apply horizontal padding using --px-mobile */
  mobile: string = "max-mobile:px-(--px-mobile)";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      // Use breakpoint-specific classes if responsive=true
      if (extractedKeys?.responsive === 'responsive') {
        return [this.desktop, this.tablet, this.mobile];
      }
      // Otherwise use simple --px variable
      return [this.base];
    }
    return [];
  }
}
