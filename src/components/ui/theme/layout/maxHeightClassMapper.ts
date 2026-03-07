import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

/**
 * Max-height class mapper.
 * Emits a max-height class consuming the --max-height CSS variable when maxHeight is true.
 */
export class MaxHeightClassMapper extends BaseClassMapper {
  /** Apply size-dependent maximum height */
  maxHeight: string = "max-h-(--max-height)";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.maxHeight ? [this.maxHeight] : [];
  }
}
