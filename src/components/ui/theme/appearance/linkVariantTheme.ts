import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps, VariantKey } from "../../props";

/**
 * Link-specific variant theme that handles text colors
 * using link color variables directly (not through the appearance system).
 *
 * This allows Link component colors to be customized independently
 * from primary/secondary appearance colors.
 */
export class LinkVariantTheme extends BaseTheme implements Record<VariantKey, string> {
  /** Text color for outline/default links (light backgrounds) */
  outline: string = "text-(--color-text-link)";

  /** Text color for filled links (dark backgrounds) */
  filled: string = "text-(--color-text-filled-link)";

  getClasses(extractedKeys: CategoryProps): string[] {
    // Handle transparent override
    if (extractedKeys?.transparent === 'transparent') {
      return ['text-transparent'];
    }

    const variant = extractedKeys?.variant ?? 'outline';
    return [this[variant] || ''];
  }
}
