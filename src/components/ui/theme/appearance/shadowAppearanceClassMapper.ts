import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

/**
 * Shadow theme using CSS variables for customizable shadows.
 *
 * Shadow variable (--shadow-base) is set via CSS rules in vars.css
 * based on data-vane-type and data-size attributes.
 * UI components use --shadow-ui-* values (tight, compact).
 * Layout components use --shadow-layout-* values (elevated, deeper).
 * This theme only outputs the consumer class that uses --shadow-base.
 */
export class ShadowAppearanceClassMapper extends BaseClassMapper {
  private static readonly shadowClasses: string[] = [
    "shadow-(--shadow-base)"
  ];

  getClasses(extractedKeys: CategoryProps): string[] {
    const shadow = extractedKeys?.shadow;
    return shadow === undefined || shadow === 'noShadow'
      ? []
      : ShadowAppearanceClassMapper.shadowClasses;
  }
}
