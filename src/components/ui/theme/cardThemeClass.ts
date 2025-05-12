import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { TypographyThemeClass } from "./typographyThemeClass";
import { SizeKey } from "../props/propKeys";
import { CardLayoutThemeClass } from "./cardLayoutThemeClass";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";

/**
 * Card theme class for handling card-specific styling
 */
export class CardThemeClass extends BaseTheme {
  base: string;
  size: SizeTheme;
  style: SimpleAppearanceTheme;
  typography: TypographyThemeClass;
  layout: BaseLayoutThemeClass;
  defaults: Record<string, any>;

  /**
   * Create a new CardThemeClass instance
   * @param base Base CSS classes
   * @param size Size-related CSS classes
   * @param style Style-related CSS classes
   * @param typography Typography-related CSS classes
   * @param layout Layout-related CSS classes
   * @param defaults Default prop values
   */
  constructor(
    base: string = "flex overflow-hidden",
    size: SizeTheme = new SizeTheme(),
    style: SimpleAppearanceTheme = new SimpleAppearanceTheme(),
    typography: TypographyThemeClass = new TypographyThemeClass(),
    layout: BaseLayoutThemeClass = CardLayoutThemeClass.createCardLayoutTheme(),
    defaults: Record<string, any> = {
      md: true,
      default: true,
      sans: true,
      normal: true,
      column: true,
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
   * Get all CSS classes for the card based on props
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
   * Create a default card theme with card-specific size maps
   */
  static createDefaultCardTheme(): CardThemeClass {
    // Card-specific size maps
    const pxMap: Record<SizeKey, string> = {
      xs: 'px-3',
      sm: 'px-4',
      md: 'px-5',
      lg: 'px-6',
      xl: 'px-8',
    };

    const pyMap: Record<SizeKey, string> = {
      xs: 'py-2',
      sm: 'py-3',
      md: 'py-4',
      lg: 'py-5',
      xl: 'py-6',
    };

    const textSizeMap: Record<SizeKey, string> = {
      xs: 'text-sm',
      sm: 'text-base',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };

    const gapMap: Record<SizeKey, string> = {
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-5',
      xl: 'gap-6',
    };

    // Create size theme with card-specific maps
    const sizeTheme = new SizeTheme(
      pxMap,
      pyMap,
      textSizeMap,
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

    return new CardThemeClass(
      "flex overflow-hidden",
      sizeTheme,
      styleTheme,
      new TypographyThemeClass(),
      CardLayoutThemeClass.createCardLayoutTheme(),
      {
        md: true,
        default: true,
        sans: true,
        normal: true,
        column: true,
      }
    );
  }
}
