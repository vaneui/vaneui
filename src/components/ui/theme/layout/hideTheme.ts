import { HideKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class HideTheme extends BaseTheme implements Record<HideKey, string> {
  /** Hide element on extra-small screens and below */
  xsHide: string = "max-xs:hidden";
  /** Hide element on small screens and below */
  smHide: string = "max-sm:hidden";
  /** Hide element on medium screens and below */
  mdHide: string = "max-md:hidden";
  /** Hide element on large screens and below */
  lgHide: string = "max-lg:hidden";
  /** Hide element on extra-large screens and below */
  xlHide: string = "max-xl:hidden";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.hide ? this[extractedKeys.hide] : ''];
  }
}
