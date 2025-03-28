import { ButtonStyleProps, CommonAppearanceProps, FontFamilyProps, FontStyleProps, FontWeightProps, ItemsProps, JustifyProps, NoBorderProps, NoGapProps, NoShadowProps, PillProps, SharpProps, SizeProps, StackDirectionProps, TextAlignProps, TextAppearanceProps, TextDecorationProps, TextTransformProps, WrapProps } from "../props/props";

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
export type WrapSettings = { [key in keyof WrapProps]: boolean; };
export type StackDirectionSettings = { [key in keyof StackDirectionProps]: boolean; };
export type BorderSettings = { [key in keyof CommonAppearanceProps]: boolean; };
export type NoBorderSettings = { [key in keyof NoBorderProps]: boolean; };
export type NoShadowSettings = { [key in keyof NoShadowProps]: boolean; };
export type RoundedSettings = { [key in keyof SizeProps]: boolean; };
export type PillSettings = { [key in keyof PillProps]: boolean; };
export type SharpSettings = { [key in keyof SharpProps]: boolean; };

export type BorderRadiusSettings = {
  rounded?: RoundedSettings;
  pill?: PillSettings;
  sharp?: SharpSettings;
};
export type GapSettings = { [key in keyof SizeProps]: boolean; };
export type NoGapSettings = { [key in keyof NoGapProps]: boolean; };
export type ShadowSettings = { [key in keyof SizeProps]: boolean; };
export type HoverShadowSettings = { [key in keyof SizeProps]: boolean; };

export type HoverSettings = {
  backgroundAppearance?: CommonAppearanceSettings;
  shadow?: ShadowSettings;
};

export type ActiveSettings = {
  backgroundAppearance?: CommonAppearanceSettings;
};

export type PxSettings = { [key in keyof SizeProps]: boolean; };
export type PySettings = { [key in keyof SizeProps]: boolean; };
export type TextSizeSettings = { [key in keyof SizeProps]: boolean; };
export type ButtonStyleSettings = { [key in keyof ButtonStyleProps]: boolean; };

export type TypographySettings = {
  fontFamily?: FontFamilySettings;
  fontWeight?: FontWeightSettings;
  fontStyle?: FontStyleSettings;
  textAppearance?: TextAppearanceSettings;
  textDecoration?: TextDecorationSettings;
  textTransform?: TextTransformSettings;
  textAlign?: TextAlignSettings;
  textSize?: TextSizeSettings;
};

// Type for style-specific classes (the structure inside filled and outline)
export type ButtonStyleClasses = {
  backgroundAppearance?: Record<keyof CommonAppearanceProps, string>;
  hoverBackgroundAppearance?: Record<keyof CommonAppearanceProps, string>;
  activeBackgroundAppearance?: Record<keyof CommonAppearanceProps, string>;
  textAppearance?: Record<keyof TextAppearanceProps, string>;
  borderColor?: Record<keyof CommonAppearanceProps, string>;
};

export type ClassesSettings = {
  // Button style variants based on ButtonStyleProps (filled and outline)
  // Each key corresponds to a property in ButtonStyleProps
  filled?: ButtonStyleClasses;
  outline?: ButtonStyleClasses;

  // Common classes for both styles
  textSize?: Record<keyof SizeProps, string>;
  rounded?: Record<keyof SizeProps, string>;
};

export type ButtonSettings = {
  // Component builder settings
  defaultTag?: string;
  baseClasses?: string;

  // Typography settings
  typography?: TypographySettings;

  // Appearance settings
  backgroundAppearance?: CommonAppearanceSettings;
  borderColor?: BorderSettings;

  // Hover settings
  hover?: HoverSettings;

  // Active settings
  active?: ActiveSettings;

  // Layout settings
  px?: PxSettings;
  py?: PySettings;
  gap?: GapSettings;

  // Border radius settings
  borderRadius?: BorderRadiusSettings;

  shadow?: ShadowSettings;

  // Boolean settings
  noBorder?: NoBorderSettings;
  noShadow?: NoShadowSettings;

  // Style settings
  buttonStyle?: ButtonStyleSettings;

  // Class mappings grouped into a single field
  classes: ClassesSettings;
};
