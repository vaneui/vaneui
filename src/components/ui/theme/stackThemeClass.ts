import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeThemeClass";
import { SimpleAppearanceTheme } from "./appearanceThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { TypographyThemeClass } from "./typographyThemeClass";
import { StackProps, ButtonStyleProps, NoBorderProps, NoShadowProps, NoRingProps, NoPaddingProps } from "../props/props";
import { AppearanceTheme } from "./appearanceThemeClass";
import { SizeKey } from "../props/propKeys";
import { StackLayoutThemeClass } from "./stackLayoutThemeClass";

/**
 * Stack theme class for handling stack-specific styling
 */
export class StackThemeClass extends BaseTheme {
  base: string;
  size: SizeTheme;
  style: SimpleAppearanceTheme;
  typography: TypographyThemeClass;
  layout: BaseLayoutThemeClass;
  defaults: Record<string, any>;

  /**
   * Create a new StackThemeClass instance
   * @param base Base CSS classes
   * @param size Size-related CSS classes
   * @param style Style-related CSS classes
   * @param typography Typography-related CSS classes
   * @param layout Layout-related CSS classes
   * @param defaults Default prop values
   */
  constructor(
    base: string = "flex",
    size: SizeTheme = new SizeTheme(),
    style: SimpleAppearanceTheme = new SimpleAppearanceTheme(),
    typography: TypographyThemeClass = new TypographyThemeClass(),
    layout: BaseLayoutThemeClass = StackLayoutThemeClass.createStackLayoutTheme(),
    defaults: Record<string, any> = {
      md: true,
      transparent: true,
      column: true,
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
   * Get all CSS classes for the stack based on props
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
   * Create a default stack theme with stack-specific size maps
   */
  static createDefaultStackTheme(): StackThemeClass {
    // Stack-specific size maps
    const gapMap: Record<SizeKey, string> = {
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-5',
      xl: 'gap-6',
    };

    const pxMap: Record<SizeKey, string> = {
      xs: 'px-2',
      sm: 'px-3',
      md: 'px-4',
      lg: 'px-5',
      xl: 'px-6',
    };

    const pyMap: Record<SizeKey, string> = {
      xs: 'py-2',
      sm: 'py-3',
      md: 'py-4',
      lg: 'py-5',
      xl: 'py-6',
    };

    // Create size theme with stack-specific maps
    const sizeTheme = new SizeTheme(
      pxMap,
      pyMap,
      undefined,
      gapMap
    );

    // Create style theme with SimpleAppearanceTheme.makeSimpleStyleVariants
    const styleTheme = new SimpleAppearanceTheme(
      SimpleAppearanceTheme.makeSimpleStyleVariants(
        (bgBase, bgHover, bgActive, textBase, borderBase, ringBase) => {
          return new AppearanceTheme(
            { base: bgBase, hover: bgHover, active: bgActive },
            { base: textBase },
            { base: borderBase },
            { base: ringBase }
          );
        }
      )
    );

    return new StackThemeClass(
      "flex",
      sizeTheme,
      styleTheme,
      new TypographyThemeClass(),
      StackLayoutThemeClass.createStackLayoutTheme(),
      {
        md: true,
        transparent: true,
        column: true,
        flexWrap: true,
        noBorder: true,
        noShadow: true,
        noRing: true,
      }
    );
  }
}