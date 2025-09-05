import { HideKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class HideTheme extends BaseTheme implements Record<HideKey, string> {
  xsHide: string = "max-xs:hidden";
  smHide: string = "max-sm:hidden";
  mdHide: string = "max-md:hidden";
  lgHide: string = "max-lg:hidden";
  xlHide: string = "max-xl:hidden";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.hide ? this[extractedKeys.hide] : ''];
  }
}
