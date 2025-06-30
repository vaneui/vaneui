import { WrapKey, WRAP_KEYS } from "../../props/keys";
import { wrapClasses } from "../../classes/layoutClasses";
import { pickFirstTruthyKey } from "../../../utils/componentUtils";
import { BaseTheme } from "../common/baseTheme";

export interface WrapTheme extends Record<WrapKey, string> {}

export class WrapTheme extends BaseTheme {
  public static readonly defaultClasses: Record<WrapKey, string> = wrapClasses;

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
