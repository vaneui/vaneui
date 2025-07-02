import { TextDecorationKey, TEXT_DECORATION_KEYS } from "../../props/keys";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface TextDecorationTheme extends Record<TextDecorationKey, string> {
}

export class TextDecorationTheme extends BaseTheme {
  public static readonly defaultClasses: Record<TextDecorationKey, string> = {
    underline: "underline",
    lineThrough: "line-through",
    noUnderline: "no-underline",
    overline: "overline",
  };

  constructor(initial?: Partial<Record<TextDecorationKey, string>>) {
    super();
    TEXT_DECORATION_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? TextDecorationTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickFirstTruthyKey(props, defaults, TEXT_DECORATION_KEYS);
    return [key ? this[key] : '']; // No default for text decoration
  }
}
