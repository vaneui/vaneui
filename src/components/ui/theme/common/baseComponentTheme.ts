import { BaseTheme } from "./baseTheme";
import { Mode } from "../../props/mode";
import { SizeTheme } from "../sizeTheme";
import { BaseLayoutTheme } from "../layout/baseLayoutTheme";
import { TypographyTheme } from "../typographyTheme";

/**
 * Base component theme class that combines all theme aspects
 */
export class BaseComponentTheme extends BaseTheme {
  base: string;
  size: SizeTheme;
  typography: TypographyTheme;
  layout: BaseLayoutTheme;
  defaults: Record<string, boolean>;

  constructor(
    base: string = '',
    size: SizeTheme = new SizeTheme(),
    typography: TypographyTheme = TypographyTheme.createDefaultTypographyTheme(),
    layout: BaseLayoutTheme = BaseLayoutTheme.createBaseLayoutTheme(),
    defaults: Record<string, boolean> = {}
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
   * @param mode Current mode (base, hover, active)
   * @returns CSS classes as a string
   */
  getClasses(props: Record<string, any>, mode: Mode = 'base'): string {
    const classes = [
      this.base,
      this.size.getClasses(props, mode),
      this.typography.getClasses(props, mode),
      this.layout.getClasses(props, mode)
    ];

    return classes.filter(Boolean).join(' ');
  }
}

