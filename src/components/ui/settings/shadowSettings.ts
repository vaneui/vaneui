import { SizeSettings } from "./sizeSettings";

export class ShadowSettings {
  public size: SizeSettings = {md: true};
  public noShadow: boolean = false;

  constructor(init: Partial<ShadowSettings> = {}) {
    Object.assign(this, init);
  }
}