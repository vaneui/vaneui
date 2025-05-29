import { ItemsKey, ITEMS_KEYS } from "../../props/propKeys";
import { itemsClasses } from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class ItemsTheme extends BaseTheme {
  constructor(private classes: Record<ItemsKey, string> = itemsClasses) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, ITEMS_KEYS);
    return [key ? this.classes[key] : ''];
  }
}
