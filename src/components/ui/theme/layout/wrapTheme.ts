import { WrapKey, WRAP_KEYS } from "../../props/propKeys";
import { wrapClasses } from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class WrapTheme extends BaseTheme {
  constructor(private classes: Record<WrapKey, string> = wrapClasses) {
    super();
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickKey(props, defaults, WRAP_KEYS);
    return key ? [this.classes[key]] : [];
  }
}
