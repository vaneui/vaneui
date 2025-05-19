import { StyleAppearanceTheme } from "../appearance/styleAppearanceTheme";
import { SizeTheme } from "../size/sizeTheme";
import { TypographyTheme } from "../typography/typographyTheme";
import { BaseLayoutTheme } from "../layout/baseLayoutTheme";
import { BaseComponentTheme } from "./baseComponentTheme";
import { TypographyComponentProps } from "../../props/props";

/**
 * Component theme class for components with style variants (button, chip, badge)
 */
export class StyleVariantComponentTheme<T extends Partial<TypographyComponentProps>> extends BaseComponentTheme<T> {
  appearance: StyleAppearanceTheme;

  constructor(
    base: string = '',
    size: SizeTheme = new SizeTheme(),
    appearanceTheme: StyleAppearanceTheme = new StyleAppearanceTheme(),
    typography: TypographyTheme = TypographyTheme.createDefaultTypographyTheme(),
    layout: BaseLayoutTheme = BaseLayoutTheme.createBaseLayoutTheme(),
    defaults: Partial<Record<keyof T, boolean>> = {}
  ) {
    super(base, size, typography, layout, defaults);
    this.appearance = appearanceTheme;
  }

  /**
   * Get all CSS classes for the component based on props
   * @param props Component props
   * @returns CSS classes as a string
   */
  getClasses(props: Partial<Record<keyof T, boolean>>): string {
    return [this.base, super.getClasses(props)].filter(Boolean).join(' ');
  }
}