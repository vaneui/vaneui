import { ItemsKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

export interface ItemsTheme extends Record<ItemsKey, string> {}

export class ItemsTheme extends BaseTheme {
  public static readonly defaultClasses: Record<ItemsKey, string> = {
    itemsStart: "items-start",
    itemsEnd: "items-end",
    itemsCenter: "items-center",
    itemsBaseline: "items-baseline",
    itemsStretch: "items-stretch",
  };

  constructor(initialConfig?: Partial<Record<ItemsKey, string>>) {
    super();
    ComponentKeys.items.forEach((key) => {
      this[key as ItemsKey] = initialConfig?.[key as ItemsKey] ?? ItemsTheme.defaultClasses[key as ItemsKey];
    });
  }

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const pickedKey = extractedKeys?.items as ItemsKey;
    return [pickedKey && this[pickedKey] ? this[pickedKey] : ''];
  }
}