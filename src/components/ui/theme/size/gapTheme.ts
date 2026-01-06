import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, GapClassKey } from "../../props";

/**
 * Gap theme - applies gap using pre-computed breakpoint variables.
 * CSS computes --gap-desktop/tablet/mobile from --gap-unit (with fallbacks for responsive overrides).
 */
export class GapTheme extends BaseTheme implements Record<GapClassKey, string> {
  /** Desktop: apply gap using --gap-desktop */
  desktop: string = "gap-(--gap-desktop)";
  /** Tablet: apply gap using --gap-tablet */
  tablet: string = "max-tablet:gap-(--gap-tablet)";
  /** Mobile: apply gap using --gap-mobile */
  mobile: string = "max-mobile:gap-(--gap-mobile)";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.gap === 'gap') {
      return [this.desktop, this.tablet, this.mobile];
    }
    return [];
  }
}
