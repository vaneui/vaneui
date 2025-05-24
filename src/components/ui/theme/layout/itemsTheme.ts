import { ItemsKey, ITEMS_KEYS } from "../../props/propKeys";
import { itemsClasses } from "../../classes/layoutClasses";
import { pickFirstKeyOptional } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class ItemsTheme extends BaseTheme {
  constructor(private classes: Record<ItemsKey, string> = itemsClasses) {
    super();
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    // First look for an explicit value in the real props
    const explicitKey = pickFirstKeyOptional(props, ITEMS_KEYS);

    // If none was found, check defaults
    const key = explicitKey || pickFirstKeyOptional(defaults, ITEMS_KEYS);

    return key ? [this.classes[key]] : [];
  }
}
