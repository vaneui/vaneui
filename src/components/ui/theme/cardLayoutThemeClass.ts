import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { SizeKey } from "../props/propKeys";

/**
 * Card layout theme class for handling card-specific layout styling
 */
export class CardLayoutThemeClass extends BaseLayoutThemeClass {
  /**
   * Create a new CardLayoutThemeClass instance
   * @param radius Card-specific rounded classes by size
   * @param hide Hide classes by hide key
   * @param position Position classes by position key
   * @param shadow Shadow classes by mode and size
   * @param border Border classes by mode
   * @param ring Ring classes by mode
   * @param flags Flag-related classes
   * @param reverse Reverse direction classes
   * @param direction Direction classes by direction key
   * @param items Items alignment classes by items key
   * @param justify Justify content classes by justify key
   * @param wrap Wrap classes by wrap key
   * @param breakpoint Breakpoint classes by breakpoint key
   */
  constructor(
    radius: Record<SizeKey, string> = {
      xs: 'rounded-sm',
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
    },
    ...args: ConstructorParameters<typeof BaseLayoutThemeClass>
  ) {
    super(...args);
    this.radius = radius;
  }

  /**
   * Create a card layout theme with card-specific rounded classes
   */
  static createCardLayoutTheme(): CardLayoutThemeClass {
    // Card-specific rounded classes
    const roundedMap: Record<SizeKey, string> = {
      xs: 'rounded-sm',
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
    };

    // Create base layout theme
    const baseTheme = BaseLayoutThemeClass.createBaseLayoutTheme();

    // Create card layout theme with rounded classes
    return new CardLayoutThemeClass(
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
