import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { TypographyThemeClass } from "./typographyThemeClass";
import { StyleAppearanceTheme } from "./appearance/styleAppearanceTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";

/**
 * Base component theme class that combines all theme aspects
 */
export class ComponentThemeClass extends BaseTheme {
  base: string;
  size: SizeTheme;
  typography: TypographyThemeClass;
  layout: BaseLayoutThemeClass;
  defaults: Record<string, any>;

  constructor(
    base: string = '',
    size: SizeTheme = new SizeTheme(),
    typography: TypographyThemeClass = new TypographyThemeClass(),
    layout: BaseLayoutThemeClass = BaseLayoutThemeClass.createBaseLayoutTheme(),
    defaults: Record<string, any> = {}
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

/**
 * Component theme class for components with style variants (button, chip, badge)
 */
export class StyleVariantComponentThemeClass extends ComponentThemeClass {
  style: StyleAppearanceTheme;

  constructor(
    base: string = '',
    size: SizeTheme = new SizeTheme(),
    style: StyleAppearanceTheme = new StyleAppearanceTheme(),
    typography: TypographyThemeClass = new TypographyThemeClass(),
    layout: BaseLayoutThemeClass = BaseLayoutThemeClass.createBaseLayoutTheme(),
    defaults: Record<string, any> = {}
  ) {
    super(base, size, typography, layout, defaults);
    this.style = style;
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
      this.style.getClasses(props, mode),
      this.typography.getClasses(props, mode),
      this.layout.getClasses(props, mode)
    ];

    return classes.filter(Boolean).join(' ');
  }

}

/**
 * Component theme class for components with simple appearance (no style variants)
 */
export class SimpleComponentThemeClass extends ComponentThemeClass {
  style: SimpleAppearanceTheme;

  constructor(
    base: string = '',
    size: SizeTheme = new SizeTheme(),
    style: SimpleAppearanceTheme = new SimpleAppearanceTheme(),
    typography: TypographyThemeClass = new TypographyThemeClass(),
    layout: BaseLayoutThemeClass = BaseLayoutThemeClass.createBaseLayoutTheme(),
    defaults: Record<string, any> = {}
  ) {
    super(base, size, typography, layout, defaults);
    this.style = style;
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
      this.style.getClasses(props, mode),
      this.typography.getClasses(props, mode),
      this.layout.getClasses(props, mode)
    ];

    return classes.filter(Boolean).join(' ');
  }

}
