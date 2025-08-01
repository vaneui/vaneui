import { TextTransformKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

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
    ComponentKeys.textTransform.forEach((key) => {
      this[key as TextTransformKey] = initial?.[key as TextTransformKey] ?? TextTransformTheme.defaultClasses[key as TextTransformKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.textTransform;
    return [key ? this[key] : '']; // No default for text transform
  }
}
