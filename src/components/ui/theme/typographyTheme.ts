import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import {
  FontFamilyKey,
  FontStyleKey,
  FontWeightKey,
  TextAlignKey,
  TextDecorationKey,
  TextTransformKey,
  FONT_FAMILY_KEYS,
  FONT_WEIGHT_KEYS,
  FONT_STYLE_KEYS,
  TEXT_DECORATION_KEYS,
  TEXT_TRANSFORM_KEYS,
  TEXT_ALIGN_KEYS
} from "../props/propKeys";
import {
  fontFamilyClasses,
  fontStyleClasses,
  fontWeightClasses,
  textAlignClasses,
  textDecorationClasses,
  textTransformClasses
} from "../classes/typographyClasses";
import { pickFirstKey, pickFirstKeyOptional } from "../../utils/componentUtils";

/**
 * Typography theme class for handling typography-related CSS classes
 */
export class TypographyTheme extends BaseTheme {
  fontFamily: Record<FontFamilyKey, string>;
  fontWeight: Record<FontWeightKey, string>;
  fontStyle: Record<FontStyleKey, string>;
  textDecoration: Record<TextDecorationKey, string>;
  textTransform: Record<TextTransformKey, string>;
  textAlign: Record<TextAlignKey, string>;

  /**
   * Create a new TypographyThemeClass instance
   * @param fontFamily Font family classes
   * @param fontWeight Font weight classes
   * @param fontStyle Font style classes
   * @param textDecoration Text decoration classes
   * @param textTransform Text transform classes
   * @param textAlign Text align classes
   */
  private constructor(
    fontFamily: Record<FontFamilyKey, string> = fontFamilyClasses,
    fontWeight: Record<FontWeightKey, string> = fontWeightClasses,
    fontStyle: Record<FontStyleKey, string> = fontStyleClasses,
    textDecoration: Record<TextDecorationKey, string> = textDecorationClasses,
    textTransform: Record<TextTransformKey, string> = textTransformClasses,
    textAlign: Record<TextAlignKey, string> = textAlignClasses
  ) {
    super();
    this.fontFamily = fontFamily;
    this.fontWeight = fontWeight;
    this.fontStyle = fontStyle;
    this.textDecoration = textDecoration;
    this.textTransform = textTransform;
    this.textAlign = textAlign;
  }

  /**
   * Get typography-related CSS classes based on props
   * @param props Component props
   * @param mode Current mode (base, hover, active) - not used for typography as it doesn't have mode-specific classes
   * @returns CSS classes as a string
   */
  getClasses(props: Record<string, any>, mode: Mode = 'base'): string {
    const fontFamily = pickFirstKey(props, FONT_FAMILY_KEYS, 'sans');
    const fontWeight = pickFirstKey(props, FONT_WEIGHT_KEYS, 'normal');
    const fontStyle = pickFirstKeyOptional(props, FONT_STYLE_KEYS);
    const textDecoration = pickFirstKeyOptional(props, TEXT_DECORATION_KEYS);
    const textTransform = pickFirstKeyOptional(props, TEXT_TRANSFORM_KEYS);
    const textAlign = pickFirstKeyOptional(props, TEXT_ALIGN_KEYS);

    const classes = [
      this.fontFamily[fontFamily] || '',
      this.fontWeight[fontWeight] || '',
      fontStyle ? this.fontStyle[fontStyle] || '' : '',
      textDecoration ? this.textDecoration[textDecoration] || '' : '',
      textTransform ? this.textTransform[textTransform] || '' : '',
      textAlign ? this.textAlign[textAlign] || '' : ''
    ];

    return classes.filter(Boolean).join(' ');
  }

  /**
   * Create a default typography theme
   */
  static createDefaultTypographyTheme(): TypographyTheme {
    return new TypographyTheme(
      fontFamilyClasses,
      fontWeightClasses,
      fontStyleClasses,
      textDecorationClasses,
      textTransformClasses,
      textAlignClasses
    );
  }
}
