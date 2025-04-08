import { SizeSettings } from "./sizeSettings";
import { deepMerge } from "../../utils/deepMerge";

export class GapSettings {
  public size: SizeSettings = {md: true};
  public noGap: boolean = false;

  constructor(init: Partial<GapSettings> = {}) {
    const merged = deepMerge(this, init);
    Object.assign(this, merged);
  }
}
