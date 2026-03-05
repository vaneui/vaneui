import { OverflowClassMapper } from "../theme/layout/overflowClassMapper";
import type { CategoryProps } from "../props";

/**
 * Popup-specific overflow mapper that also applies max-height when overflow is auto.
 * When overflowAuto is set, the popup gets both `overflow-auto` and `max-h-(--popup-max-height)`.
 * This ties height constraint to scroll containment — you only need max-height when scrolling.
 * Menu popups omit overflowAuto in their defaults, so they grow to fit content.
 */
export class PopupOverflowClassMapper extends OverflowClassMapper {
  getClasses(extractedKeys: CategoryProps): string[] {
    const base = super.getClasses(extractedKeys);
    if (extractedKeys?.overflow === 'overflowAuto') {
      return [...base, 'max-h-(--popup-max-height)'];
    }
    return base;
  }
}
