import { ItemsKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export interface ItemsTheme extends Record<ItemsKey, string> {}

export class ItemsTheme extends BaseTheme {
  constructor(initialConfig?: Partial<Record<ItemsKey, string>>) {
    super();
    ComponentKeys.items.forEach((key) => {
      this[key] = initialConfig?.[key] ?? {
        itemsStart: "items-start",
        itemsEnd: "items-end",
        itemsCenter: "items-center",
        itemsBaseline: "items-baseline",
        itemsStretch: "items-stretch",
      }[key];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const pickedKey = extractedKeys?.items;
    return [pickedKey && this[pickedKey] ? this[pickedKey] : ''];
  }
}