import { StyleAppearanceTheme } from "../appearance/styleAppearanceTheme";
import { SizeTheme } from "../sizeTheme";
import { TypographyTheme } from "../typography/typographyTheme";
import { BaseLayoutTheme } from "../layout/baseLayoutTheme";
import { Mode } from "../../props/mode";
import { BaseComponentTheme } from "./baseComponentTheme";

/**
 * Component theme class for components with style variants (button, chip, badge)
 */
export class StyleVariantComponentTheme extends BaseComponentTheme {
  appearance: StyleAppearanceTheme;

  constructor(
    base: string = '',
    size: SizeTheme = new SizeTheme(),
    appearanceTheme: StyleAppearanceTheme = new StyleAppearanceTheme(),
    typography: TypographyTheme = TypographyTheme.createDefaultTypographyTheme(),
    layout: BaseLayoutTheme = BaseLayoutTheme.createBaseLayoutTheme(),
    defaults: Record<string, boolean> = {}
  ) {
    super(base, size, typography, layout, defaults);
    this.appearance = appearanceTheme;
  }

  /**
   * Get all CSS classes for the component based on props
   * @param props Component props
   * @param mode Current mode (base, hover, active)
   * @returns CSS classes as a string
   */
  getClasses(props: Record<string, boolean>, mode: Mode = 'base'): string {
    const classes = [
      this.base,
      this.size.getClasses(props, mode),
      this.appearance.getClasses(props, mode),
      this.typography.getClasses(props, mode),
      this.layout.getClasses(props, mode)
    ];

    return classes.filter(Boolean).join(' ');
  }

}