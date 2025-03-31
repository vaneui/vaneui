import {
  ButtonStyleProps,
  CommonAppearanceProps,
  FontFamilyProps,
  FontStyleProps,
  FontWeightProps,
  SizeProps,
  TextAlignProps,
  TextAppearanceProps,
  TextDecorationProps,
  TextTransformProps
} from "../props/props";

export type SizeSettings = { [key in keyof SizeProps]: boolean; };
export type CommonAppearanceSettings = { [key in keyof CommonAppearanceProps]: boolean; };

export type BorderSettings = {
  color: CommonAppearanceSettings;
  radius: {
    rounded: SizeSettings;
    pill: boolean;
    sharp: boolean;
  };
};

export type ButtonStyleSettings = { [key in keyof ButtonStyleProps]: boolean; };

export type TypographySettings = {
  fontFamily?: { [key in keyof FontFamilyProps]: boolean; };
  fontWeight?: { [key in keyof FontWeightProps]: boolean; };
  fontStyle?: { [key in keyof FontStyleProps]: boolean; };
  textAppearance?: { [key in keyof TextAppearanceProps]: boolean; };
  textDecoration?: { [key in keyof TextDecorationProps]: boolean; };
  textTransform?: { [key in keyof TextTransformProps]: boolean; };
  textAlign?: { [key in keyof TextAlignProps]: boolean; };
  textSize?: SizeSettings;
};

export type BaseButtonSettings = {
  style: ButtonStyleSettings;
  typography: TypographySettings;
  background: CommonAppearanceSettings;
  border: BorderSettings;
  shadow: SizeSettings;
  px: SizeSettings;
  py: SizeSettings;
  gap: SizeSettings;
  noBorder: boolean;
  noShadow: boolean;
}

export type ButtonSettings = {
  tag: string;

  base: BaseButtonSettings;
  hover: BaseButtonSettings;
  active: BaseButtonSettings;
};
