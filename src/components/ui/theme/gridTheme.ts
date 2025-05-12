import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeThemeClass";
import { SimpleAppearanceTheme } from "./appearanceThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { TypographyThemeClass } from "./typographyThemeClass";
import { GridProps, ButtonStyleProps, NoBorderProps, NoShadowProps, NoRingProps } from "../props/props";
import { AppearanceTheme } from "./appearanceThemeClass";
import { SizeKey } from "../props/propKeys";

/**
 * Grid theme class for handling grid-specific styling
 */
export class GridTheme extends BaseTheme {
  base: string;
  size: SizeTheme;
  style: SimpleAppearanceTheme;
  typography: TypographyThemeClass;
  layout: BaseLayoutThemeClass;
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
    this.style = new SimpleAppearanceTheme(
      SimpleAppearanceTheme.makeSimpleStyleVariants(
        (bgBase, bgHover, bgActive, textBase, borderBase, ringBase) => {
          return new AppearanceTheme(
            {base: bgBase, hover: bgHover, active: bgActive},
            {base: textBase},
            {base: borderBase},
            {base: ringBase}
          );
        }
      )
    );
    this.typography = new TypographyThemeClass();
    this.layout = BaseLayoutThemeClass.createBaseLayoutTheme();
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