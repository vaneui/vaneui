import { ItemsKey } from "../../props";
import { BaseClassMapper } from "../common";
import type { CategoryProps } from "../../props";

export class ItemsClassMapper extends BaseClassMapper implements Record<ItemsKey, string> {
  /** Align flex items to the start of the cross axis */
  itemsStart: string = "items-start";
  /** Align flex items to the end of the cross axis */
  itemsEnd: string = "items-end";
  /** Center flex items along the cross axis */
  itemsCenter: string = "items-center";
  /** Align flex items along their baseline */
  itemsBaseline: string = "items-baseline";
  /** Stretch flex items to fill the cross axis */
  itemsStretch: string = "items-stretch";


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.items && this[extractedKeys.items] ? this[extractedKeys.items] : ''];
  }
}