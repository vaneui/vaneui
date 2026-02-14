import { BaseClassMapper } from "../common";
import type { CategoryProps, LineHeightClassKey } from "../../props";

/**
 * Line height theme - only outputs the consumer class leading-(--lh).
 * CSS variable values (--lh) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 */
export class LineHeightClassMapper extends BaseClassMapper implements Record<LineHeightClassKey, string> {
  /** Consumer class for line height */
  lineHeight: string = "leading-(--lh)";

  getClasses(_extractedKeys: CategoryProps): string[] {
    return [this.lineHeight];
  }
}
