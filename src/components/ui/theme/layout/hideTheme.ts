import { HideKey, HIDE_KEYS } from "../../props/propKeys";
import { hideClasses } from "../../classes/layoutClasses";
import { pickFirstKeyOptional } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class HideTheme extends BaseTheme {
  constructor(private classes: Record<HideKey, string> = hideClasses) {
    super();
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    // First look for an explicit value in the real props
    const explicitKey = pickFirstKeyOptional(props, HIDE_KEYS);

    // If none was found, check defaults
    const key = explicitKey || pickFirstKeyOptional(defaults, HIDE_KEYS);

    return key ? [this.classes[key]] : [];
  }
}
