import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, PyClassKey } from "../../props";

/**
 * Vertical padding theme - switches --py-unit via breakpoint classes.
 * CSS variable values (--py-unit-desktop/tablet/mobile) are set in vars.css.
 * The formula --py = --py-unit * --spacing is computed once in CSS.
 */
export class PyTheme extends BaseTheme implements Record<PyClassKey, string> {
  /** Desktop breakpoint unit switch */
  desktop: string = "[--py-unit:var(--py-unit-desktop)]";
  /** Tablet breakpoint unit switch */
  tablet: string = "max-tablet:[--py-unit:var(--py-unit-tablet)]";
  /** Mobile breakpoint unit switch */
  mobile: string = "max-mobile:[--py-unit:var(--py-unit-mobile)]";
  /** Consumer class */
  py: string = "py-(--py)";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      return [this.desktop, this.tablet, this.mobile, this.py];
    }
    return [];
  }
}
