import { ItemsKey, ITEMS_KEYS } from "../../props/keys";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

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
    ITEMS_KEYS.forEach((key) => {
      this[key] = initialConfig?.[key] ?? ItemsTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const pickedKey = pickFirstTruthyKey(props, defaults, ITEMS_KEYS);
    return [pickedKey && this[pickedKey] ? this[pickedKey] : ''];
  }
}