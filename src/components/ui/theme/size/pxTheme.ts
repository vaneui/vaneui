import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, PxClassKey } from "../../props";

/**
 * Horizontal padding theme - switches --py-unit via breakpoint classes.
 * The formula --px = --aspect-ratio * --py-unit * --spacing is computed in CSS.
 * Uses same --py-unit as PyTheme since px is derived from py.
 */
export class PxTheme extends BaseTheme implements Record<PxClassKey, string> {
  /** Desktop breakpoint unit switch */
  desktop: string = "[--py-unit:var(--py-unit-desktop)]";
  /** Tablet breakpoint unit switch */
  tablet: string = "max-tablet:[--py-unit:var(--py-unit-tablet)]";
  /** Mobile breakpoint unit switch */
  mobile: string = "max-mobile:[--py-unit:var(--py-unit-mobile)]";
  /** Consumer class */
  px: string = "px-(--px)";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      // Note: unit switching classes are same as py, but we still emit them
      // in case px is used without py. twMerge will dedupe if both are used.
      return [this.desktop, this.tablet, this.mobile, this.px];
    }
    return [];
  }
}
