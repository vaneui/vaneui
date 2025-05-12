import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeThemeClass";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { TypographyThemeClass } from "./typographyThemeClass";
import { ColProps, ButtonStyleProps, NoBorderProps, NoShadowProps, NoRingProps } from "../props/props";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { SizeKey } from "../props/propKeys";
import { ColLayoutThemeClass } from "./colLayoutThemeClass";

/**
 * Col theme class for handling column-specific styling
 */
export class ColThemeClass extends BaseTheme {
  base: string;
  size: SizeTheme;
  style: SimpleAppearanceTheme;
  typography: TypographyThemeClass;
  layout: BaseLayoutThemeClass;
  defaults: Record<string, any>;

  /**
   * Create a new ColThemeClass instance
   * @param base Base CSS classes
   */
  constructor(
    base: string = "flex flex-col"
  ) {
    super();
    this.base = base;

    // Col-specific size maps
    const gapMap: Record<SizeKey, string> = {
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-5',
      xl: 'gap-6',
    };

    // Create size theme with col-specific maps
    this.size = new SizeTheme(
      undefined,
      undefined,
      undefined,
      gapMap
    );

    // Create style theme with SimpleAppearanceTheme.makeSimpleStyleVariants
    this.style = new SimpleAppearanceTheme(
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

    this.typography = TypographyThemeClass.createDefaultTypographyTheme();
    this.layout = ColLayoutThemeClass.createColLayoutTheme();
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
   * Get all CSS classes for the column based on props
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
   * Create a default column theme with column-specific size maps
   */
  static createDefaultColTheme(): ColThemeClass {
    return new ColThemeClass(
      "flex flex-col"
    );
  }
}
