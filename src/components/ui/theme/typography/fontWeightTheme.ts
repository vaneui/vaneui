import { FontWeightKey, FONT_WEIGHT_KEYS } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

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

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.fontWeight as FontWeightKey;
    if (key === undefined)
      return [];

    return [this[key]];
  }
}
