import { BaseLayoutTheme } from "./baseLayoutTheme";

/**
 * Stack layout theme class for handling stack-specific layout styling
 */
export class StackLayoutThemeClass extends BaseLayoutTheme {
  /**
   * Create a stack layout theme with default settings
   */
  static createStackLayoutTheme(): StackLayoutThemeClass {
    // Create base layout theme
    const baseTheme = BaseLayoutTheme.createBaseLayoutTheme();

    // Create stack layout theme with base theme properties
    return new StackLayoutThemeClass(
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
      baseTheme.breakpoint,
      baseTheme.radius
    );
  }
}