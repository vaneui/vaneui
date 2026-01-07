import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, ResponsiveBreakpointClassKey } from "../../props";

/**
 * Gap theme - applies gap using CSS variables.
 * Uses breakpoint-specific variables when responsive=true, otherwise uses simple --gap variable.
 */
export class GapTheme extends BaseTheme implements Record<ResponsiveBreakpointClassKey, string> {
  /** Base: apply gap using --gap (non-responsive) */
  base: string = "gap-(--gap)";
  /** Desktop: apply gap using --gap-desktop */
  desktop: string = "gap-(--gap-desktop)";
  /** Tablet: apply gap using --gap-tablet */
  tablet: string = "max-tablet:gap-(--gap-tablet)";
  /** Mobile: apply gap using --gap-mobile */
  mobile: string = "max-mobile:gap-(--gap-mobile)";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.gap === 'gap') {
      // Use breakpoint-specific classes if responsive=true
      if (extractedKeys?.responsive === 'responsive') {
        return [this.desktop, this.tablet, this.mobile];
      }
      // Otherwise use simple --gap variable
      return [this.base];
    }
    return [];
  }
}
