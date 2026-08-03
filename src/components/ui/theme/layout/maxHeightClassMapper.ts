import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

/**
 * Clamp-height class mapper.
 * Emits a max-height class consuming the --max-height CSS variable when clampHeight is true.
 */
export class MaxHeightClassMapper extends BaseClassMapper {
  /** Apply size-dependent maximum height */
  clampHeight: string = "max-h-(--max-height)";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.clampHeight ? [this.clampHeight] : [];
  }
}
