import { CommonAppearanceSettings } from "./commonAppearanceSettings";
import { SizeSettings } from "./sizeSettings";
import { deepMerge } from "../../utils/deepMerge";

export class BorderRadiusSettings {
  rounded: SizeSettings = new SizeSettings;
  pill: boolean = false;
  sharp: boolean = false;
}

export class BorderSettings {
  color: CommonAppearanceSettings = {default: true};
  radius: Partial<BorderRadiusSettings> = {rounded: new SizeSettings, pill: false, sharp: false};
  noBorder: boolean = false;

  constructor(init: Partial<BorderSettings> = {}) {
    const merged = deepMerge(this, init);
    Object.assign(this, merged);
  }
}
