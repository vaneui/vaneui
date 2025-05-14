import { StyleAppearanceTheme } from "../appearance/styleAppearanceTheme";
import { SizeTheme } from "../sizeThemeClass";
import { TypographyTheme } from "../typographyTheme";
import { BaseLayoutTheme } from "../baseLayoutTheme";
import { Mode } from "../../props/mode";
import { BaseComponentTheme } from "./baseComponentTheme";

/**
 * Component theme class for components with style variants (button, chip, badge)
 */
export class StyleVariantComponentTheme extends BaseComponentTheme {
  style: StyleAppearanceTheme;

  constructor(
    base: string = '',
    size: SizeTheme = new SizeTheme(),
    style: StyleAppearanceTheme = new StyleAppearanceTheme(),
    typography: TypographyTheme = TypographyTheme.createDefaultTypographyTheme(),
    layout: BaseLayoutTheme = BaseLayoutTheme.createBaseLayoutTheme(),
    defaults: Record<string, any> = {}
  ) {
    super(base, size, typography, layout, defaults);
    this.style = style;
  }

  /**
   * Get all CSS classes for the component based on props
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

}