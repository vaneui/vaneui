import { FontWeightKey, FONT_WEIGHT_KEYS } from "../../props/keys";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface FontWeightTheme extends Record<FontWeightKey, string> {
}

export class FontWeightTheme extends BaseTheme {
  public static readonly defaultClasses: Record<FontWeightKey, string> = {
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  };

  constructor(initial?: Partial<Record<FontWeightKey, string>>) {
    super();
    FONT_WEIGHT_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? FontWeightTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickFirstTruthyKey(props, defaults, FONT_WEIGHT_KEYS);
    return [this[key ?? 'normal'] || '']; // Default to 'normal' if no key is provided
  }
}
