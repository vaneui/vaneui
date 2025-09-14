import { TextDecorationKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class TextDecorationTheme extends BaseTheme implements Record<TextDecorationKey, string> {
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
