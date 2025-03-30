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

export type HoverSettings = {
  background: CommonAppearanceSettings;
  shadow: SizeSettings;
};

export type ActiveSettings = {
  background: CommonAppearanceSettings;
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

// Type for style-specific classes (the structure inside filled and outline)
export type ButtonStyleClasses = {
  background: Record<keyof CommonAppearanceProps, string>;
  hoverBackground: Record<keyof CommonAppearanceProps, string>;
  activeBackground: Record<keyof CommonAppearanceProps, string>;
  textAppearance: Record<keyof TextAppearanceProps, string>;
  borderColor: Record<keyof CommonAppearanceProps, string>;
};

export type ButtonClasses = {
  baseClasses: string;

  style: Record<keyof ButtonStyleProps, ButtonStyleClasses>

  textSize: Record<keyof SizeProps, string>;
  rounded: Record<keyof SizeProps, string>;

  px: Record<keyof SizeProps, string>;
  py: Record<keyof SizeProps, string>;
};

export type ButtonSettings = {
  defaultTag: string;

  style: ButtonStyleSettings;
  typography: TypographySettings;
  background: CommonAppearanceSettings;
  border: BorderSettings;

  hover: HoverSettings;
  active: ActiveSettings;

  px: SizeSettings;
  py: SizeSettings;
  gap: SizeSettings;
  shadow: SizeSettings;

  noBorder: boolean;
  noShadow: boolean;
};
