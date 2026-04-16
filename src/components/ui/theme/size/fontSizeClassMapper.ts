import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, ResponsiveBreakpointClassKey } from "../../props";

/**
 * Font size theme - applies text size using CSS variables.
 * Uses breakpoint-specific variables when responsive=true, otherwise uses simple --fs variable.
 * When inheritSize flag is active (and not overridden by responsive), emits
 * `text-[length:inherit]` so the element's font-size cascades from its nearest
 * typography ancestor.
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
  /** Inherit: cascade font-size from nearest typography ancestor */
  inherit: string = "text-[length:inherit]";

  getClasses(extractedKeys: CategoryProps): string[] {
    // Responsive overrides inheritSize: responsive components have deliberate
    // viewport-scaled size intent that should not be collapsed to inherited size.
    if (extractedKeys?.responsive === 'responsive') {
      return [this.desktop, this.tablet, this.mobile];
    }
    // inheritSize flag: cascade font-size from parent (decoupled from appearance)
    if (extractedKeys?.inheritSize === 'inheritSize') {
      return [this.inherit];
    }
    // Otherwise use simple --fs variable
    return [this.base];
  }
}
