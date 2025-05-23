import { BaseTheme } from "../common/baseTheme";
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
import { BackgroundAppearanceTheme } from "./backgroundAppearanceTheme";
import { TextAppearanceTheme } from "./textAppearanceTheme";
import { BorderAppearanceTheme } from "./borderAppearanceTheme";
import { RingAppearanceTheme } from "./ringAppearanceTheme";

/**
 * Simple appearance theme class for components without style variants
 */
export class SimpleAppearanceTheme extends BaseTheme {
  appearance: Partial<Record<TextAppearanceKey, AppearanceTheme>>;

  constructor(appearance: Partial<Record<TextAppearanceKey, AppearanceTheme>> = {}) {
    super();
    this.appearance = appearance;
  }

  getClasses(props: Record<string, any>): string[] {
    const appearance = pickFirstKey(props, TEXT_APPEARANCE_KEYS, 'default');

    const variant = this.appearance[appearance];
    if (!variant) return [];

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
            new BackgroundAppearanceTheme({ base: bgBase, hover: bgHover, active: bgActive }),
            new TextAppearanceTheme({ base: textBase }),
            new BorderAppearanceTheme({ base: borderBase }),
            new RingAppearanceTheme({ base: ringBase })
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
