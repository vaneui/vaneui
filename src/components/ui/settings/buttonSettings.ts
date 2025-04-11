import { BaseButtonSettings } from "./baseButtonSettings";
import { deepMerge } from "../../utils/deepMerge";

export class ButtonSettings {
  tag: string = "button";

  base: BaseButtonSettings = new BaseButtonSettings();
  hover: BaseButtonSettings = new BaseButtonSettings();
  active: BaseButtonSettings = new BaseButtonSettings();

  constructor(init: Partial<ButtonSettings> = {}) {
    this.tag = init.tag ?? this.tag;
    this.base = deepMerge(this.base, init.base);
    this.hover = deepMerge(this.hover, init.hover);
    this.active = deepMerge(this.active, init.active);
  }
}
