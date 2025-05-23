import { VariantAppearanceTheme } from "../appearance/variantAppearanceTheme";
import { SizeTheme } from "../size/sizeTheme";
import { TypographyTheme } from "../typography/typographyTheme";
import { BaseLayoutTheme } from "../layout/baseLayoutTheme";
import { BaseComponentTheme } from "./baseComponentTheme";
import { TypographyComponentProps } from "../../props/props";
import React from "react";

/**
 * Component theme class for components with style variants (button, chip, badge)
 */
export class VariantComponentTheme<T extends Partial<TypographyComponentProps>> extends BaseComponentTheme<T> {
  appearance: VariantAppearanceTheme;

  constructor(
    tag: React.ReactNode | string | any,
    base: string = '',
    size: SizeTheme = new SizeTheme(),
    appearanceTheme: VariantAppearanceTheme = new VariantAppearanceTheme(),
    typography: TypographyTheme = TypographyTheme.createDefaultTypographyTheme(),
    layout: BaseLayoutTheme = BaseLayoutTheme.createBaseLayoutTheme(),
    defaults: Partial<Record<keyof T, boolean>> = {}
  ) {
    super(tag, base, size, typography, layout, defaults);
    this.appearance = appearanceTheme;
  }

  /**
   * Get all CSS classes for the component based on props
   * @param props Component props
   * @returns CSS classes as an array of strings
   */
  getClasses(props: Partial<Record<keyof T, boolean>>): string[] {
    const baseClasses = super.getClasses(props);
    const appearanceClasses = this.appearance.getClasses({...this.defaults, ...props});

    return [
      ...baseClasses,
      ...appearanceClasses
    ].filter(Boolean);
  }

  static createStyleVariantComponentTheme<T extends Partial<TypographyComponentProps>>(
    tag: React.ReactNode | string | any,
    base: string = '',
    size: SizeTheme = new SizeTheme(),
    appearanceTheme: VariantAppearanceTheme = new VariantAppearanceTheme(),
    typography: TypographyTheme = TypographyTheme.createDefaultTypographyTheme(),
    layout: BaseLayoutTheme = BaseLayoutTheme.createBaseLayoutTheme(),
    defaults: Partial<Record<keyof T, boolean>> = {}): VariantComponentTheme<T> {
    return new VariantComponentTheme<T>(
      tag,
      base,
      size,
      appearanceTheme,
      typography,
      layout,
      defaults,
    );
  }
}
