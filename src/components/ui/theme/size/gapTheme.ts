import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Gap theme - outputs the consumer class gap-(--gap).
 * CSS variable values (--gap-unit) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 *
 * When the 'responsive' prop is set, adds Tailwind classes to switch
 * between breakpoint-specific variables for automatic size adaptation.
 */
export class GapTheme extends BaseTheme {
  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.gap === 'gap') {
      if (extractedKeys?.responsive === 'responsive') {
        return [
          "[--gap-unit:var(--gap-unit-desktop)]",
          "max-laptop:[--gap-unit:var(--gap-unit-laptop)]",
          "max-tablet:[--gap-unit:var(--gap-unit-tablet)]",
          "gap-(--gap)"
        ];
      }
      return ["gap-(--gap)"];
    }
    return [];
  }
}
