import { TextAlignKey, TEXT_ALIGN_KEYS } from "../../props/keys";
import { textAlignClasses } from "../../classes/typographyClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class TextAlignTheme extends BaseTheme {
  constructor(private classes: Record<TextAlignKey, string> = textAlignClasses) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, TEXT_ALIGN_KEYS);
    return [key ? this.classes[key] : '']; // No default for text align
  }
}