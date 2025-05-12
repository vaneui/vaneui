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

export class StyleAppearanceTheme extends BaseTheme {
  private styleVariants: Partial<Record<StyleKey, Partial<Record<TextAppearanceKey, AppearanceTheme>>>>;

  constructor(styleVariants: Partial<Record<StyleKey, Partial<Record<TextAppearanceKey, AppearanceTheme>>>> = {}) {
    super();
    this.styleVariants = styleVariants;
  }

  getClasses(props: Record<string, any>, mode: Mode = 'base'): string {
    const style = pickFirstKey(props, STYLE_KEYS, 'outline');
    const appearance = pickFirstKey(props, TEXT_APPEARANCE_KEYS, 'default');

    const variant = this.styleVariants[style]?.[appearance];
    if (!variant) return '';

    return variant.getClasses(props, mode);
  }

  /**
   * Create style variants for components like button, chip, and badge
   */
  static makeStyleVariants(
    variantFactory: (
      bgBase: string,
      bgHover: string,
      bgActive: string,
      textBase: string,
      borderBase: string,
      ringBase: string
    ) => AppearanceTheme
  ): Record<StyleKey, Record<TextAppearanceKey, AppearanceTheme>> {
    return STYLE_KEYS.reduce((styleAcc, styleKey) => {
      const isFilled = styleKey === 'filled';

      const bgBaseSource = isFilled ? filledBackgroundAppearanceClasses : backgroundAppearanceClasses;
      const bgHoverSource = isFilled ? filledHoverBackgroundAppearanceClasses : hoverBackgroundAppearanceClasses;
      const bgActiveSource = isFilled ? filledActiveBackgroundAppearanceClasses : activeBackgroundAppearanceClasses;
      const textBaseSource = isFilled ? filledTextAppearanceClasses : textAppearanceClasses;
      const borderBaseSource = isFilled ? filledBorderAppearanceClasses : borderAppearanceClasses;
      const ringBaseSource = isFilled ? filledRingAppearanceClasses : ringAppearanceClasses;

      styleAcc[styleKey] = TEXT_APPEARANCE_KEYS.reduce((appearanceAcc, appearanceKey) => {
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

      return styleAcc;
    }, {} as Record<StyleKey, Record<TextAppearanceKey, AppearanceTheme>>);
  }
}
