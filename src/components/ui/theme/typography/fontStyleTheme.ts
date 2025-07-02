import { FontStyleKey, FONT_STYLE_KEYS } from "../../props/keys";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

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

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickFirstTruthyKey(props, defaults, FONT_STYLE_KEYS);
    return [key ? this[key] : '']; // No default for font style
  }
}
