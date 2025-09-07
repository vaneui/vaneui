import { TextAlignKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class TextAlignTheme extends BaseTheme implements Record<TextAlignKey, string> {
  textLeft: string = "text-left";
  textCenter: string = "text-center";
  textRight: string = "text-right";
  textJustify: string = "text-justify";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.textAlign ? this[extractedKeys.textAlign] : ''];
  }
}
