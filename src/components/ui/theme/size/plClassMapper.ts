import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, PlClassKey } from "../../props";

/* Logical start padding (padding-inline-start, --pl) for List marker indent, so it flips in RTL; returns [] for noPadding. Don't write the physical padding class token in comments — Tailwind's scanner would ship a dead utility. */
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
