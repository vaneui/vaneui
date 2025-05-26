import { WrapKey, WRAP_KEYS } from "../../props/propKeys";
import { wrapClasses } from "../../classes/layoutClasses";
import { pickKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export class WrapTheme implements BaseTheme {
  constructor(private classes: Record<WrapKey, string> = wrapClasses) {
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    const key = pickKey(props, defaults, WRAP_KEYS);
    return key ? [this.classes[key]] : [];
  }
}
