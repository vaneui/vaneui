import { BaseLayoutTheme } from "./baseLayoutTheme";

/**
 * Row layout theme class for handling row-specific layout styling
 */
export class RowLayoutThemeClass extends BaseLayoutTheme {
  /**
   * Create a new RowLayoutThemeClass instance with extended direction properties
   */
  constructor(
    ...args: ConstructorParameters<typeof BaseLayoutTheme>
  ) {
    super(...args);
    
    // Extend direction with row specific classes
    this.direction = {
      ...this.direction,
      row: "flex-row",
    };
  }

  /**
   * Create a row layout theme with row-specific direction classes
   */
  static createRowLayoutTheme(): RowLayoutThemeClass {
    // Create base layout theme
    const baseTheme = BaseLayoutTheme.createBaseLayoutTheme();

    // Create row layout theme with extended direction
    return new RowLayoutThemeClass(
      baseTheme.hide,
      baseTheme.position,
      baseTheme.shadow,
      baseTheme.border,
      baseTheme.ring,
      baseTheme.flags,
      baseTheme.reverse,
      {
        ...baseTheme.direction,
        row: "flex-row",
      },
      baseTheme.items,
      baseTheme.justify,
      baseTheme.wrap,
      baseTheme.breakpoint,
      baseTheme.radius
    );
  }
}