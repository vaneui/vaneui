import { BaseTheme } from "./common/baseTheme";
import { Mode } from "../props/mode";
import { SizeTheme } from "./size/sizeTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";
import { BaseLayoutTheme } from "./layout/baseLayoutTheme";
import { TypographyTheme } from "./typography/typographyTheme";
import { RowProps, ButtonStyleProps, NoBorderProps, NoShadowProps, NoRingProps } from "../props/props";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { SizeKey } from "../props/propKeys";
import { RowLayoutTheme } from "./layout/rowLayoutTheme";

/**
 * Row theme class for handling row-specific styling
 */
export class RowTheme extends BaseTheme {
  base: string;
  size: SizeTheme;
  style: SimpleAppearanceTheme;
  typography: TypographyTheme;
  layout: BaseLayoutTheme;
  defaults: Record<string, any>;

  /**
   * Create a new RowThemeClass instance
   * @param base Base CSS classes
   */
  constructor(
    base: string = "flex flex-row"
  ) {
    super();
    this.base = base;

    // Row-specific size maps
    const gapMap: Record<SizeKey, string> = {
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-5',
      xl: 'gap-6',
    };

    // Create size theme with row-specific maps
    this.size = new SizeTheme(
      undefined,
      undefined,
      undefined,
      gapMap
    );

    this.style = SimpleAppearanceTheme.createDefaultStyle();
    this.typography = TypographyTheme.createDefaultTypographyTheme();
    this.layout = RowLayoutTheme.createRowLayoutTheme();
    this.defaults = {
      md: true,
      outline: true,
      transparent: true,
      itemsCenter: true,
      flexWrap: true,
      noBorder: true,
      noShadow: true,
      noRing: true,
    };
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
  static createDefaultRowTheme(): RowTheme {
    return new RowTheme(
      "flex flex-row"
    );
  }
}
