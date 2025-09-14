import { FontFamilyKey, CategoryProps } from "../../props";
import { BaseTheme } from "../common/baseTheme";

export class FontFamilyTheme extends BaseTheme implements Record<FontFamilyKey, string> {
  /** Sans-serif font family - clean, modern fonts without serifs */
  sans: string = "font-sans";
  /** Serif font family - traditional fonts with serifs */
  serif: string = "font-serif";
  /** Monospace font family - fixed-width fonts for code and data */
  mono: string = "font-mono";


  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.fontFamily ? [this[extractedKeys.fontFamily]] : [];
  }
}
