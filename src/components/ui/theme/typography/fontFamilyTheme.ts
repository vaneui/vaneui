import { FontFamilyKey, FONT_FAMILY_KEYS } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

export interface FontFamilyTheme extends Record<FontFamilyKey, string> {
}

export class FontFamilyTheme extends BaseTheme {
  public static readonly defaultClasses: Record<FontFamilyKey, string> = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  };

  constructor(initial?: Partial<Record<FontFamilyKey, string>>) {
    super();
    FONT_FAMILY_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? FontFamilyTheme.defaultClasses[key];
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.fontFamily as FontFamilyKey;
    if (key === undefined)
      return [];

    return [this[key]];
  }
}
