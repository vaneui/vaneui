import { HideKey, ShowKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class HideClassMapper extends BaseClassMapper implements Record<HideKey | ShowKey, string> {
  /** Hide element below 768px (max-mobile: width < 48rem, exclusive — visible at 768px) */
  mobileHide: string = "max-mobile:hidden";
  /** Hide element below 1024px (max-tablet: width < 64rem, exclusive — visible at 1024px) */
  tabletHide: string = "max-tablet:hidden";
  /** Hide element below 1280px (max-desktop: width < 80rem, exclusive — visible at 1280px) */
  desktopHide: string = "max-desktop:hidden";
  /** Hide element from 768px up (mobile: width >= 48rem), so it shows only below */
  mobileShow: string = "mobile:hidden";
  /** Hide element from 1024px up (tablet: width >= 64rem), so it shows only below */
  tabletShow: string = "tablet:hidden";
  /** Hide element from 1280px up (desktop: width >= 80rem), so it shows only below */
  desktopShow: string = "desktop:hidden";

  // Hide and show are separate categories, so mobileHide tabletShow shows only between 768 and 1024px
  getClasses(extractedKeys: CategoryProps): string[] {
    return [
      extractedKeys?.hide ? this[extractedKeys.hide] : '',
      extractedKeys?.show ? this[extractedKeys.show] : '',
    ];
  }
}
