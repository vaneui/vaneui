import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

/**
 * Link-specific appearance mapper.
 *
 * When the resolved appearance is `'link'` (the default), emits
 * `text-(--link-text)` so the link color comes from the cascading
 * `--link-text` CSS variable. That variable is set per-variant by
 * CSS rules and can also be overridden by ancestor variant rules —
 * this is what lets a default `<Link>` inside a `<Card filled>` pick
 * up a surface-appropriate link color via cascade.
 *
 * When the consumer sets any other appearance (`primary`, `success`,
 * `danger`, …), emits `text-(--app-text)` — the variable is set
 * directly by `[data-appearance="..."]` CSS rules, so it does not
 * require `data-variant` to be present on the element. (Link has no
 * default variant, so the standard `--text-color` path — which is
 * mapped from `--app-text` only by the variant rule — would leave
 * the link inheriting the `:root` baseline color.)
 */
export class LinkVariantClassMapper extends BaseClassMapper {
  /** Cascade-aware link color for the default `link` appearance */
  linkClass: string = "text-(--link-text)";
  /**
   * Direct appearance-text variable for explicit appearance overrides.
   * Bypasses `--text-color`, which requires `data-variant` to be set on
   * the element (Link has none) for the variant rule to assign it.
   */
  standardClass: string = "text-(--app-text)";

  getClasses(extractedKeys: CategoryProps): string[] {
    const appearance = extractedKeys?.appearance ?? 'link';
    return [appearance === 'link' ? this.linkClass : this.standardClass];
  }
}
