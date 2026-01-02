import { BaseTheme } from "../common/baseTheme";
import type { CategoryProps } from "../../props";

/**
 * Font size theme - outputs the consumer class text-(length:--fs).
 * CSS variable values (--fs-unit) are set via CSS rules in vars.css
 * using semantic classes and data attributes.
 *
 * For responsive components (Title, SectionTitle, PageTitle), use createResponsive()
 * which adds Tailwind classes to switch between breakpoint-specific variables.
 */
export class FontSizeTheme extends BaseTheme {
  private readonly responsive: boolean;

  constructor(responsive: boolean = false) {
    super();
    this.responsive = responsive;
  }

  getClasses(_extractedKeys: CategoryProps): string[] {
    if (this.responsive) {
      return [
        "[--fs-unit:var(--fs-unit-desktop)]",
        "max-laptop:[--fs-unit:var(--fs-unit-laptop)]",
        "max-tablet:[--fs-unit:var(--fs-unit-tablet)]",
        "text-(length:--fs)"
      ];
    }
    return ["text-(length:--fs)"];
  }

  /**
   * Creates a responsive font size theme for components like Title, SectionTitle, PageTitle.
   * Adds Tailwind classes to switch --fs-unit based on screen size.
   */
  static createResponsive(): FontSizeTheme {
    return new FontSizeTheme(true);
  }
}
