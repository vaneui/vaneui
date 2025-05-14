import { BaseLayoutTheme } from "./baseLayoutTheme";

/**
 * Stack layout theme class for handling stack-specific layout styling
 */
export class StackLayoutTheme extends BaseLayoutTheme {
  /**
   * Create a stack layout theme with default settings
   */
  static createStackLayoutTheme(): StackLayoutTheme {
    // Create base layout theme
    const baseTheme = BaseLayoutTheme.createBaseLayoutTheme();

    // Create stack layout theme with base theme properties
    return new StackLayoutTheme(
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