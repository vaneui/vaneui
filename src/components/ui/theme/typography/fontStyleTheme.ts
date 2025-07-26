import { FontStyleKey, FONT_STYLE_KEYS } from "../../props/keys";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

export interface FontStyleTheme extends Record<FontStyleKey, string> {
}

export class FontStyleTheme extends BaseTheme {
  public static readonly defaultClasses: Record<FontStyleKey, string> = {
    italic: "italic",
    notItalic: "not-italic",
  };

  constructor(initial?: Partial<Record<FontStyleKey, string>>) {
    super();
    FONT_STYLE_KEYS.forEach((key) => {
      this[key] = initial?.[key] ?? FontStyleTheme.defaultClasses[key];
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.fontStyle as FontStyleKey;
    return [key ? this[key] : '']; // No default for font style
  }
}
