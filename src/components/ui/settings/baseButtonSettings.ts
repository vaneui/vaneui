import { ButtonStyleSettings } from "./buttonStyleSettings";
import { TypographySettings } from "./typographySettings";
import { CommonAppearanceSettings } from "./commonAppearanceSettings";
import { BorderSettings } from "./borderSettings";
import { ShadowSettings } from "./shadowSettings";
import { SizeSettings } from "./sizeSettings";
import { GapSettings } from "./gapSettings";
import { deepMerge } from "../../utils/deepMerge";

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
