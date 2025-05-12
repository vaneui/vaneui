import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { TypographyThemeClass } from "./typographyThemeClass";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { SizeKey } from "../props/propKeys";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";

/**
 * Container theme class for handling container-specific styling
 */
export class ContainerThemeClass extends BaseTheme {
  base: string;
  size: SizeTheme;
  style: SimpleAppearanceTheme;
  typography: TypographyThemeClass;
  layout: BaseLayoutThemeClass;
  defaults: Record<string, any>;

  /**
   * Create a new ContainerThemeClass instance
   * @param base Base CSS classes
   */
  constructor(
    base: string = "flex flex-col mx-auto w-full"
  ) {
    super();
    this.base = base;
    this.size = new SizeTheme(
      {
        xs: 'max-w-3xl',
        sm: 'max-w-4xl',
        md: 'max-w-5xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
      }, // TODO: change the logic
      undefined,
      undefined,
      {
        xs: 'gap-2 max-lg:gap-1',
        sm: 'gap-4 max-lg:gap-3 max-md:gap-2',
        md: 'gap-6 max-lg:gap-5 max-md:gap-4',
        lg: 'gap-8 max-lg:gap-7 max-md:gap-6',
        xl: 'gap-10 max-lg:gap-9 max-md:gap-8',
      }
    );
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
    this.layout = BaseLayoutThemeClass.createBaseLayoutTheme();
    this.defaults = {
      md: true,
      outline: true,
      transparent: true,
      itemsStart: true,
      noBorder: true,
      noShadow: true,
      noRing: true,
    };
  }

  /**
   * Get all CSS classes for the container based on props
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
   * Create a default container theme with container-specific size maps
   */
  static createDefaultContainerTheme(): ContainerThemeClass {
    return new ContainerThemeClass(
      "flex flex-col mx-auto w-full",
    );
  }
}
