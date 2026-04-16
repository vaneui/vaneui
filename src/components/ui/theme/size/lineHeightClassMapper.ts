import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, LineHeightClassKey } from "../../props";

/**
 * Line height theme - outputs the consumer class leading-(--lh).
 * CSS variable values (--lh) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 * When inheritSize is active (and not overridden by responsive),
 * emits `leading-[inherit]` so line-height cascades from the parent.
 */
export class LineHeightClassMapper extends BaseClassMapper implements Record<LineHeightClassKey, string> {
  /** Consumer class for line height */
  lineHeight: string = "leading-(--lh)";
  /** Inherit: cascade line-height from nearest typography ancestor */
  inherit: string = "leading-[inherit]";

  getClasses(extractedKeys: CategoryProps): string[] {
    // Follow font-size inheritance: when inheritSize is active AND not
    // overridden by responsive sizing, inherit line-height too.
    if (extractedKeys?.inheritSize === 'inheritSize' && extractedKeys?.responsive !== 'responsive') {
      return [this.inherit];
    }
    return [this.lineHeight];
  }
}
