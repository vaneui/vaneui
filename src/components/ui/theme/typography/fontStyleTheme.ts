import { FontStyleKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class FontStyleTheme extends BaseTheme implements Record<FontStyleKey, string> {
  italic: string = "italic";
  notItalic: string = "not-italic";

  constructor(initial?: Partial<Record<FontStyleKey, string>>) {
    super();
    if (initial) {
      ComponentKeys.fontStyle.forEach((key) => {
        if (initial[key] !== undefined) {
          this[key] = initial[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.fontStyle;
    return [key ? this[key] : '']; // No default for font style
  }
}
