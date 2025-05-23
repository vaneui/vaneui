import { BaseTheme } from "../common/baseTheme";
import { 
  VARIANT_KEYS,
  VariantKey,
  TEXT_APPEARANCE_KEYS, 
  TextAppearanceKey 
} from "../../props/propKeys";
import { pickFirstKey } from "../../../utils/componentUtils";
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
import { BackgroundAppearanceTheme } from "./backgroundAppearanceTheme";
import { TextAppearanceTheme } from "./textAppearanceTheme";
import { BorderAppearanceTheme } from "./borderAppearanceTheme";
import { RingAppearanceTheme } from "./ringAppearanceTheme";

export class VariantAppearanceTheme extends BaseTheme {
  variants: Partial<Record<VariantKey, Partial<Record<TextAppearanceKey, Partial<AppearanceTheme>>>>>;

  constructor(styleVariants: Partial<Record<VariantKey, Partial<Record<TextAppearanceKey, Partial<AppearanceTheme>>>>> = {}) {
    super();
    this.variants = styleVariants;
  }

  getClasses(props: Record<string, any>): string[] {
    const style = pickFirstKey(props, VARIANT_KEYS, 'outline');
    const appearance = pickFirstKey(props, TEXT_APPEARANCE_KEYS, 'default');

    const variant = this.variants[style]?.[appearance];

    return variant?.getClasses !== undefined ? variant.getClasses(props) : [];
  }

  static createDefault(): VariantAppearanceTheme {
    return new VariantAppearanceTheme(VariantAppearanceTheme.makeStyleVariants(AppearanceTheme.createAppearanceTheme));
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
  ): Record<VariantKey, Record<TextAppearanceKey, AppearanceTheme>> {
    return VARIANT_KEYS.reduce((styleAcc, styleKey) => {
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
    }, {} as Record<VariantKey, Record<TextAppearanceKey, AppearanceTheme>>);
  }
}
