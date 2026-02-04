import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, VariantKey } from "../../props";

/**
 * Link-specific variant theme that handles text colors
 * using CSS consumer class approach.
 *
 * Link defaults to "link" appearance which provides link-specific colors
 * via CSS variable rules in vars.css.
 */
export class LinkVariantClassMapper extends BaseClassMapper implements Record<VariantKey, string> {
  /** CSS consumer class for outline variant */
  outline: string = "text-(--text-color)";

  /** CSS consumer class for filled variant */
  filled: string = "text-(--text-color)";

  getClasses(extractedKeys: CategoryProps): string[] {
    // CSS-based approach: consumer class always outputs
    // Transparent is handled via data-transparent attribute
    const variant = extractedKeys?.variant ?? 'outline';
    return [this[variant] || ''];
  }
}
