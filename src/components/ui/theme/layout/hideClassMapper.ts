import { HideKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class HideClassMapper extends BaseClassMapper implements Record<HideKey, string> {
  /** Hide element on mobile devices and below (max-mobile: 48rem) */
  mobileHide: string = "max-mobile:hidden";
  /** Hide element on tablet devices and below (max-tablet: 64rem) */
  tabletHide: string = "max-tablet:hidden";
  /** Hide element on desktop devices and below (max-desktop: 80rem) */
  desktopHide: string = "max-desktop:hidden";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.hide ? this[extractedKeys.hide] : ''];
  }
}
