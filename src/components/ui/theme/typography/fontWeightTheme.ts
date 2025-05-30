import { FontWeightKey, FONT_WEIGHT_KEYS } from "../../props/keys";
import { fontWeightClasses } from "../../classes/typographyClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class FontWeightTheme extends BaseTheme {
  constructor(private classes: Record<FontWeightKey, string> = fontWeightClasses) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, FONT_WEIGHT_KEYS);
    return [this.classes[key ?? 'normal']]; // Default to 'normal' if no key is provided
  }
}