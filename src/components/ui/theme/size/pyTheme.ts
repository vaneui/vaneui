import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Vertical padding theme - outputs the consumer class py-(--py).
 * CSS variable values (--py-unit) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 *
 * For responsive components (Section), use createResponsive()
 * which adds Tailwind classes to switch between breakpoint-specific variables.
 */
export class PyTheme extends BaseTheme {
  private readonly responsive: boolean;

  constructor(responsive: boolean = false) {
    super();
    this.responsive = responsive;
  }

  getClasses(extractedKeys: CategoryProps): string[] {
    if (extractedKeys?.padding === 'padding' || extractedKeys?.padding === undefined) {
      if (this.responsive) {
        return [
          "[--py-unit:var(--py-unit-desktop)]",
          "max-laptop:[--py-unit:var(--py-unit-laptop)]",
          "max-tablet:[--py-unit:var(--py-unit-tablet)]",
          "py-(--py)"
        ];
      }
      return ["py-(--py)"];
    }
    return [];
  }

  /**
   * Creates a responsive py theme for components like Section.
   * Adds Tailwind classes to switch --py-unit based on screen size.
   */
  static createResponsive(): PyTheme {
    return new PyTheme(true);
  }
}
