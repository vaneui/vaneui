import { TextDecorationKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class TextDecorationClassMapper extends BaseClassMapper implements Record<TextDecorationKey, string> {
  /** Underline text decoration - line below text */
  underline: string = "underline";
  /** Line-through text decoration - strikethrough */
  lineThrough: string = "line-through";
  /** Remove underline text decoration */
  noUnderline: string = "no-underline";
  /** Overline text decoration - line above text */
  overline: string = "overline";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.textDecoration ? this[extractedKeys.textDecoration] : ''];
  }
}
