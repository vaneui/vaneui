import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";
import { ListStyleKey } from "../../props";

export class ListStyleClassMapper extends BaseClassMapper implements Record<ListStyleKey, string> {
  /** Filled bullet — default for unordered lists */
  listDisc: string = 'list-disc';
  /** Arabic numerals — default for ordered lists */
  listDecimal: string = 'list-decimal';
  /** Hollow circle */
  listCircle: string = 'list-[circle]';
  /** Filled square */
  listSquare: string = 'list-[square]';
  /** Lowercase letters (a, b, c) */
  listLowerAlpha: string = 'list-[lower-alpha]';
  /** Lowercase roman numerals (i, ii, iii) */
  listLowerRoman: string = 'list-[lower-roman]';

  getClasses(extractedKeys: CategoryProps): string[] {
    const listStyle = extractedKeys?.listStyle;
    if (listStyle !== undefined) {
      return [this[listStyle]];
    }
    return [this.listDisc];
  }
}
