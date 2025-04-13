import { deepMerge } from "../../utils/deepMerge";
import { ButtonStyleProps } from "../props/props";
import { TypographySettings } from "./typographySettings";
import { SizeSettings } from "./sizeSettings";
import { CommonAppearanceSettings } from "./commonAppearanceSettings";
import { BorderSettings } from "./borderSettings";
import { ShadowSettings } from "./shadowSettings";
import { GapSettings } from "./gapSettings";

export type ButtonStyleSettings = { [key in keyof ButtonStyleProps]: boolean; };

export class BaseButtonSettings {
  style: ButtonStyleSettings = {outline: true, filled: false};
  typography: TypographySettings = {
    fontWeight: {semibold: true},
    textAppearance: {default: true},
    size: new SizeSettings,
    fontFamily: {},
    fontStyle: {},
    textDecoration: {},
    textTransform: {},
    textAlign: {}
  };
  background: Partial<CommonAppearanceSettings> = {default: true};
  border: BorderSettings = {
    radius: {
      rounded: new SizeSettings,
      pill: false,
      sharp: false
    },
    noBorder: false,
    color: {default: true},
  };
  shadow: ShadowSettings = {
    size: new SizeSettings,
    noShadow: false
  };
  px: SizeSettings = new SizeSettings;
  py: SizeSettings = new SizeSettings;
  gap: Partial<GapSettings> = {size: new SizeSettings, noGap: false};

  constructor(init: Partial<BaseButtonSettings> = {}) {
    const merged = deepMerge(this, init);
    Object.assign(this, merged);
  }
}

export class ButtonSettings {
  tag: string = "button";

  base: BaseButtonSettings = new BaseButtonSettings();
  hover: BaseButtonSettings = new BaseButtonSettings();
  active: BaseButtonSettings = new BaseButtonSettings();

  constructor(init: Partial<ButtonSettings> = {}) {
    this.tag = init.tag ?? this.tag;
    this.base = deepMerge(this.base, init.base);
    this.hover = deepMerge(this.hover, init.hover);
    this.active = deepMerge(this.active, init.active);
  }
}
