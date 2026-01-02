import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Gap theme - outputs the consumer class gap-(--gap).
 * CSS variable values (--gap-unit) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 *
 * For responsive components (Section), use createResponsive()
 * which adds Tailwind classes to switch between breakpoint-specific variables.
 */
export class GapTheme extends BaseTheme {
  private readonly responsive: boolean;

  constructor(responsive: boolean = false) {
    super();
    this.responsive = responsive;
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.gap === 'gap') {
      if (this.responsive) {
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

  /**
   * Creates a responsive gap theme for components like Section.
   * Adds Tailwind classes to switch --gap-unit based on screen size.
   */
  static createResponsive(): GapTheme {
    return new GapTheme(true);
  }
}
