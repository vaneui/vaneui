import { FontFamilyKey, CategoryProps } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";

export class FontFamilyClassMapper extends BaseClassMapper implements Record<FontFamilyKey, string> {
  /** Sans-serif font family - clean, modern fonts without serifs */
  fontSans: string = "font-sans";
  /** Serif font family - traditional fonts with serifs */
  fontSerif: string = "font-serif";
  /** Monospace font family - fixed-width fonts for code and data */
  fontMono: string = "font-mono";
  /** Heading font family - customizable via --font-heading CSS variable, defaults to sans */
  fontHeading: string = "font-heading";


  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.fontFamily ? [this[extractedKeys.fontFamily]] : [];
  }
}
