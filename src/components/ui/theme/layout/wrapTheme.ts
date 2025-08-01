import { WrapKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

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
    ComponentKeys.wrap.forEach((key) => {
      this[key as WrapKey] = initialConfig?.[key as WrapKey] ?? WrapTheme.defaultClasses[key as WrapKey];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.wrap;
    return key ? [this[key]] : [];
  }
}
