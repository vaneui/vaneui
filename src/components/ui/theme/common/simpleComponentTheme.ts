import { SimpleAppearanceTheme } from "../appearance/simpleAppearanceTheme";
import { SizeTheme } from "../size/sizeTheme";
import { TypographyTheme } from "../typography/typographyTheme";
import { BaseLayoutTheme } from "../layout/baseLayoutTheme";
import { Mode } from "../../props/mode";
import { BaseComponentTheme } from "./baseComponentTheme";
import { TypographyComponentProps } from "../../props/props";
import React from "react";

/**
 * Component theme class for components with simple appearance (no style variants)
 */
export class SimpleComponentTheme<T extends Partial<TypographyComponentProps>> extends BaseComponentTheme<T> {
  appearance: SimpleAppearanceTheme;

  constructor(
    tag: React.ReactNode | string | any,
    base: string,
    size: SizeTheme,
    typography: TypographyTheme,
    layout: BaseLayoutTheme,
    defaults: Partial<Record<keyof T, boolean>>
  ) {
    super(tag, base, size, typography, layout, defaults);
    this.appearance = SimpleAppearanceTheme.createDefaultStyle();
  }

  /**
   * Get all CSS classes for the component based on props
   * @param props Component props
   * @returns CSS classes as a string
   */
  getClasses(props: Partial<Record<keyof T, boolean>>): string {
    const base = super.getClasses(props);
    const classes = [
      this.base,
      this.appearance.getClasses(props),
    ];

    return [base, ...classes].filter(Boolean).join(' ');
  }

  static createSimpleComponentTheme<T extends Partial<TypographyComponentProps>>(
    tag: React.ReactNode | string | any,
    base: string = '',
    size: SizeTheme = new SizeTheme(),
    defaults: Partial<Record<keyof T, boolean>> = {}): SimpleComponentTheme<T> {
    return new SimpleComponentTheme<T>(
      tag,
      base,
      size,
      TypographyTheme.createDefaultTypographyTheme(),
      BaseLayoutTheme.createBaseLayoutTheme(),
      defaults,
    );
  }
}