import { FontFamilyKey, CategoryProps } from "../../props";
import { BaseTheme } from "../common/baseTheme";

export class FontFamilyTheme extends BaseTheme implements Record<FontFamilyKey, string> {
  sans: string = "font-sans";
  serif: string = "font-serif";
  mono: string = "font-mono";


  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.fontFamily ? [this[extractedKeys.fontFamily]] : [];
  }
}
