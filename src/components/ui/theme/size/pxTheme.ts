import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, PxClassKey } from "../../props";

/**
 * Horizontal padding theme - applies px using pre-computed breakpoint variables.
 * CSS computes --px-desktop/tablet/mobile from --py-unit and --aspect-ratio.
 */
export class PxTheme extends BaseTheme implements Record<PxClassKey, string> {
  /** Desktop: apply horizontal padding using --px-desktop */
  desktop: string = "px-(--px-desktop)";
  /** Tablet: apply horizontal padding using --px-tablet */
  tablet: string = "max-tablet:px-(--px-tablet)";
  /** Mobile: apply horizontal padding using --px-mobile */
  mobile: string = "max-mobile:px-(--px-mobile)";

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      return [this.desktop, this.tablet, this.mobile];
    }
    return [];
  }
}
