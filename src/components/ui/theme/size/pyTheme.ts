import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, PyClassKey } from "../../props";

/**
 * Vertical padding theme - applies py using pre-computed breakpoint variables.
 * CSS computes --py-desktop/tablet/mobile from --py-unit (with fallbacks for responsive overrides).
 */
export class PyTheme extends BaseTheme implements Record<PyClassKey, string> {
  /** Desktop: apply vertical padding using --py-desktop */
  desktop: string = "py-(--py-desktop)";
  /** Tablet: apply vertical padding using --py-tablet */
  tablet: string = "max-tablet:py-(--py-tablet)";
  /** Mobile: apply vertical padding using --py-mobile */
  mobile: string = "max-mobile:py-(--py-mobile)";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      return [this.desktop, this.tablet, this.mobile];
    }
    return [];
  }
}
