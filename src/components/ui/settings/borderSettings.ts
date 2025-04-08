import { CommonAppearanceSettings } from "./commonAppearanceSettings";
import { SizeSettings } from "./sizeSettings";
import { deepMerge } from "../../utils/deepMerge";

export class BorderSettings {
  color: CommonAppearanceSettings = {default: true};
  radius: {
    rounded: SizeSettings;
    pill: boolean;
    sharp: boolean;
  } = {rounded: {md: true}, pill: false, sharp: false};
  noBorder: boolean = false;

  constructor(init: Partial<BorderSettings> = {}) {
    const merged = deepMerge(this, init);
    Object.assign(this, merged);
  }
}
