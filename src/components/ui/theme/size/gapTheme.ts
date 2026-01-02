import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Gap theme - only outputs the consumer class gap-(--gap).
 * CSS variable values (--gap-unit) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 */
export class GapTheme extends BaseTheme {
  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.gap === 'gap') {
      return ["gap-(--gap)"];
    }
    return [];
  }
}
