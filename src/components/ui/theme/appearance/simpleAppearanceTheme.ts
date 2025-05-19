import { BaseTheme } from "../common/baseTheme";
import { Mode } from "../../props/mode";
import {
  TEXT_APPEARANCE_KEYS, 
  TextAppearanceKey 
} from "../../props/propKeys";
import { pickFirstKey } from "../../../utils/componentUtils";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses,
  borderAppearanceClasses,
  hoverBackgroundAppearanceClasses,
  ringAppearanceClasses,
} from "../../classes/appearanceClasses";
import {
  textAppearanceClasses
} from "../../classes/typographyClasses";
import { AppearanceTheme } from "./appearanceTheme";

/**
 * Simple appearance theme class for components without style variants
 */
export class SimpleAppearanceTheme extends BaseTheme {
  variants: Partial<Record<TextAppearanceKey, AppearanceTheme>>;

  constructor(variants: Partial<Record<TextAppearanceKey, AppearanceTheme>> = {}) {
    super();
    this.variants = variants;
  }

  getClasses(props: Record<string, any>): string {
    const appearance = pickFirstKey(props, TEXT_APPEARANCE_KEYS, 'default');

    const variant = this.variants[appearance];
    if (!variant) return '';

    return variant.getClasses(props);
  }

  /**
   * Creates a default style with standard AppearanceTheme configuration
   * @returns A new SimpleAppearanceTheme instance
   */
  static createDefaultStyle(): SimpleAppearanceTheme {
    return new SimpleAppearanceTheme(
      SimpleAppearanceTheme.makeSimpleStyleVariants(
        (bgBase, bgHover, bgActive, textBase, borderBase, ringBase) => {
          return new AppearanceTheme(
            { base: bgBase, hover: bgHover, active: bgActive },
            { base: textBase },
            { base: borderBase },
            { base: ringBase }
          );
        }
      )
    );
  }

  /**
   * Create simple style variants for components without style variants
   */
  static makeSimpleStyleVariants(
    variantFactory: (
      bgBase: string,
      bgHover: string,
      bgActive: string,
      textBase: string,
      borderBase: string,
      ringBase: string
    ) => AppearanceTheme
  ): Record<TextAppearanceKey, AppearanceTheme> {
    return TEXT_APPEARANCE_KEYS.reduce((appearanceAcc, appearanceKey) => {
      appearanceAcc[appearanceKey] = variantFactory(
        backgroundAppearanceClasses[appearanceKey] ?? '',
        hoverBackgroundAppearanceClasses[appearanceKey] ?? '',
        activeBackgroundAppearanceClasses[appearanceKey] ?? '',
        textAppearanceClasses[appearanceKey] ?? '',
        borderAppearanceClasses[appearanceKey] ?? '',
        ringAppearanceClasses[appearanceKey] ?? ''
      );
      return appearanceAcc;
    }, {} as Record<TextAppearanceKey, AppearanceTheme>);
  }
}
