import { JustifyKey, JUSTIFY_KEYS } from "../../props/propKeys";
import { justifyClasses } from "../../classes/layoutClasses";
import { pickFirstKeyOptional } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class JustifyTheme extends BaseTheme {
  constructor(private classes: Record<JustifyKey, string> = justifyClasses) {
    super();
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    // First look for an explicit value in the real props
    const explicitKey = pickFirstKeyOptional(props, JUSTIFY_KEYS);

    // If none was found, check defaults
    const key = explicitKey || pickFirstKeyOptional(defaults, JUSTIFY_KEYS);

    return key ? [this.classes[key]] : [];
  }
}
