import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, GapClassKey } from "../../props";

/**
 * Gap theme - switches --gap-unit via breakpoint classes.
 * CSS variable values (--gap-unit-desktop/tablet/mobile) are set in vars.css.
 * The formula --gap = --gap-unit * --spacing is computed once in CSS.
 */
export class GapTheme extends BaseTheme implements Record<GapClassKey, string> {
  /** Switch to desktop unit */
  gapDesktop: string = "[--gap-unit:var(--gap-unit-desktop)]";
  /** Switch to tablet unit */
  gapTablet: string = "max-tablet:[--gap-unit:var(--gap-unit-tablet)]";
  /** Switch to mobile unit */
  gapMobile: string = "max-mobile:[--gap-unit:var(--gap-unit-mobile)]";
  /** Consumer class */
  gap: string = "gap-(--gap)";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.gap === 'gap') {
      return [this.gapDesktop, this.gapTablet, this.gapMobile, this.gap];
    }
    return [];
  }
}
