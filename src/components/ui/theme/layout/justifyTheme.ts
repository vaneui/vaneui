import { JustifyKey, JUSTIFY_KEYS } from "../../props/propKeys";
import { justifyClasses } from "../../classes/layoutClasses";
import { pickFirstKeyOptional } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/BaseTheme";

export class JustifyTheme extends BaseTheme {
  constructor(private classes: Record<JustifyKey, string> = justifyClasses) {
    super();
  }

  getClasses(props: Record<string, any>): string[] {
    const key = pickFirstKeyOptional(props, JUSTIFY_KEYS);
    return key ? [this.classes[key]] : [];
  }
}
