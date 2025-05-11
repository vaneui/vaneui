import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { SizeKey } from "../props/propKeys";
import { roundedMap } from "../classes/badgeClasses";

/**
 * Badge layout theme class for handling badge-specific layout styling
 */
export class BadgeLayoutThemeClass extends BaseLayoutThemeClass {
  /**
   * Create a new BadgeLayoutThemeClass instance
   * @param radius Badge-specific rounded classes by size
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
    radius: Record<SizeKey, string> = roundedMap,
    ...args: ConstructorParameters<typeof BaseLayoutThemeClass>
  ) {
    super(...args);
    this.radius = radius;
  }

  /**
   * Create a badge layout theme with badge-specific rounded classes
   */
  static createBadgeLayoutTheme(): BadgeLayoutThemeClass {
    // Create base layout theme
    const baseTheme = BaseLayoutThemeClass.createBaseLayoutTheme();

    // Create badge layout theme with rounded classes
    return new BadgeLayoutThemeClass(
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