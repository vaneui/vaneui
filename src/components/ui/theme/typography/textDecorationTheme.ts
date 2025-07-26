import { TextDecorationKey, TEXT_DECORATION_KEYS } from "../../props/keys";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

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

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.textDecoration as TextDecorationKey;
    return [key ? this[key] : '']; // No default for text decoration
  }
}
