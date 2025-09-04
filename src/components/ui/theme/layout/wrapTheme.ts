import { WrapKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export interface WrapTheme extends Record<WrapKey, string> {
}

export class WrapTheme extends BaseTheme {
  constructor(initialConfig?: Partial<Record<WrapKey, string>>) {
    super();
    ComponentKeys.wrap.forEach((key) => {
      this[key] = initialConfig?.[key] ?? {
        flexWrap: "flex-wrap",
        flexNoWrap: "flex-nowrap",
        flexWrapReverse: "flex-wrap-reverse"
      }[key];
    });
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.wrap;
    return key ? [this[key]] : [];
  }
}
