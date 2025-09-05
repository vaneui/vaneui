import { WrapKey, ComponentKeys } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class WrapTheme extends BaseTheme implements Record<WrapKey, string> {
  flexWrap: string = "flex-wrap";
  flexNoWrap: string = "flex-nowrap";
  flexWrapReverse: string = "flex-wrap-reverse";

  constructor(initialConfig?: Partial<Record<WrapKey, string>>) {
    super();
    if (initialConfig) {
      ComponentKeys.wrap.forEach((key) => {
        if (initialConfig[key] !== undefined) {
          this[key] = initialConfig[key];
        }
      });
    }
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    const key = extractedKeys?.wrap;
    return key ? [this[key]] : [];
  }
}
