import { TextAlignKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class TextAlignClassMapper extends BaseClassMapper implements Record<TextAlignKey, string> {
  /** Left-align text (physical — does not flip under RTL, by policy) */
  textLeft: string = "text-left";
  /** Center-align text */
  textCenter: string = "text-center";
  /** Right-align text (physical — does not flip under RTL, by policy) */
  textRight: string = "text-right";
  /** Justify text - stretch lines to fill width */
  textJustify: string = "text-justify";
  /** Align text to the reading-direction start (left in LTR, right in RTL) */
  textStart: string = "text-start";
  /** Align text to the reading-direction end (right in LTR, left in RTL) */
  textEnd: string = "text-end";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.textAlign ? this[extractedKeys.textAlign] : ''];
  }
}
