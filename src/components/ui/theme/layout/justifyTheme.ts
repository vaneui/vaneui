import { JustifyKey, JUSTIFY_KEYS } from "../../props/propKeys";
import { justifyClasses } from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class JustifyTheme extends BaseTheme {
  constructor(private classes: Record<JustifyKey, string> = justifyClasses) {
    super();
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    const key = pickKey(props, defaults, JUSTIFY_KEYS);
    return [key ? this.classes[key] : ''];
  }
}
