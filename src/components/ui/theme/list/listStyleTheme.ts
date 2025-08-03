import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";
import { ListStyleKey, ComponentKeys } from "../../props";

export interface ListStyleTheme extends Record<ListStyleKey, string> {
}

export class ListStyleTheme extends BaseTheme {
  constructor(initial?: Partial<Record<ListStyleKey, string>>) {
    super();
    ComponentKeys.listStyle.forEach((key) => {
      this[key as ListStyleKey] = initial?.[key as ListStyleKey] ?? this.getDefaultClass(key as ListStyleKey);
    });
  }

  private getDefaultClass(key: ListStyleKey): string {
    const defaultClasses: Record<ListStyleKey, string> = {
      disc: 'list-disc',
      decimal: 'list-decimal',
    };
    return defaultClasses[key];
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const listStyle = extractedKeys?.listStyle;
    if (listStyle !== undefined) {
      return [this[listStyle as ListStyleKey]];
    }
    // Default to disc if no list style is specified
    return [this.disc];
  }
}