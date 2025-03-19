import { CommonAppearanceProps, FontFamilyProps, FontStyleProps, FontWeightProps, TextAlignProps, TextAppearanceProps, TextDecorationProps, TextTransformProps } from "./props/props";

export type CommonAppearanceSettings = { [key in keyof CommonAppearanceProps]: boolean; };

export type FontFamilySettings = { [key in keyof FontFamilyProps]: boolean; };
export type FontWeightSettings = { [key in keyof FontWeightProps]: boolean; };
export type FontStyleSettings = { [key in keyof FontStyleProps]: boolean; };
export type TextAppearanceSettings = { [key in keyof TextAppearanceProps & CommonAppearanceProps]: boolean; };
export type TextDecorationSettings = { [key in keyof TextDecorationProps]: boolean; };
export type TextTransformSettings = { [key in keyof TextTransformProps]: boolean; };
export type TextAlignSettings = { [key in keyof TextAlignProps]: boolean; };

export type TypographySettings = {
  fontFamily?: FontFamilySettings;
  fontWeight?: FontWeightSettings;
  fontStyle?: FontStyleSettings;
  textAppearance?: TextAppearanceSettings;
  textDecoration?: TextDecorationSettings;
  textTransform?: TextTransformSettings;
  textAlign?: TextAlignSettings;
};
