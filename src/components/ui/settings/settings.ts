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

export class BorderSettings {
  color: CommonAppearanceSettings = {default: true};
  radius: {
    rounded: SizeSettings;
    pill: boolean;
    sharp: boolean;
  } = {rounded: {md: true}, pill: false, sharp: false};
  noBorder: boolean = false;

  constructor(init?: Partial<BorderSettings>) {
    Object.assign(this, init);
    Object.assign(this.radius, init?.radius);
  }
}

export class ShadowSettings {
  constructor(
    public size: SizeSettings = {md: true},
    public noShadow: boolean = false) {
  }
}

export class GapSettings {
  constructor(
    public size: SizeSettings = {md: true},
    public noGap: boolean = false) {
  }
}

export class TypographySettings {
  fontFamily: { [key in keyof FontFamilyProps]: boolean } = {};
  fontWeight: { [key in keyof FontWeightProps]: boolean } = {};
  fontStyle: { [key in keyof FontStyleProps]: boolean } = {};
  textAppearance: { [key in keyof TextAppearanceProps]: boolean } = {default: true};
  textDecoration: { [key in keyof TextDecorationProps]: boolean } = {};
  textTransform: { [key in keyof TextTransformProps]: boolean } = {};
  textAlign: { [key in keyof TextAlignProps]: boolean } = {};
  textSize: SizeSettings = {md: true};

  constructor(init?: Partial<TypographySettings>) {
    Object.assign(this, init);
  }
}

export type ButtonStyleSettings = { [key in keyof ButtonStyleProps]: boolean; };

export type BaseButtonSettings = {
  style: ButtonStyleSettings;
  typography: TypographySettings;
  background: CommonAppearanceSettings;
  border: BorderSettings;
  shadow: ShadowSettings;
  px: SizeSettings;
  py: SizeSettings;
  gap: GapSettings;
}

export type ButtonSettings = {
  tag: string;

  base: BaseButtonSettings;
  hover: BaseButtonSettings;
  active: BaseButtonSettings;
};
