import { SizeSettings } from "./sizeSettings";

export class GapSettings {
  public size: SizeSettings = {md: true};
  public noGap: boolean = false;

  constructor(init: Partial<GapSettings> = {}) {
    Object.assign(this, init);
  }
}