import { TextDecorationKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

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
    ComponentKeys.textDecoration.forEach((key) => {
      this[key as TextDecorationKey] = initial?.[key as TextDecorationKey] ?? TextDecorationTheme.defaultClasses[key as TextDecorationKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.textDecoration;
    return [key ? this[key] : '']; // No default for text decoration
  }
}
