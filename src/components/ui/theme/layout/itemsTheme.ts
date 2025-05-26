import { ItemsKey, ITEMS_KEYS } from "../../props/propKeys";
import { itemsClasses } from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class ItemsTheme implements BaseTheme {
  constructor(private classes: Record<ItemsKey, string> = itemsClasses) {
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    const key = pickKey(props, defaults, ITEMS_KEYS);
    return [key ? this.classes[key] : ''];
  }
}
