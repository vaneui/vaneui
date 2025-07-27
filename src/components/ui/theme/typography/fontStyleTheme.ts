import { FontStyleKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export interface FontStyleTheme extends Record<FontStyleKey, string> {
}

export class FontStyleTheme extends BaseTheme {
  public static readonly defaultClasses: Record<FontStyleKey, string> = {
    italic: "italic",
    notItalic: "not-italic",
  };

  constructor(initial?: Partial<Record<FontStyleKey, string>>) {
    super();
    ComponentKeys.fontStyle.forEach((key) => {
      this[key as FontStyleKey] = initial?.[key as FontStyleKey] ?? FontStyleTheme.defaultClasses[key as FontStyleKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.fontStyle;
    return [key ? this[key] : '']; // No default for font style
  }
}
