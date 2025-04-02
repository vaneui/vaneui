import { ButtonStyleSettings } from "./buttonStyleSettings";
import { TypographySettings } from "./typographySettings";
import { CommonAppearanceSettings } from "./commonAppearanceSettings";
import { BorderSettings } from "./borderSettings";
import { ShadowSettings } from "./shadowSettings";
import { SizeSettings } from "./sizeSettings";
import { GapSettings } from "./gapSettings";

export class BaseButtonSettings {
  style: ButtonStyleSettings = {outline: true, filled: false};
  typography: TypographySettings = new TypographySettings();
  background: CommonAppearanceSettings = {default: true};
  border: BorderSettings = new BorderSettings();
  shadow: ShadowSettings = new ShadowSettings();
  px: SizeSettings = {md: true};
  py: SizeSettings = {md: true};
  gap: GapSettings = new GapSettings();

  constructor(init: Partial<BaseButtonSettings> = {}) {
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