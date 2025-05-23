import { BaseTheme } from "./baseTheme";
import { SizeTheme } from "../size/sizeTheme";
import { BaseLayoutTheme } from "../layout/baseLayoutTheme";
import { TypographyTheme } from "../typography/typographyTheme";
import { TypographyComponentProps } from "../../props/props";
import React from "react";

/**
 * Base component theme class that combines all theme aspects
 */
export class BaseComponentTheme<T extends Partial<TypographyComponentProps>> extends BaseTheme {
  tag?: React.ReactNode | string | any = "div";
  base?: string;
  size?: SizeTheme;
  typography?: TypographyTheme;
  layout?: BaseLayoutTheme;
  defaults?: Partial<Record<keyof T, boolean>>;

  constructor(
    tag: React.ReactNode | string | any,
    base: string = '',
    size: SizeTheme = new SizeTheme(),
    typography: TypographyTheme = TypographyTheme.createDefaultTypographyTheme(),
    layout: BaseLayoutTheme = BaseLayoutTheme.createBaseLayoutTheme(),
    defaults: Partial<Record<keyof T, boolean>> = {}
  ) {
    super();
    this.tag = tag;
    this.base = base;
    this.size = size;
    this.typography = typography;
    this.layout = layout;
    this.defaults = defaults;
  }

  /**
   * Get all CSS classes for the component based on props
   * @param props Component props
   * @returns CSS classes as an array of strings
   */
  getClasses(props: Partial<Record<keyof T, boolean>>): string[] {
    const effectiveProps = {...this.defaults, ...props}
    const classes = [
      this.base ?? "",
      ...(this.typography?.getClasses(effectiveProps) || []),
      ...(this.layout?.getClasses(effectiveProps) || []),
      ...(this.size?.getClasses(effectiveProps) || [])
    ];

    return classes.filter(Boolean);
  }
}
