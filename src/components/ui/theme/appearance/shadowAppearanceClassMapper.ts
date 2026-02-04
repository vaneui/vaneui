import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

/**
 * Shadow theme using CSS variables for customizable shadows.
 *
 * Shadow variables (--shadow-base, --shadow-hover) are set via CSS rules in vars.css
 * based on data-vane-type and data-size attributes.
 * This theme only outputs the consumer classes that use those variables.
 * - UI: shadow-(--shadow-base) + hover:shadow-(--shadow-hover) (interactive with hover)
 * - Layout: shadow-(--shadow-base) (static, no hover)
 */
export class ShadowAppearanceClassMapper extends BaseClassMapper {
  // UI shadows: consumer classes (CSS sets variables based on data-vane-type + data-size)
  private static readonly uiShadowClasses: string[] = [
    "shadow-(--shadow-base)",
    "hover:shadow-(--shadow-hover)"
  ];

  // Layout shadows: consumer class only (no hover)
  private static readonly layoutShadowClasses: string[] = [
    "shadow-(--shadow-base)"
  ];

  private readonly shadowClasses: string[];

  constructor(shadowClasses: string[]) {
    super();
    this.shadowClasses = shadowClasses;
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const shadow = extractedKeys?.shadow;
    return shadow === undefined || shadow === 'noShadow'
      ? []
      : this.shadowClasses;
  }

  static createUITheme(): ShadowAppearanceClassMapper {
    return new ShadowAppearanceClassMapper(ShadowAppearanceClassMapper.uiShadowClasses);
  }

  static createLayoutTheme(): ShadowAppearanceClassMapper {
    return new ShadowAppearanceClassMapper(ShadowAppearanceClassMapper.layoutShadowClasses);
  }
}
