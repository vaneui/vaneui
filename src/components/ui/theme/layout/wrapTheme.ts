import { WrapKey } from "../../props";
import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

export class WrapTheme extends BaseTheme implements Record<WrapKey, string> {
  /** Allow flex items to wrap to new lines */
  flexWrap: string = "flex-wrap";
  /** Prevent flex items from wrapping - keep on single line */
  flexNoWrap: string = "flex-nowrap";
  /** Allow flex items to wrap in reverse order */
  flexWrapReverse: string = "flex-wrap-reverse";

  getClasses(extractedKeys: CategoryProps): string[] {
    return extractedKeys?.wrap ? [this[extractedKeys.wrap]] : [];
  }
}
