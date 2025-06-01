import { ItemsKey, ITEMS_KEYS } from "../../props/keys";
import { pickKey } from "../../../utils/componentUtils";
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
    const pickedKey = pickKey(props, defaults, ITEMS_KEYS);
    return [pickedKey && this[pickedKey] ? this[pickedKey] : ''];
  }

  public cloneWithOverrides(overrides: Partial<Record<ItemsKey, string>>): ItemsTheme {
    const currentValues: Partial<Record<ItemsKey, string>> = {};
    ITEMS_KEYS.forEach(key => {
      currentValues[key] = this[key];
    });
    const newInitialConfig = { ...currentValues, ...overrides };
    return new ItemsTheme(newInitialConfig);
  }
}