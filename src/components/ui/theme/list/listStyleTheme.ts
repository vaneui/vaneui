import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ListStyleKey, ComponentKeys } from "../../props";

export interface ListStyleTheme extends Record<ListStyleKey, string> {
}

export class ListStyleTheme extends BaseTheme {
  constructor(initial?: Partial<Record<ListStyleKey, string>>) {
    super();
    ComponentKeys.listStyle.forEach((key) => {
      this[key] = initial?.[key] ?? {
        disc: 'list-disc',
        decimal: 'list-decimal',
      }[key];
    });
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