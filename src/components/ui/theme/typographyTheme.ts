import {
  FontFamilyKey,
  FontStyleKey,
  FontWeightKey,
  TextAlignKey,
  TextDecorationKey,
  TextTransformKey
} from "../props/propKeys";
import {
  fontFamilyClasses,
  fontStyleClasses,
  fontWeightClasses,
  textAlignClasses,
  textDecorationClasses,
  textTransformClasses
} from "../classes/typographyClasses";

// Typography theme structure
export type TypographyTheme = {
  fontFamily: Record<FontFamilyKey, string>;
  fontWeight: Record<FontWeightKey, string>;
  fontStyle: Record<FontStyleKey, string>;
  textDecoration: Record<TextDecorationKey, string>;
  textTransform: Record<TextTransformKey, string>;
  textAlign: Record<TextAlignKey, string>;
};

// Default typography theme
export const defaultTypographyTheme: TypographyTheme = {
  fontFamily: fontFamilyClasses,
  fontWeight: fontWeightClasses,
  fontStyle: fontStyleClasses,
  textDecoration: textDecorationClasses,
  textTransform: textTransformClasses,
  textAlign: textAlignClasses,
};