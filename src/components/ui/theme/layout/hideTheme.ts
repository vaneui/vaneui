import { HideKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class HideTheme extends BaseTheme implements Record<HideKey, string> {
  /** Hide element on mobile devices and below (max-mobile: 20rem) */
  mobileHide: string = "max-mobile:hidden";
  /** Hide element on tablet devices and below (max-tablet: 40rem) */
  tabletHide: string = "max-tablet:hidden";
  /** Hide element on laptop devices and below (max-laptop: 64rem) */
  laptopHide: string = "max-laptop:hidden";
  /** Hide element on desktop devices and below (max-desktop: 80rem) */
  desktopHide: string = "max-desktop:hidden";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.hide ? this[extractedKeys.hide] : ''];
  }
}
