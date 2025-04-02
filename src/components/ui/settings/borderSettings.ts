import { CommonAppearanceSettings } from "./commonAppearanceSettings";
import { SizeSettings } from "./sizeSettings";

export class BorderSettings {
  color: CommonAppearanceSettings = {default: true};
  radius: {
    rounded: SizeSettings;
    pill: boolean;
    sharp: boolean;
  } = {rounded: {md: true}, pill: false, sharp: false};
  noBorder: boolean = false;

  constructor(init: Partial<BorderSettings> = {}) {
    Object.assign(this, init);
    this.radius = {...this.radius, ...init.radius};
  }
}