import { BaseTheme } from "./common/baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeThemeClass";
import { BaseLayoutTheme } from "./baseLayoutTheme";
import { TypographyTheme } from "./typographyTheme";
import { SizeKey } from "../props/propKeys";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";

/**
 * Section theme class for handling section-specific styling
 */
export class SectionThemeClass extends BaseTheme {
  base: string;
  size: SizeTheme;
  style: SimpleAppearanceTheme;
  typography: TypographyTheme;
  layout: BaseLayoutTheme;
  defaults: Record<string, any>;

  /**
   * Create a new SectionThemeClass instance
   * @param base Base CSS classes
   */
  constructor(
    base: string = "w-full flex flex-col"
  ) {
    super();
    this.base = base;

    // Section-specific size maps
    const gapMap: Record<SizeKey, string> = {
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-12',
      xl: 'gap-16',
    };

    const pxMap: Record<SizeKey, string> = {
      xs: 'px-5 max-lg:px-4 max-md:px-3',
      sm: 'px-6 max-lg:px-5 max-md:px-4',
      md: 'px-7 max-lg:px-6 max-md:px-5',
      lg: 'px-8 max-lg:px-7 max-md:px-6',
      xl: 'px-9 max-lg:px-8 max-md:px-7',
    };

    const pyMap: Record<SizeKey, string> = {
      xs: 'py-3',
      sm: 'py-5',
      md: 'py-8 max-md:py-5',
      lg: 'py-16 max-lg:py-14 max-md:py-12',
      xl: 'py-20 max-lg:py-16 max-md:py-12',
    };

    // Create size theme with section-specific maps
    this.size = new SizeTheme(
      pxMap,
      pyMap,
      undefined,
      gapMap
    );

    this.style = SimpleAppearanceTheme.createDefaultStyle();
    this.typography = TypographyTheme.createDefaultTypographyTheme();
    this.layout = BaseLayoutTheme.createBaseLayoutTheme();
    this.defaults = {
      md: true,
      outline: true,
      default: true,
      itemsStart: true,
      noBorder: true,
      noShadow: true,
      noRing: true,
    };
  }

  /**
   * Get all CSS classes for the section based on props
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
   * Create a default section theme with section-specific size maps
   */
  static createDefaultSectionTheme(): SectionThemeClass {
    return new SectionThemeClass(
      "w-full flex flex-col"
    );
  }
}
