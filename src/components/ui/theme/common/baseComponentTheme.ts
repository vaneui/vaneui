import { BaseTheme } from "./baseTheme";
import { SizeTheme } from "../size/sizeTheme";
import { BaseLayoutTheme } from "../layout/baseLayoutTheme";
import { TypographyTheme } from "../typography/typographyTheme";
import { TypographyComponentProps } from "../../props/props";

/**
 * Base component theme class that combines all theme aspects
 */
export class BaseComponentTheme<T extends Partial<TypographyComponentProps>> extends BaseTheme {
  base: string;
  size: SizeTheme;
  typography: TypographyTheme;
  layout: BaseLayoutTheme;
  defaults: Partial<Record<keyof T, boolean>>;

  constructor(
    base: string = '',
    size: SizeTheme = new SizeTheme(),
    typography: TypographyTheme = TypographyTheme.createDefaultTypographyTheme(),
    layout: BaseLayoutTheme = BaseLayoutTheme.createBaseLayoutTheme(),
    defaults: Partial<Record<keyof T, boolean>> = {}
  ) {
    super();
    this.base = base;
    this.size = size;
    this.typography = typography;
    this.layout = layout;
    this.defaults = defaults;
  }

  /**
   * Get all CSS classes for the component based on props
   * @param props Component props
   * @returns CSS classes as a string
   */
  getClasses(props: Partial<Record<keyof T, boolean>>): string {
    const classes = [
      this.base,
      this.typography.getClasses(props),
      this.layout.getClasses(props),
      this.size.getClasses(props)
    ];

    return classes.join(' ');
  }
}

