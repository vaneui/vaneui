import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, FontSizeClassKey } from "../../props";

/**
 * Font size theme - applies text size using pre-computed breakpoint variables.
 * CSS computes --fs-desktop/tablet/mobile from --fs-unit (with fallbacks for responsive overrides).
 */
export class FontSizeTheme extends BaseTheme implements Record<FontSizeClassKey, string> {
  /** Desktop: apply font size using --fs-desktop */
  desktop: string = "text-(length:--fs-desktop)";
  /** Tablet: apply font size using --fs-tablet */
  tablet: string = "max-tablet:text-(length:--fs-tablet)";
  /** Mobile: apply font size using --fs-mobile */
  mobile: string = "max-mobile:text-(length:--fs-mobile)";

  getClasses(_extractedKeys: CategoryProps): string[] {
    return [this.desktop, this.tablet, this.mobile];
  }
}
