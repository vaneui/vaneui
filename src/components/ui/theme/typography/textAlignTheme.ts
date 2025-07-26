import { TextAlignKey, TEXT_ALIGN_KEYS } from "../../props/keys";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

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
    TEXT_ALIGN_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? TextAlignTheme.defaultClasses[key];
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.textAlign as TextAlignKey;
    return [key ? this[key] : '']; // No default for text align
  }
}
