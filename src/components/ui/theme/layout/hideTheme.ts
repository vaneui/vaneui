import { HideKey, HIDE_KEYS } from "../../props/keys";
import { hideClasses } from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class HideTheme extends BaseTheme {
  constructor(private classes: Record<HideKey, string> = hideClasses) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, HIDE_KEYS);
    return [key ? this.classes[key] : ''];
  }
}
