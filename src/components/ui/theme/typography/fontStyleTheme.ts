import { FontStyleKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export interface FontStyleTheme extends Record<FontStyleKey, string> {
}

export class FontStyleTheme extends BaseTheme {
  constructor(initial?: Partial<Record<FontStyleKey, string>>) {
    super();
    ComponentKeys.fontStyle.forEach((key) => {
      this[key] = initial?.[key] ?? {
        italic: "italic",
        notItalic: "not-italic",
      }[key];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.fontStyle;
    return [key ? this[key] : '']; // No default for font style
  }
}
