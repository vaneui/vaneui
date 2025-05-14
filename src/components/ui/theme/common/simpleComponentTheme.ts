import { SimpleAppearanceTheme } from "../appearance/simpleAppearanceTheme";
import { SizeTheme } from "../sizeTheme";
import { TypographyTheme } from "../typography/typographyTheme";
import { BaseLayoutTheme } from "../layout/baseLayoutTheme";
import { Mode } from "../../props/mode";
import { BaseComponentTheme } from "./baseComponentTheme";

/**
 * Component theme class for components with simple appearance (no style variants)
 */
export class SimpleComponentTheme extends BaseComponentTheme {
  appearance: SimpleAppearanceTheme;

  constructor(
    base: string,
    size: SizeTheme,
    typography: TypographyTheme,
    layout: BaseLayoutTheme,
    defaults: Record<string, boolean>,
  ) {
    super(base, size, typography, layout, defaults);
    this.appearance = SimpleAppearanceTheme.createDefaultStyle();
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

  static createSimpleComponentTheme(
    base: string = '',
    size: SizeTheme = new SizeTheme(),
    defaults: Record<string, boolean> = {}): SimpleComponentTheme {
    return new SimpleComponentTheme(
      base,
      size,
      TypographyTheme.createDefaultTypographyTheme(),
      BaseLayoutTheme.createBaseLayoutTheme(),
      defaults,
    );
  }
}