import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, ResponsiveBreakpointClassKey } from "../../props";

/**
 * Font size theme - applies text size using CSS variables.
 * Uses breakpoint-specific variables when responsive=true, otherwise uses simple --fs variable.
 * When appearance="inherit", emits `text-[length:inherit]` so the element's
 * font-size cascades from its nearest typography ancestor (mirrors the color
 * inherit behavior of the outline/inherit variant).
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
    // Inherit appearance + non-responsive: cascade font-size from parent
    // (mirrors color-inherit semantics). Responsive components keep their
    // explicit viewport-scaled size since they express deliberate size intent
    // (Title, PageTitle, SectionTitle).
    if (extractedKeys?.appearance === 'inherit' && extractedKeys?.responsive !== 'responsive') {
      return [this.inherit];
    }
    // Use breakpoint-specific classes if responsive=true
    if (extractedKeys?.responsive === 'responsive') {
      return [this.desktop, this.tablet, this.mobile];
    }
    // Otherwise use simple --fs variable
    return [this.base];
  }
}
