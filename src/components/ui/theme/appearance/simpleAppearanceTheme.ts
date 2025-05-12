import { BaseTheme } from "../baseTheme";
import { Mode } from "../../props/mode";
import { 
  STYLE_KEYS, 
  StyleKey, 
  TEXT_APPEARANCE_KEYS, 
  TextAppearanceKey 
} from "../../props/propKeys";
import { pickFirstKey } from "../../../utils/componentUtils";
import { VariantAppearance } from "../commonTypes";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses,
  borderAppearanceClasses,
  filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses,
  filledBorderAppearanceClasses,
  filledHoverBackgroundAppearanceClasses,
  filledRingAppearanceClasses,
  hoverBackgroundAppearanceClasses,
  ringAppearanceClasses,
} from "../../classes/appearanceClasses";
import {
  filledTextAppearanceClasses,
  textAppearanceClasses
} from "../../classes/typographyClasses";
import { AppearanceTheme } from "./appearanceTheme";

/**
 * Simple appearance theme class for components without style variants
 */
export class SimpleAppearanceTheme extends BaseTheme {
  private variants: Partial<Record<TextAppearanceKey, AppearanceTheme>>;

  constructor(variants: Partial<Record<TextAppearanceKey, AppearanceTheme>> = {}) {
    super();
    this.variants = variants;
  }

  getClasses(props: Record<string, any>, mode: Mode = 'base'): string {
    const appearance = pickFirstKey(props, TEXT_APPEARANCE_KEYS, 'default');

    const variant = this.variants[appearance];
    if (!variant) return '';

    return variant.getClasses(props, mode);
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
    ) => AppearanceTheme,
    styleKey: StyleKey = 'outline' // Default to outline style
  ): Record<TextAppearanceKey, AppearanceTheme> {
    const isFilled = styleKey === 'filled';

    const bgBaseSource = isFilled ? filledBackgroundAppearanceClasses : backgroundAppearanceClasses;
    const bgHoverSource = isFilled ? filledHoverBackgroundAppearanceClasses : hoverBackgroundAppearanceClasses;
    const bgActiveSource = isFilled ? filledActiveBackgroundAppearanceClasses : activeBackgroundAppearanceClasses;
    const textBaseSource = isFilled ? filledTextAppearanceClasses : textAppearanceClasses;
    const borderBaseSource = isFilled ? filledBorderAppearanceClasses : borderAppearanceClasses;
    const ringBaseSource = isFilled ? filledRingAppearanceClasses : ringAppearanceClasses;

    return TEXT_APPEARANCE_KEYS.reduce((appearanceAcc, appearanceKey) => {
      appearanceAcc[appearanceKey] = variantFactory(
        bgBaseSource[appearanceKey] ?? '',
        bgHoverSource[appearanceKey] ?? '',
        bgActiveSource[appearanceKey] ?? '',
        textBaseSource[appearanceKey] ?? '',
        borderBaseSource[appearanceKey] ?? '',
        ringBaseSource[appearanceKey] ?? ''
      );
      return appearanceAcc;
    }, {} as Record<TextAppearanceKey, AppearanceTheme>);
  }
}
