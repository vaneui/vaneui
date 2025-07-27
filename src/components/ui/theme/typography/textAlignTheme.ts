import { TextAlignKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export interface TextAlignTheme extends Record<TextAlignKey, string> {
}

export class TextAlignTheme extends BaseTheme {
  public static readonly defaultClasses: Record<TextAlignKey, string> = {
    textLeft: "text-left",
    textCenter: "text-center",
    textRight: "text-right",
    textJustify: "text-justify",
  };

  constructor(initial?: Partial<Record<TextAlignKey, string>>) {
    super();
    ComponentKeys.textAlign.forEach((key) => {
      this[key as TextAlignKey] = initial?.[key as TextAlignKey] ?? TextAlignTheme.defaultClasses[key as TextAlignKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.textAlign;
    return [key ? this[key] : '']; // No default for text align
  }
}
