import { FontFamilyKey, ComponentKeys, CategoryProps } from "../../props";
import { BaseTheme } from "../common/baseTheme";

export interface FontFamilyTheme extends Record<FontFamilyKey, string> {
}

export class FontFamilyTheme extends BaseTheme {
  constructor(initial?: Partial<Record<FontFamilyKey, string>>) {
    super();
    ComponentKeys.fontFamily.forEach((key) => {
      this[key] = initial?.[key] ?? {
        sans: "font-sans",
        serif: "font-serif",
        mono: "font-mono",
      }[key];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.fontFamily;
    if (key === undefined)
      return [];

    return [this[key]];
  }
}
