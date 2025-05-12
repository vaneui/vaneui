import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeThemeClass";
import { SimpleAppearanceTheme } from "./appearanceThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { TypographyThemeClass } from "./typographyThemeClass";
import { GridProps, ButtonStyleProps, NoBorderProps, NoShadowProps, NoRingProps } from "../props/props";
import { VariantAppearanceTheme } from "./appearanceThemeClass";
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
   * @param size Size-related CSS classes
   * @param style Style-related CSS classes
   * @param typography Typography-related CSS classes
   * @param layout Layout-related CSS classes
   * @param defaults Default prop values
   */
  constructor(
    base: string = "grid",
    size: SizeTheme = new SizeTheme(),
    style: SimpleAppearanceTheme = new SimpleAppearanceTheme(),
    typography: TypographyThemeClass = new TypographyThemeClass(),
    layout: BaseLayoutThemeClass = BaseLayoutThemeClass.createBaseLayoutTheme(),
    defaults: Record<string, any> = {
      md: true,
      outline: true,
      transparent: true,
      noBorder: true,
      noShadow: true,
      noRing: true,
    }
  ) {
    super();
    this.base = base;
    this.size = size;
    this.style = style;
    this.typography = typography;
    this.layout = layout;
    this.defaults = defaults;
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
   * Create a default grid theme with grid-specific size maps
   */
  static createDefaultGridTheme(): GridTheme {
    // Grid-specific size maps
    const gapMap: Record<SizeKey, string> = {
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-5',
      xl: 'gap-6',
    };

    // Create size theme with grid-specific maps
    const sizeTheme = new SizeTheme(
      SizeTheme.makeSizeVariant({
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      }),
      SizeTheme.makeSizeVariant({
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      }),
      SizeTheme.makeSizeVariant({
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      }),
      SizeTheme.makeSizeVariant(gapMap)
    );

    // Create style theme with SimpleAppearanceTheme.makeSimpleStyleVariants
    const styleTheme = new SimpleAppearanceTheme(
      SimpleAppearanceTheme.makeSimpleStyleVariants(
        (bgBase, bgHover, bgActive, textBase, borderBase, ringBase) => {
          return new VariantAppearanceTheme(
            { base: bgBase, hover: bgHover, active: bgActive },
            { base: textBase },
            { base: borderBase },
            { base: ringBase }
          );
        }
      )
    );

    return new GridTheme(
      "grid",
      sizeTheme,
      styleTheme,
      new TypographyThemeClass(),
      BaseLayoutThemeClass.createBaseLayoutTheme(),
      {
        md: true,
        outline: true,
        transparent: true,
        noBorder: true,
        noShadow: true,
        noRing: true,
      }
    );
  }

  /**
   * Create a grid3 theme with 3-column grid layout
   */
  static createGrid3Theme(): GridTheme {
    const defaultTheme = GridTheme.createDefaultGridTheme();
    return new GridTheme(
      "grid grid-cols-1 md:grid-cols-3",
      defaultTheme.size,
      defaultTheme.style,
      defaultTheme.typography,
      defaultTheme.layout,
      defaultTheme.defaults
    );
  }

  /**
   * Create a grid4 theme with 4-column grid layout
   */
  static createGrid4Theme(): GridTheme {
    const defaultTheme = GridTheme.createDefaultGridTheme();
    return new GridTheme(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      defaultTheme.size,
      defaultTheme.style,
      defaultTheme.typography,
      defaultTheme.layout,
      defaultTheme.defaults
    );
  }
}