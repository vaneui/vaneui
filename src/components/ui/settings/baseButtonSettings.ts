import { ButtonStyleSettings } from "./buttonStyleSettings";
import { TypographySettings } from "./typographySettings";
import { CommonAppearanceSettings } from "./commonAppearanceSettings";
import { BorderSettings } from "./borderSettings";
import { ShadowSettings } from "./shadowSettings";
import { SizeSettings } from "./sizeSettings";
import { GapSettings } from "./gapSettings";
import { deepMerge } from "../../utils/deepMerge";

export class BaseButtonSettings {
  style: Partial<ButtonStyleSettings> = {outline: true, filled: false};
  typography: Partial<TypographySettings> = {
    fontWeight: {semibold: true},
    textAppearance: {default: true},
    size: {md: true},
  };
  background: Partial<CommonAppearanceSettings> = {default: true};
  border: Partial<BorderSettings> = {
    radius: {
      rounded: {md: true},
      pill: false,
      sharp: false
    },
    noBorder: false,
    color: {default: true},
  };
  shadow: Partial<ShadowSettings> = {size: {md: true}, noShadow: false};
  px: Partial<SizeSettings> = {md: true};
  py: Partial<SizeSettings> = {md: true};
  gap: Partial<GapSettings> = {size: {md: true}, noGap: false};

  constructor(init: Partial<BaseButtonSettings> = {}) {
    const merged = deepMerge(this, init);
    Object.assign(this, merged);
  }
}
