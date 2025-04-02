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
    if (!init) return;
    Object.assign(this, init);
    this.radius = {...this.radius, ...init.radius};
  }
}

export class ShadowSettings {
  public size: SizeSettings = {md: true};
  public noShadow: boolean = false;

  constructor(init?: Partial<ShadowSettings>) {
    if (!init) return;
    Object.assign(this, init);
  }
}

export class GapSettings {
  public size: SizeSettings = {md: true};
  public noGap: boolean = false;

  constructor(init?: Partial<GapSettings>) {
    if (!init) return;
    Object.assign(this, init);
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
  size: SizeSettings = {md: true};

  constructor(init?: Partial<TypographySettings>) {
    if (!init) return;
    Object.assign(this, init);
  }
}

export type ButtonStyleSettings = { [key in keyof ButtonStyleProps]: boolean; };

export class BaseButtonSettings {
  style: ButtonStyleSettings = {outline: true, filled: false};
  typography: TypographySettings = new TypographySettings();
  background: CommonAppearanceSettings = {default: true};
  border: BorderSettings = new BorderSettings();
  shadow: ShadowSettings = new ShadowSettings();
  px: SizeSettings = {md: true};
  py: SizeSettings = {md: true};
  gap: GapSettings = new GapSettings();

  constructor(init?: Partial<BaseButtonSettings>) {
    if (!init) return;
    this.style = {...this.style, ...init.style};
    this.typography = new TypographySettings({...this.typography, ...init.typography});
    this.background = {...this.background, ...init.background};
    this.border = new BorderSettings({...this.border, ...init.border});
    this.shadow = new ShadowSettings({...this.shadow, ...init.shadow});
    this.px = {...this.px, ...init.px};
    this.py = {...this.py, ...init.py};
    this.gap = new GapSettings({...this.gap, ...init.gap});
  }
}

export type ButtonSettings = {
  tag: string;

  base: BaseButtonSettings;
  hover: BaseButtonSettings;
  active: BaseButtonSettings;
};
