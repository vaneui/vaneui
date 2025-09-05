import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ListStyleKey, ComponentKeys } from "../../props";

export class ListStyleTheme extends BaseTheme implements Record<ListStyleKey, string> {
  disc: string = 'list-disc';
  decimal: string = 'list-decimal';

  constructor(initial?: Partial<Record<ListStyleKey, string>>) {
    super();
    if (initial) {
      ComponentKeys.listStyle.forEach((key) => {
        if (initial[key] !== undefined) {
          this[key] = initial[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const listStyle = extractedKeys?.listStyle;
    if (listStyle !== undefined) {
      return [this[listStyle]];
    }
    // Default to disc if no list style is specified
    return [this.disc];
  }
}