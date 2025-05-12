import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import { 
  STYLE_KEYS, 
  StyleKey, 
  TEXT_APPEARANCE_KEYS, 
  TextAppearanceKey 
} from "../props/propKeys";
import { pickFirstKey } from "../../utils/componentUtils";
import { VariantAppearance } from "./commonTypes";
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
} from "../classes/appearanceClasses";
import {
  filledTextAppearanceClasses,
  textAppearanceClasses
} from "../classes/typographyClasses";

/**
 * Base appearance variant class
 */
export class AppearanceTheme extends BaseTheme {
  background: Partial<Record<Mode, string>>;
  textColor: Partial<Record<Mode, string>>;
  borderColor: Partial<Record<Mode, string>>;
  ringColor: Partial<Record<Mode, string>>;

  constructor(
    background: Partial<Record<Mode, string>> = {},
    textColor: Partial<Record<Mode, string>> = {},
    borderColor: Partial<Record<Mode, string>> = {},
    ringColor: Partial<Record<Mode, string>> = {}
  ) {
    super();
    this.background = background;
    this.textColor = textColor;
    this.borderColor = borderColor;
    this.ringColor = ringColor;
  }

  getClasses(props: Record<string, any>, mode: Mode = 'base'): string {
    const classes = [
      this.background[mode] || '',
      this.textColor[mode] || '',
      this.borderColor[mode] || '',
      this.ringColor[mode] || ''
    ];

    return classes.filter(Boolean).join(' ');
  }

  /**
   * Helper function that creates a VariantAppearanceTheme with the given appearance classes
   * @param bgBase Background base class
   * @param bgHover Background hover class
   * @param bgActive Background active class
   * @param textBase Text color base class
   * @param borderBase Border color base class
   * @param ringBase Ring color base class
   * @returns A new VariantAppearanceTheme instance
   */
  static createVariantAppearanceTheme(
    bgBase: string,
    bgHover: string,
    bgActive: string,
    textBase: string,
    borderBase: string,
    ringBase: string
  ): AppearanceTheme {
    return new AppearanceTheme(
      { base: bgBase, hover: bgHover, active: bgActive },
      { base: textBase, hover: '', active: '' },
      { base: borderBase, hover: '', active: '' },
      { base: ringBase, hover: '', active: '' }
    );
  }
}

/**
 * Appearance theme class for components with style variants
 */
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
