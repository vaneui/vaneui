import { ShrinkKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class ShrinkClassMapper extends BaseClassMapper implements Record<ShrinkKey, string> {
  /** Prevent the flex item from shrinking below its content size */
  noShrink: string = "shrink-0";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.shrink ? [this[extractedKeys.shrink]] : [];
  }
}
