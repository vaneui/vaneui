import { FontFamilyKey, FONT_FAMILY_KEYS } from "../../props/keys";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

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

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickFirstTruthyKey(props, defaults, FONT_FAMILY_KEYS);
    return [this[key ?? 'sans'] || ''];
  }
}
