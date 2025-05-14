import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { TypographyTheme } from "./typographyTheme";
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
  typography: TypographyTheme;
  layout: BaseLayoutThemeClass;
  defaults: Record<string, any>;

  /**
   * Create a new CardThemeClass instance
   * @param base Base CSS classes
   */
  constructor(
    base: string = "flex overflow-hidden"
  ) {
    super();
    this.base = base;

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
    this.size = new SizeTheme(
      pxMap,
      pyMap,
      textSizeMap,
      gapMap
    );

    this.style = SimpleAppearanceTheme.createDefaultStyle();
    this.typography = TypographyTheme.createDefaultTypographyTheme();
    this.layout = CardLayoutThemeClass.createCardLayoutTheme();
    this.defaults = {
      md: true,
      default: true,
      sans: true,
      normal: true,
      column: true,
    };
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
    return new CardThemeClass(
      "flex overflow-hidden"
    );
  }
}
