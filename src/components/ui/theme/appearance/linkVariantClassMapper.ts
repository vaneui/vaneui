import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps, VariantKey } from "../../props";

/**
 * Link-specific variant theme that reads --link-text instead of --text-color.
 *
 * --link-text is set by each variant rule (outline=blue-600, filled=blue-400,
 * ghost=blue-600) and inherits via CSS cascade. This lets a default Link
 * (no data-variant) inherit the surface-appropriate link color from the
 * nearest ancestor's variant rule. When the user explicitly sets a variant
 * (<Link filled>), the variant rule fires on Link itself and sets --link-text
 * directly — explicit always wins.
 */
export class LinkVariantClassMapper extends BaseClassMapper implements Record<VariantKey, string> {
  /** CSS consumer class for outline variant */
  outline: string = "text-(--link-text)";

  /** CSS consumer class for filled variant */
  filled: string = "text-(--link-text)";

  /** CSS consumer class for ghost variant */
  ghost: string = "text-(--link-text)";

  getClasses(extractedKeys: CategoryProps): string[] {
    // CSS-based approach: consumer class always outputs
    // Transparent is handled via data-transparent attribute
    const variant = extractedKeys?.variant ?? 'outline';
    return [this[variant] || ''];
  }
}
