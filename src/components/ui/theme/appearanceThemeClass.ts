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
export class VariantAppearanceTheme extends BaseTheme {
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

  getBackgroundClasses(mode: Mode = 'base'): string {
    return this.background[mode] || '';
  }

  getTextColorClasses(mode: Mode = 'base'): string {
    return this.textColor[mode] || '';
  }

  getBorderColorClasses(mode: Mode = 'base'): string {
    return this.borderColor[mode] || '';
  }

  getRingColorClasses(mode: Mode = 'base'): string {
    return this.ringColor[mode] || '';
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
  ): VariantAppearanceTheme {
    return new VariantAppearanceTheme(
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
export class StyleVariantAppearanceTheme extends BaseTheme {
  private styleVariants: Partial<Record<StyleKey, Partial<Record<TextAppearanceKey, VariantAppearanceTheme>>>>;

  constructor(styleVariants: Partial<Record<StyleKey, Partial<Record<TextAppearanceKey, VariantAppearanceTheme>>>> = {}) {
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

  getVariant(style: StyleKey, appearance: TextAppearanceKey): VariantAppearanceTheme | undefined {
    return this.styleVariants[style]?.[appearance];
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
    ) => VariantAppearanceTheme
  ): Record<StyleKey, Record<TextAppearanceKey, VariantAppearanceTheme>> {
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
      }, {} as Record<TextAppearanceKey, VariantAppearanceTheme>);

      return styleAcc;
    }, {} as Record<StyleKey, Record<TextAppearanceKey, VariantAppearanceTheme>>);
  }
}

/**
 * Simple appearance theme class for components without style variants
 */
export class SimpleAppearanceTheme extends BaseTheme {
  private variants: Partial<Record<TextAppearanceKey, VariantAppearanceTheme>>;

  constructor(variants: Partial<Record<TextAppearanceKey, VariantAppearanceTheme>> = {}) {
    super();
    this.variants = variants;
  }

  getClasses(props: Record<string, any>, mode: Mode = 'base'): string {
    const appearance = pickFirstKey(props, TEXT_APPEARANCE_KEYS, 'default');

    const variant = this.variants[appearance];
    if (!variant) return '';

    return variant.getClasses(props, mode);
  }

  getVariant(appearance: TextAppearanceKey): VariantAppearanceTheme | undefined {
    return this.variants[appearance];
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
    ) => VariantAppearanceTheme,
    styleKey: StyleKey = 'outline' // Default to outline style
  ): Record<TextAppearanceKey, VariantAppearanceTheme> {
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
    }, {} as Record<TextAppearanceKey, VariantAppearanceTheme>);
  }
}
