import { TextDecorationKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class TextDecorationTheme extends BaseTheme implements Record<TextDecorationKey, string> {
  underline: string = "underline";
  lineThrough: string = "line-through";
  noUnderline: string = "no-underline";
  overline: string = "overline";

  constructor(initial?: Partial<Record<TextDecorationKey, string>>) {
    super();
    if (initial) {
      ComponentKeys.textDecoration.forEach((key) => {
        if (initial[key] !== undefined) {
          this[key] = initial[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.textDecoration;
    return [key ? this[key] : '']; // No default for text decoration
  }
}
