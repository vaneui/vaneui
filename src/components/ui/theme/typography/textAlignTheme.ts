import { TextAlignKey, TEXT_ALIGN_KEYS } from "../../props/keys";
import { textAlignClasses } from "../../classes/typographyClasses";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface TextAlignTheme extends Record<TextAlignKey, string> {}

export class TextAlignTheme extends BaseTheme {
  public static readonly defaultClasses: Record<TextAlignKey, string> = textAlignClasses;

  constructor(initial?: Partial<Record<TextAlignKey, string>>) {
    super();
    TEXT_ALIGN_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? TextAlignTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickFirstTruthyKey(props, defaults, TEXT_ALIGN_KEYS);
    return [key ? this[key] : '']; // No default for text align
  }
}
