import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { DirectionKey } from "../props/propKeys";

/**
 * Col layout theme class for handling column-specific layout styling
 */
export class ColLayoutThemeClass extends BaseLayoutThemeClass {
  /**
   * Create a new ColLayoutThemeClass instance with extended direction properties
   */
  constructor(
    ...args: ConstructorParameters<typeof BaseLayoutThemeClass>
  ) {
    super(...args);
    
    // Extend direction with column and row specific classes
    this.direction = {
      ...this.direction,
      column: "flex-col",
      row: "flex-row",
    };
  }

  /**
   * Create a column layout theme with column-specific direction classes
   */
  static createColLayoutTheme(): ColLayoutThemeClass {
    // Create base layout theme
    const baseTheme = BaseLayoutThemeClass.createBaseLayoutTheme();

    // Create column layout theme with extended direction
    return new ColLayoutThemeClass(
      baseTheme.hide,
      baseTheme.position,
      baseTheme.shadow,
      baseTheme.border,
      baseTheme.ring,
      baseTheme.flags,
      baseTheme.reverse,
      {
        ...baseTheme.direction,
        column: "flex-col",
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