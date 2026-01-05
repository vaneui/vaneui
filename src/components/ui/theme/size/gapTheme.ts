import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, GapClassKey } from "../../props";

/**
 * Gap theme - switches --gap-unit via breakpoint classes.
 * CSS variable values (--gap-unit-desktop/tablet/mobile) are set in vars.css.
 * The formula --gap = --gap-unit * --spacing is computed once in CSS.
 */
export class GapTheme extends BaseTheme implements Record<GapClassKey, string> {
  /** Desktop breakpoint unit switch */
  desktop: string = "[--gap-unit:var(--gap-unit-desktop)]";
  /** Tablet breakpoint unit switch */
  tablet: string = "max-tablet:[--gap-unit:var(--gap-unit-tablet)]";
  /** Mobile breakpoint unit switch */
  mobile: string = "max-mobile:[--gap-unit:var(--gap-unit-mobile)]";
  /** Consumer class */
  gap: string = "gap-(--gap)";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.gap === 'gap') {
      return [this.desktop, this.tablet, this.mobile, this.gap];
    }
    return [];
  }
}
