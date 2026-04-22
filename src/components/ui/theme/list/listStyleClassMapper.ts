import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";
import { ListStyleKey } from "../../props";

export class ListStyleClassMapper extends BaseClassMapper implements Record<ListStyleKey, string> {
  /** Filled bullet — default for unordered lists */
  disc: string = 'list-disc';
  /** Arabic numerals — default for ordered lists */
  decimal: string = 'list-decimal';
  /** Hollow circle */
  circle: string = 'list-[circle]';
  /** Filled square */
  square: string = 'list-[square]';
  /** Lowercase letters (a, b, c) */
  lowerAlpha: string = 'list-[lower-alpha]';
  /** Lowercase roman numerals (i, ii, iii) */
  lowerRoman: string = 'list-[lower-roman]';

  getClasses(extractedKeys: CategoryProps): string[] {
    const listStyle = extractedKeys?.listStyle;
    if (listStyle !== undefined) {
      return [this[listStyle]];
    }
    return [this.disc];
  }
}
