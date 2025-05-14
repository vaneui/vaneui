import { BaseTheme } from "./common/baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeThemeClass";
import { BaseLayoutTheme } from "./baseLayoutTheme";
import { TypographyTheme } from "./typographyTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";

/**
 * Grid theme class for handling grid-specific styling
 */
export class GridTheme extends BaseTheme {
  base: string;
  size: SizeTheme;
  style: SimpleAppearanceTheme;
  typography: TypographyTheme;
  layout: BaseLayoutTheme;
  defaults: Record<string, any>;

  /**
   * Create a new GridThemeClass instance
   * @param base Base CSS classes
   */
  constructor(base: string = "grid") {
    super();
    this.base = base;
    this.size = new SizeTheme(
      undefined,
      undefined,
      undefined,
      {
        xs: 'gap-2',
        sm: 'gap-3',
        md: 'gap-4',
        lg: 'gap-5',
        xl: 'gap-6',
      });
    this.style = SimpleAppearanceTheme.createDefaultStyle();
    this.typography = TypographyTheme.createDefaultTypographyTheme();
    this.layout = BaseLayoutTheme.createBaseLayoutTheme();
    this.defaults = {
      md: true,
      outline: true,
      transparent: true,
      noBorder: true,
      noShadow: true,
      noRing: true,
    };
  }

  /**
   * Get all CSS classes for the grid based on props
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

  /**
   * Create a grid3 theme with 3-column grid layout
   */
  static createGrid3Theme(): GridTheme {
    return new GridTheme("grid grid-cols-1 md:grid-cols-3");
  }

  /**
   * Create a grid4 theme with 4-column grid layout
   */
  static createGrid4Theme(): GridTheme {
    return new GridTheme("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4");
  }
}