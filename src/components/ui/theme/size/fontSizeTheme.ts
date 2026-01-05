import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, FontSizeClassKey } from "../../props";

/**
 * Font size theme - switches --fs-unit via breakpoint classes.
 * CSS variable values (--fs-unit-desktop/tablet/mobile) are set in vars.css.
 * The formula --fs = --fs-unit * --fs-base is computed once in CSS.
 */
export class FontSizeTheme extends BaseTheme implements Record<FontSizeClassKey, string> {
  /** Desktop breakpoint unit switch */
  desktop: string = "[--fs-unit:var(--fs-unit-desktop)]";
  /** Tablet breakpoint unit switch */
  tablet: string = "max-tablet:[--fs-unit:var(--fs-unit-tablet)]";
  /** Mobile breakpoint unit switch */
  mobile: string = "max-mobile:[--fs-unit:var(--fs-unit-mobile)]";
  /** Consumer class */
  fontSize: string = "text-(length:--fs)";

  getClasses(_extractedKeys: CategoryProps): string[] {
    return [this.desktop, this.tablet, this.mobile, this.fontSize];
  }
}
