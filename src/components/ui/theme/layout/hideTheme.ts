import { HideKey, HIDE_KEYS } from "../../props/propKeys";
import { hideClasses } from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class HideTheme implements BaseTheme {
  constructor(private classes: Record<HideKey, string> = hideClasses) {
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    const key = pickKey(props, defaults, HIDE_KEYS);
    return [key ? this.classes[key] : ''];
  }
}
