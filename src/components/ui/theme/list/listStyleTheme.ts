import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ListStyleKey } from "../../props";

export class ListStyleTheme extends BaseTheme implements Record<ListStyleKey, string> {
  /** Disc list style - bullet points for unordered lists */
  disc: string = 'list-disc';
  /** Decimal list style - numbers for ordered lists */
  decimal: string = 'list-decimal';


  getClasses(extractedKeys: CategoryProps): string[] {
    const listStyle = extractedKeys?.listStyle;
    if (listStyle !== undefined) {
      return [this[listStyle]];
    }
    // Default to disc if no list style is specified
    return [this.disc];
  }
}