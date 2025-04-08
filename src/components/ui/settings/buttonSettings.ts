import { BaseButtonSettings } from "./baseButtonSettings";
import { deepMerge } from "../../utils/deepMerge";

export class ButtonSettings {
  tag: string = "button";

  base: BaseButtonSettings = new BaseButtonSettings();
  hover: BaseButtonSettings = new BaseButtonSettings();
  active: BaseButtonSettings = new BaseButtonSettings();

  constructor(init: Partial<ButtonSettings> = {}) {
    this.tag = init.tag ?? this.tag;
    this.base = new BaseButtonSettings(deepMerge(this.base, init.base));
    this.hover = new BaseButtonSettings(deepMerge(this.hover, init.hover));
    this.active = new BaseButtonSettings(deepMerge(this.active, init.active));
  }
}
