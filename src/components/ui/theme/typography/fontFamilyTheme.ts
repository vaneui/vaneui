import { FontFamilyKey, FONT_FAMILY_KEYS } from "../../props/keys";
import { fontFamilyClasses } from "../../classes/typographyClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class FontFamilyTheme extends BaseTheme {
  constructor(private classes: Record<FontFamilyKey, string> = fontFamilyClasses) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, FONT_FAMILY_KEYS);
    return [this.classes[key ?? 'sans']];
  }
}