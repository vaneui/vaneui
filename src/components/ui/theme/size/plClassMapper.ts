import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, PlClassKey } from "../../props";

/**
 * Left padding theme — outputs `pl-(--pl)` when the padding category is set
 * to a value that should produce horizontal padding. CSS variable values
 * (`--pl-unit`) are set via CSS rules in vars.css using semantic classes
 * and data attributes.
 *
 * Used by List for bullet/number indentation. `<List noPadding>` correctly
 * removes the indent because this mapper returns `[]` for `noPadding`.
 */
export class PlClassMapper extends BaseClassMapper implements Record<PlClassKey, string> {
  /** Consumer class for left padding */
  pl: string = "pl-(--pl)";

  getClasses(extractedKeys: CategoryProps): string[] {
    const p = extractedKeys?.padding;
    // Apply pl when padding is on, when only horizontal padding is requested,
    // or when padding is unset (component-level defaults decide).
    if (p === 'padding' || p === 'paddingX' || p === undefined) {
      return [this.pl];
    }
    return [];
  }
}
