import { FontStyleKey, FONT_STYLE_KEYS } from "../../props/keys";
import { fontStyleClasses } from "../../classes/typographyClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class FontStyleTheme extends BaseTheme {
  constructor(private classes: Record<FontStyleKey, string> = fontStyleClasses) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, FONT_STYLE_KEYS);
    return [key ? this.classes[key] : '']; // No default for font style
  }
}