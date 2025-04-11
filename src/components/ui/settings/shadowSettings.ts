import { SizeSettings } from "./sizeSettings";
import { deepMerge } from "../../utils/deepMerge";

export class ShadowSettings {
  public size: SizeSettings = new SizeSettings;
  public noShadow: boolean = false;

  constructor(init: Partial<ShadowSettings> = {}) {
    const merged = deepMerge(this, init);
    Object.assign(this, merged);
  }
}
