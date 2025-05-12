import { BaseTheme } from "./baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { TypographyThemeClass } from "./typographyThemeClass";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";

/**
 * Divider theme class for handling divider-specific styling
 */
export class DividerThemeClass extends BaseTheme {
  base: string;
  size: SizeTheme;
  style: SimpleAppearanceTheme;
  typography: TypographyThemeClass;
  layout: BaseLayoutThemeClass;
  defaults: Record<string, any>;

  /**
   * Create a new DividerThemeClass instance
   * @param base Base CSS classes
   * @param size Size-related CSS classes
   * @param style Style-related CSS classes
   * @param typography Typography-related CSS classes
   * @param layout Layout-related CSS classes
   * @param defaults Default prop values
   */
  constructor(
    base: string = "bg-gray-200 h-px w-full",
    size: SizeTheme = new SizeTheme(),
    style: SimpleAppearanceTheme = new SimpleAppearanceTheme(),
    typography: TypographyThemeClass = TypographyThemeClass.createDefaultTypographyTheme(),
    layout: BaseLayoutThemeClass = BaseLayoutThemeClass.createBaseLayoutTheme(),
    defaults: Record<string, any> = {
      xs: true,
      outline: true,
      default: true,
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
   * Get all CSS classes for the divider based on props
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
   * Create a default divider theme
   */
  static createDefaultDividerTheme(): DividerThemeClass {
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

    return new DividerThemeClass(
      "bg-gray-200 h-px w-full",
      new SizeTheme(),
      styleTheme,
      TypographyThemeClass.createDefaultTypographyTheme(),
      BaseLayoutThemeClass.createBaseLayoutTheme(),
      {
        xs: true,
        outline: true,
        default: true,
        noBorder: true,
        noShadow: true,
        noRing: true,
      }
    );
  }
}