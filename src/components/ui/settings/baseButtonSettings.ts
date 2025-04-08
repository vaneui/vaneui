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
  typography: TypographySettings = new TypographySettings({fontWeight: {semibold: true}});
  background: CommonAppearanceSettings = {default: true};
  border: BorderSettings = new BorderSettings();
  shadow: ShadowSettings = new ShadowSettings();
  px: SizeSettings = {md: true};
  py: SizeSettings = {md: true};
  gap: GapSettings = new GapSettings();

  constructor(init: Partial<BaseButtonSettings> = {}) {
    const merged = deepMerge(this, init);
    Object.assign(this, merged);
  }
}
