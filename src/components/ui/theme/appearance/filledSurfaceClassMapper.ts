import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";
import { bgConsumerClasses, textConsumerClass } from "../../classes/appearanceClasses";

/** Paints the appearance surface (background and text color) for the `filled` variant only.
 *  For a component whose outline look is its lines, so outline and ghost leave the surface unpainted (Table, Th, Td).
 *  Only an appearance of the component's own paints: an inherited one writes no data-variant, so its
 *  colors are still the ancestor's and a cell that follows its Table would paint the Table's tint. */
export class FilledSurfaceClassMapper extends BaseClassMapper {
  filled: string = `${bgConsumerClasses.base} ${textConsumerClass}`;

  getClasses(extractedKeys: CategoryProps): string[] {
    const ownAppearance = extractedKeys?.appearance && extractedKeys.inheritColor !== 'inheritColor';
    return ownAppearance && extractedKeys.variant === 'filled' ? [this.filled] : [];
  }
}
