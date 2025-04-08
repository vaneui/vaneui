import { BaseButtonSettings } from "./baseButtonSettings";
import { deepMerge } from "../../utils/deepMerge";

export class ButtonSettings {
  tag: string = "button";

  base: Partial<BaseButtonSettings> = new BaseButtonSettings();
  hover: Partial<BaseButtonSettings> = new BaseButtonSettings();
  active: Partial<BaseButtonSettings> = new BaseButtonSettings();

  constructor(init: Partial<ButtonSettings> = {}) {
    this.tag = init.tag ?? this.tag;
    this.base = new BaseButtonSettings(deepMerge(this.base, init.base));
    this.hover = new BaseButtonSettings(deepMerge(this.hover, init.hover));
    this.active = new BaseButtonSettings(deepMerge(this.active, init.active));
  }
}
