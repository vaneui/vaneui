import { BaseButtonSettings } from "./baseButtonSettings";

export class ButtonSettings {
  tag: string = "button";

  base: BaseButtonSettings = new BaseButtonSettings();
  hover: BaseButtonSettings = new BaseButtonSettings();
  active: BaseButtonSettings = new BaseButtonSettings();

  constructor(init: Partial<ButtonSettings> = {}) {
    this.tag = init.tag ?? this.tag;
    this.base = new BaseButtonSettings({...this.base, ...init.base});
    this.hover = new BaseButtonSettings({...this.hover, ...init.hover});
    this.active = new BaseButtonSettings({...this.active, ...init.active});
  }
}