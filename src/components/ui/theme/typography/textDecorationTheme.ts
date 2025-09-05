import { TextDecorationKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class TextDecorationTheme extends BaseTheme implements Record<TextDecorationKey, string> {
  underline: string = "underline";
  lineThrough: string = "line-through";
  noUnderline: string = "no-underline";
  overline: string = "overline";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.textDecoration ? this[extractedKeys.textDecoration] : ''];
  }
}
