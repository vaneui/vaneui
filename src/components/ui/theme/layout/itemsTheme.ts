import { ItemsKey, ITEMS_KEYS } from "../../props/propKeys";
import { itemsClasses } from "../../classes/layoutClasses";
import { pickFirstKeyOptional } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class ItemsTheme extends BaseTheme {
  constructor(private classes: Record<ItemsKey, string> = itemsClasses) {
    super();
  }

  getClasses(props: Record<string, any>): string[] {
    const key = pickFirstKeyOptional(props, ITEMS_KEYS);
    return key ? [this.classes[key]] : [];
  }
}
