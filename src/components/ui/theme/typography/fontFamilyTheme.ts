import { FontFamilyKey, ComponentKeys, CategoryProps } from "../../props";
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
    ComponentKeys.fontFamily.forEach((key) => {
      this[key as FontFamilyKey] = initial?.[key as FontFamilyKey] ?? FontFamilyTheme.defaultClasses[key as FontFamilyKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.fontFamily;
    if (key === undefined)
      return [];

    return [this[key]];
  }
}
