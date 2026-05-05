import { FlexKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class FlexClassMapper extends BaseClassMapper implements Record<FlexKey, string> {
  /** Take up remaining space (1 1 0%) */
  flex1: string = "flex-1";
  /** Grow but respect intrinsic size (1 1 auto) */
  flexAuto: string = "flex-auto";
  /** Don't grow and don't shrink */
  flexNone: string = "flex-none";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.flex ? [this[extractedKeys.flex]] : [];
  }
}
