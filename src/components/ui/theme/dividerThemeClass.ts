import { BaseTheme } from "./common/baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./sizeTheme";
import { BaseLayoutTheme } from "./layout/baseLayoutTheme";
import { TypographyTheme } from "./typographyTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";

/**
 * Divider theme class for handling divider-specific styling
 */
export class DividerThemeClass extends BaseTheme {
  base: string;
  size: SizeTheme;
  style: SimpleAppearanceTheme;
  typography: TypographyTheme;
  layout: BaseLayoutTheme;
  defaults: Record<string, any>;

  /**
   * Create a new DividerThemeClass instance
   * @param base Base CSS classes
   */
  constructor(
    base: string = "bg-gray-200 h-px w-full"
  ) {
    super();
    this.base = base;

    this.size = new SizeTheme();

    this.style = SimpleAppearanceTheme.createDefaultStyle();

    this.typography = TypographyTheme.createDefaultTypographyTheme();
    this.layout = BaseLayoutTheme.createBaseLayoutTheme();
    this.defaults = {
      xs: true,
      outline: true,
      default: true,
      noBorder: true,
      noShadow: true,
      noRing: true,
    };
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
    return new DividerThemeClass(
      "bg-gray-200 h-px w-full"
    );
  }
}
