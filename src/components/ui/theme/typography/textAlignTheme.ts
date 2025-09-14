import { TextAlignKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class TextAlignTheme extends BaseTheme implements Record<TextAlignKey, string> {
  /** Left-align text */
  textLeft: string = "text-left";
  /** Center-align text */
  textCenter: string = "text-center";
  /** Right-align text */
  textRight: string = "text-right";
  /** Justify text - stretch lines to fill width */
  textJustify: string = "text-justify";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.textAlign ? this[extractedKeys.textAlign] : ''];
  }
}
