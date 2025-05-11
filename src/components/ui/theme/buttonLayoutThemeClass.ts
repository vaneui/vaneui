import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { SizeKey } from "../props/propKeys";
import { roundedMap } from "../classes/buttonClasses";

/**
 * Button layout theme class for handling button-specific layout styling
 */
export class ButtonLayoutThemeClass extends BaseLayoutThemeClass {
  /**
   * Create a new ButtonLayoutThemeClass instance
   * @param radius Button-specific rounded classes by size
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
   * Create a button layout theme with button-specific rounded classes
   */
  static createButtonLayoutTheme(): ButtonLayoutThemeClass {
    // Create base layout theme
    const baseTheme = BaseLayoutThemeClass.createBaseLayoutTheme();

    // Create button layout theme with rounded classes
    return new ButtonLayoutThemeClass(
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