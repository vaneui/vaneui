import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, FontSizeClassKey } from "../../props";

/**
 * Font size theme - switches --fs-unit via breakpoint classes.
 * CSS variable values (--fs-unit-desktop/tablet/mobile) are set in vars.css.
 * The formula --fs = --fs-unit * --fs-base is computed once in CSS.
 */
export class FontSizeTheme extends BaseTheme implements Record<FontSizeClassKey, string> {
  /** Switch to desktop unit */
  fsDesktop: string = "[--fs-unit:var(--fs-unit-desktop)]";
  /** Switch to tablet unit */
  fsTablet: string = "max-tablet:[--fs-unit:var(--fs-unit-tablet)]";
  /** Switch to mobile unit */
  fsMobile: string = "max-mobile:[--fs-unit:var(--fs-unit-mobile)]";
  /** Consumer class */
  fontSize: string = "text-(length:--fs)";

  getClasses(_extractedKeys: CategoryProps): string[] {
    return [this.fsDesktop, this.fsTablet, this.fsMobile, this.fontSize];
  }
}
