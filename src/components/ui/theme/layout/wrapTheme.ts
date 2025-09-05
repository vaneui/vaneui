import { WrapKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class WrapTheme extends BaseTheme implements Record<WrapKey, string> {
  flexWrap: string = "flex-wrap";
  flexNoWrap: string = "flex-nowrap";
  flexWrapReverse: string = "flex-wrap-reverse";


  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.wrap ? [this[extractedKeys.wrap]] : [];
  }
}
