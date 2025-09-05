import { FontFamilyKey, ComponentKeys, CategoryProps } from "../../props";
import { BaseTheme } from "../common/baseTheme";

export class FontFamilyTheme extends BaseTheme implements Record<FontFamilyKey, string> {
  sans: string = "font-sans";
  serif: string = "font-serif";
  mono: string = "font-mono";

  constructor(initial?: Partial<Record<FontFamilyKey, string>>) {
    super();
    if (initial) {
      ComponentKeys.fontFamily.forEach((key) => {
        if (initial[key] !== undefined) {
          this[key] = initial[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.fontFamily ? [this[extractedKeys.fontFamily]] : [];
  }
}
