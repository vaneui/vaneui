import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";
import { bgConsumerClasses, textConsumerClass } from "../../classes/appearanceClasses";

/** Paints the appearance surface (background and text color) for the `filled` variant only.
 *  For a component whose outline look is its lines, so outline and ghost leave the surface unpainted (Table). */
export class FilledSurfaceClassMapper extends BaseClassMapper {
  filled: string = `${bgConsumerClasses.base} ${textConsumerClass}`;

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.appearance && extractedKeys.variant === 'filled' ? [this.filled] : [];
  }
}
