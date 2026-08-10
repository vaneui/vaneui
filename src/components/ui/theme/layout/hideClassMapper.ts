import { HideKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class HideClassMapper extends BaseClassMapper implements Record<HideKey, string> {
  /** Hide element below 768px (max-mobile: width < 48rem, exclusive — visible at 768px) */
  mobileHide: string = "max-mobile:hidden";
  /** Hide element below 1024px (max-tablet: width < 64rem, exclusive — visible at 1024px) */
  tabletHide: string = "max-tablet:hidden";
  /** Hide element below 1280px (max-desktop: width < 80rem, exclusive — visible at 1280px) */
  desktopHide: string = "max-desktop:hidden";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.hide ? this[extractedKeys.hide] : ''];
  }
}
