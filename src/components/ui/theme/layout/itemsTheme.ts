import { ItemsKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class ItemsTheme extends BaseTheme implements Record<ItemsKey, string> {
  itemsStart: string = "items-start";
  itemsEnd: string = "items-end";
  itemsCenter: string = "items-center";
  itemsBaseline: string = "items-baseline";
  itemsStretch: string = "items-stretch";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.items && this[extractedKeys.items] ? this[extractedKeys.items] : ''];
  }
}