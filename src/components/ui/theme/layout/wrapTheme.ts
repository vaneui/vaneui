import { WrapKey, WRAP_KEYS } from "../../props/keys";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface WrapTheme extends Record<WrapKey, string> {
}

export class WrapTheme extends BaseTheme {
  public static readonly defaultClasses: Record<WrapKey, string> = {
    flexWrap: "flex-wrap",
    flexNoWrap: "flex-nowrap",
    flexWrapReverse: "flex-wrap-reverse"
  };

  constructor(initialConfig?: Partial<Record<WrapKey, string>>) {
    super();
    WRAP_KEYS.forEach((key) => {
      this[key] = initialConfig?.[key] ?? WrapTheme.defaultClasses[key];
    });
  }

  getClasses(props: Record<string, boolean>, defaults: Record<string, boolean>): string[] {
    const key = pickFirstTruthyKey(props, defaults, WRAP_KEYS);
    return key ? [this[key]] : [];
  }
}
