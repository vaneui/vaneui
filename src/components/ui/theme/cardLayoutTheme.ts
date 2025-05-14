import { BaseLayoutTheme } from "./baseLayoutTheme";
import { SizeKey } from "../props/propKeys";

/**
 * Card layout theme class for handling card-specific layout styling
 */
export class CardLayoutTheme extends BaseLayoutTheme {
  /**
   * Create a new CardLayoutThemeClass instance
   * @param radius Card-specific rounded classes by size
   */
  constructor(
    radius: Record<SizeKey, string> = {
      xs: 'rounded-sm',
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
    },
    ...args: ConstructorParameters<typeof BaseLayoutTheme>
  ) {
    super(...args);
    this.radius = radius;
  }

  /**
   * Create a card layout theme with card-specific rounded classes
   */
  static createCardLayoutTheme(): CardLayoutTheme {
    // Card-specific rounded classes
    const roundedMap: Record<SizeKey, string> = {
      xs: 'rounded-sm',
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
    };

    // Create base layout theme
    const baseTheme = BaseLayoutTheme.createBaseLayoutTheme();

    // Create card layout theme with rounded classes
    return new CardLayoutTheme(
      roundedMap,
      baseTheme.hide,
      baseTheme.position,
      baseTheme.shadow,
      baseTheme.border,
      baseTheme.ring,
      baseTheme.flags,
      baseTheme.reverse,
      baseTheme.direction,
      baseTheme.items,
      baseTheme.justify,
      baseTheme.wrap,
      baseTheme.breakpoint
    );
  }
}
