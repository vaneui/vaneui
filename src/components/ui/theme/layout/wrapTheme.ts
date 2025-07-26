import { WrapKey, WRAP_KEYS } from "../../props/keys";
import { BaseTheme } from "../common/baseTheme";
import type { BasePropsStructure } from "../../props/keys/";

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

  getClasses(extractedKeys: BasePropsStructure): string[] {
    const key = extractedKeys?.wrap as WrapKey;
    return key ? [this[key]] : [];
  }
}
