import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, PxClassKey } from "../../props";

/**
 * Horizontal padding theme - switches --py-unit via breakpoint classes.
 * The formula --px = --aspect-ratio * --py-unit * --spacing is computed in CSS.
 * Uses same --py-unit as PyTheme since px is derived from py.
 */
export class PxTheme extends BaseTheme implements Record<PxClassKey, string> {
  /** Switch to desktop unit (shared with py) */
  pxDesktop: string = "[--py-unit:var(--py-unit-desktop)]";
  /** Switch to tablet unit (shared with py) */
  pxTablet: string = "max-tablet:[--py-unit:var(--py-unit-tablet)]";
  /** Switch to mobile unit (shared with py) */
  pxMobile: string = "max-mobile:[--py-unit:var(--py-unit-mobile)]";
  /** Consumer class */
  px: string = "px-(--px)";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      // Note: unit switching classes are same as py, but we still emit them
      // in case px is used without py. twMerge will dedupe if both are used.
      return [this.pxDesktop, this.pxTablet, this.pxMobile, this.px];
    }
    return [];
  }
}
