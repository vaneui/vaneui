import { BaseTheme } from "../common/baseTheme";
import {
  FONT_FAMILY_KEYS,
  FONT_STYLE_KEYS,
  FONT_WEIGHT_KEYS,
  FontFamilyKey,
  FontStyleKey,
  FontWeightKey,
  TEXT_ALIGN_KEYS,
  TEXT_DECORATION_KEYS,
  TEXT_TRANSFORM_KEYS,
  TextAlignKey,
  TextDecorationKey,
  TextTransformKey
} from "../../props/propKeys";
import {
  fontFamilyClasses,
  fontStyleClasses,
  fontWeightClasses,
  textAlignClasses,
  textDecorationClasses,
  textTransformClasses
} from "../../classes/typographyClasses";
import { pickKey } from "../../../utils/componentUtils";
import { FontProps } from "../../props/props";

/**
 * Typography theme class for handling typography-related CSS classes
 */
export class TypographyTheme implements BaseTheme {
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
    this.fontFamily = fontFamily;
    this.fontWeight = fontWeight;
    this.fontStyle = fontStyle;
    this.textDecoration = textDecoration;
    this.textTransform = textTransform;
    this.textAlign = textAlign;
  }

  /**
   * Get typography-related CSS classes based on props
   * @param props Component props (only the real props the user passed)
   * @param defaults Component-level defaults
   * @returns CSS classes as an array of strings
   */
  getClasses(
    props: Partial<Record<keyof FontProps, any>>,
    defaults: Partial<Record<keyof FontProps, any>>
  ): string[] {
    const fontFamily = pickKey(props, defaults, FONT_FAMILY_KEYS);
    const fontWeight = pickKey(props, defaults, FONT_WEIGHT_KEYS);
    const fontStyle = pickKey(props, defaults, FONT_STYLE_KEYS);
    const textDecoration = pickKey(props, defaults, TEXT_DECORATION_KEYS);
    const textTransform = pickKey(props, defaults, TEXT_TRANSFORM_KEYS);
    const textAlign = pickKey(props, defaults, TEXT_ALIGN_KEYS);

    return [
      this.fontFamily[fontFamily ?? 'sans'] || '',
      this.fontWeight[fontWeight ?? 'normal'] || '',
      fontStyle ? this.fontStyle[fontStyle] || '' : '',
      textDecoration ? this.textDecoration[textDecoration] || '' : '',
      textTransform ? this.textTransform[textTransform] || '' : '',
      textAlign ? this.textAlign[textAlign] || '' : ''
    ];
  }

  /**
   * Create a default typography theme
   */
  static createDefaultTypographyTheme(): TypographyTheme {
    return new TypographyTheme();
  }
}
