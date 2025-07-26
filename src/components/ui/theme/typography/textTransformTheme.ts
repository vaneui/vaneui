import { TextTransformKey, TEXT_TRANSFORM_KEYS } from "../../props/keys";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

export interface TextTransformTheme extends Record<TextTransformKey, string> {
}

export class TextTransformTheme extends BaseTheme {
  public static readonly defaultClasses: Record<TextTransformKey, string> = {
    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",
    normalCase: "normal-case",
  };

  constructor(initial?: Partial<Record<TextTransformKey, string>>) {
    super();
    TEXT_TRANSFORM_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? TextTransformTheme.defaultClasses[key];
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.textTransform as TextTransformKey;
    return [key ? this[key] : '']; // No default for text transform
  }
}
