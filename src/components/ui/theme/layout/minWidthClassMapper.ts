import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

/**
 * Constrain-width class mapper for popup/floating components.
 * Emits a min-width class consuming the --popup-min-w CSS variable when constrainWidth is true.
 */
export class MinWidthClassMapper extends BaseClassMapper {
  /** Apply size-dependent minimum width */
  constrainWidth: string = "min-w-(--popup-min-w)";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.constrainWidth ? [this.constrainWidth] : [];
  }
}
