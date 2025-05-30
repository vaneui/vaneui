import { TextDecorationKey, TEXT_DECORATION_KEYS } from "../../props/keys";
import { textDecorationClasses } from "../../classes/typographyClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class TextDecorationTheme extends BaseTheme {
  constructor(private classes: Record<TextDecorationKey, string> = textDecorationClasses) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, TEXT_DECORATION_KEYS);
    return [key ? this.classes[key] : '']; // No default for text decoration
  }
}