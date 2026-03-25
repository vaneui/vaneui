import { FontFamilyKey, CategoryProps } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";

export class FontFamilyClassMapper extends BaseClassMapper implements Record<FontFamilyKey, string> {
  /** Sans-serif font family - clean, modern fonts without serifs */
  sans: string = "font-sans";
  /** Serif font family - traditional fonts with serifs */
  serif: string = "font-serif";
  /** Monospace font family - fixed-width fonts for code and data */
  mono: string = "font-mono";
  /** Heading font family - customizable via --font-heading CSS variable, defaults to sans */
  heading: string = "font-heading";


  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.fontFamily ? [this[extractedKeys.fontFamily]] : [];
  }
}
