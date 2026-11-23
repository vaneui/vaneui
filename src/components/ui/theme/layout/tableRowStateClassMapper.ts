import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, HoverableKey, StripedKey } from "../../props";

/**
 * Alternating body-row backgrounds. A marker class: the rule lives in the
 * stylesheet's components layer, so a row or cell fill set by a prop or a
 * class still wins.
 */
export class StripedClassMapper extends BaseClassMapper implements Record<StripedKey, string> {
  /** Every second body row takes a tint of the text color */
  striped: string = "vane-table-striped";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.striped ? [this.striped] : [];
  }
}

/**
 * Hover background on the body row under the pointer. A marker class, like
 * StripedClassMapper.
 */
export class HoverableClassMapper extends BaseClassMapper implements Record<HoverableKey, string> {
  /** The hovered body row takes a tint of the text color */
  hoverable: string = "vane-table-hoverable";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.hoverable ? [this.hoverable] : [];
  }
}
