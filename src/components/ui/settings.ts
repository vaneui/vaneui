import { BorderAppearanceProps, BorderRadiusProps, CommonAppearanceProps, FontFamilyProps, FontStyleProps, FontWeightProps, GapProps, ItemsProps, JustifyProps, StackDirectionProps, TextAlignProps, TextAppearanceProps, TextDecorationProps, TextTransformProps } from "./props/props";

export type CommonAppearanceSettings = { [key in keyof CommonAppearanceProps]: boolean; };

export type FontFamilySettings = { [key in keyof FontFamilyProps]: boolean; };
export type FontWeightSettings = { [key in keyof FontWeightProps]: boolean; };
export type FontStyleSettings = { [key in keyof FontStyleProps]: boolean; };
export type ItemsSettings = { [key in keyof ItemsProps]: boolean; };
export type TextAppearanceSettings = { [key in keyof TextAppearanceProps]: boolean; };
export type TextDecorationSettings = { [key in keyof TextDecorationProps]: boolean; };
export type TextTransformSettings = { [key in keyof TextTransformProps]: boolean; };
export type TextAlignSettings = { [key in keyof TextAlignProps]: boolean; };
export type JustifySettings = { [key in keyof JustifyProps]: boolean; };
export type StackDirectionSettings = { [key in keyof StackDirectionProps]: boolean; };
export type BorderSettings = { [key in keyof BorderAppearanceProps]: boolean; };
export type BorderRadiusSettings = { [key in keyof BorderRadiusProps]: boolean; };
export type GapSettings = { [key in keyof GapProps]: boolean; };

export type TypographySettings = {
  fontFamily?: FontFamilySettings;
  fontWeight?: FontWeightSettings;
  fontStyle?: FontStyleSettings;
  textAppearance?: TextAppearanceSettings;
  textDecoration?: TextDecorationSettings;
  textTransform?: TextTransformSettings;
  textAlign?: TextAlignSettings;
};
