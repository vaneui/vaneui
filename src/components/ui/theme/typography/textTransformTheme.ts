import { TextTransformKey, TEXT_TRANSFORM_KEYS } from "../../props/keys";
import { textTransformClasses } from "../../classes/typographyClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface TextTransformTheme extends Record<TextTransformKey, string> {}

export class TextTransformTheme extends BaseTheme {
  public static readonly defaultClasses: Record<TextTransformKey, string> = textTransformClasses;

  constructor(initial?: Partial<Record<TextTransformKey, string>>) {
    super();
    TEXT_TRANSFORM_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? TextTransformTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, TEXT_TRANSFORM_KEYS);
    return [key ? this[key] : '']; // No default for text transform
  }
}
