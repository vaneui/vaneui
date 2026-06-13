import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, PlClassKey } from "../../props";

/**
 * Start padding theme — outputs the logical `ps-(--pl)` (padding-inline-start)
 * when the padding category is set to a value that should produce horizontal
 * padding. Logical so the indent lands on the marker side in both LTR and RTL
 * (left in LTR, right in RTL); in LTR it resolves identically to the physical
 * padding-left form. (Do not write that class literally here - Tailwind's
 * plain-text scanner generates utilities from class-shaped tokens in comments,
 * which shipped the dead physical utility alongside the logical one.)
 * CSS variable values are set via CSS rules using semantic classes and data
 * attributes (the `--pl` variable name is kept for compatibility).
 *
 * Used by List for bullet/number indentation. `<List noPadding>` correctly
 * removes the indent because this mapper returns `[]` for `noPadding`.
 */
export class PlClassMapper extends BaseClassMapper implements Record<PlClassKey, string> {
  /** Consumer class for reading-direction start padding */
  pl: string = "ps-(--pl)";

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
