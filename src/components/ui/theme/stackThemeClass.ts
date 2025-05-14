import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeThemeClass";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { TypographyTheme } from "./typographyTheme";
import { StackProps, ButtonStyleProps, NoBorderProps, NoShadowProps, NoRingProps, NoPaddingProps } from "../props/props";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { SizeKey } from "../props/propKeys";
import { StackLayoutThemeClass } from "./stackLayoutThemeClass";

/**
 * Stack theme class for handling stack-specific styling
 */
export class StackThemeClass extends BaseTheme {
  base: string;
  size: SizeTheme;
  style: SimpleAppearanceTheme;
  typography: TypographyTheme;
  layout: BaseLayoutThemeClass;
  defaults: Record<string, any>;

  /**
   * Create a new StackThemeClass instance
   * @param base Base CSS classes
   */
  constructor(
    base: string = "flex"
  ) {
    super();
    this.base = base;

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
    this.size = new SizeTheme(
      pxMap,
      pyMap,
      undefined,
      gapMap
    );

    this.style = SimpleAppearanceTheme.createDefaultStyle();
    this.typography = TypographyTheme.createDefaultTypographyTheme();
    this.layout = StackLayoutThemeClass.createStackLayoutTheme();
    this.defaults = {
      md: true,
      transparent: true,
      column: true,
      flexWrap: true,
      noBorder: true,
      noShadow: true,
      noRing: true,
    };
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
    return new StackThemeClass(
      "flex"
    );
  }
}
