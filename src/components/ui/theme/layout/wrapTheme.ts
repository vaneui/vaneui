import { WrapKey, WRAP_KEYS } from "../../props/propKeys";
import { wrapClasses } from "../../classes/layoutClasses";
import { pickFirstKeyOptional } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class WrapTheme extends BaseTheme {
  constructor(private classes: Record<WrapKey, string> = wrapClasses) {
    super();
  }

  getClasses(props: Record<string, any>): string[] {
    const key = pickFirstKeyOptional(props, WRAP_KEYS);
    return key ? [this.classes[key]] : [];
  }
}
