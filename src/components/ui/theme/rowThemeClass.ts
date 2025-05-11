import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeThemeClass";
import { SimpleAppearanceTheme } from "./appearanceThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { TypographyThemeClass } from "./typographyThemeClass";
import { RowProps, ButtonStyleProps, NoBorderProps, NoShadowProps, NoRingProps } from "../props/props";
import { VariantAppearanceTheme } from "./appearanceThemeClass";
import { SizeKey } from "../props/propKeys";
import { RowLayoutThemeClass } from "./rowLayoutThemeClass";

/**
 * Row theme class for handling row-specific styling
 */
export class RowThemeClass extends BaseTheme {
  base: string;
  size: SizeTheme;
  style: SimpleAppearanceTheme;
  typography: TypographyThemeClass;
  layout: BaseLayoutThemeClass;
  defaults: Record<string, any>;

  /**
   * Create a new RowThemeClass instance
   * @param base Base CSS classes
   * @param size Size-related CSS classes
   * @param style Style-related CSS classes
   * @param typography Typography-related CSS classes
   * @param layout Layout-related CSS classes
   * @param defaults Default prop values
   */
  constructor(
    base: string = "flex flex-row",
    size: SizeTheme = new SizeTheme(),
    style: SimpleAppearanceTheme = new SimpleAppearanceTheme(),
    typography: TypographyThemeClass = new TypographyThemeClass(),
    layout: BaseLayoutThemeClass = RowLayoutThemeClass.createRowLayoutTheme(),
    defaults: Record<string, any> = {
      md: true,
      outline: true,
      transparent: true,
      itemsCenter: true,
      flexWrap: true,
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
   * Get all CSS classes for the row based on props
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
   * Create a default row theme with row-specific size maps
   */
  static createDefaultRowTheme(): RowThemeClass {
    // Row-specific size maps
    const gapMap: Record<SizeKey, string> = {
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-5',
      xl: 'gap-6',
    };

    // Create size theme with row-specific maps
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

    return new RowThemeClass(
      "flex flex-row",
      sizeTheme,
      styleTheme,
      new TypographyThemeClass(),
      RowLayoutThemeClass.createRowLayoutTheme(),
      {
        md: true,
        outline: true,
        transparent: true,
        itemsCenter: true,
        flexWrap: true,
        noBorder: true,
        noShadow: true,
        noRing: true,
      }
    );
  }
}