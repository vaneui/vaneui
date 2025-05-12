import { twMerge } from "tailwind-merge";
import {
  BaseComponentProps,
} from "../ui/props/props";
import React from "react";
import { ComponentTheme, StyleVariantComponentTheme, SimpleComponentTheme } from '../ui/theme/componentTheme';
import { BaseTheme } from '../ui/theme/baseTheme';
import { useComponentClasses, ComponentProps } from '../ui/hooks/useComponentClasses';
import { VariantAppearance } from "../ui/theme/commonTypes";


/**
 * ComponentBuilder class for building React components with chainable methods
 */
export class ComponentBuilder {
  private readonly cleanProps: BaseComponentProps;
  private readonly tag: any;
  private readonly baseClasses?: string;

  private extraClasses: string[] = [];

  constructor(cleanProps: BaseComponentProps, tag: any, baseClasses?: string) {
    this.cleanProps = cleanProps;
    this.tag = tag;
    this.baseClasses = baseClasses;
  }

  withExtraClasses(classNames: string[]): this {
    this.extraClasses.push(...classNames);
    return this;
  }

  build(): React.ReactElement {
    const {className, children, ...other} = this.cleanProps;
    const Tag = this.tag;
    const merged = twMerge(this.baseClasses, ...this.extraClasses, className);

    return (
      <Tag className={merged} {...other}>
        {children}
      </Tag>
    );
  }
}

/**
 * Factory function that creates and returns a ComponentBuilder instance with component classes
 * This maintains backward compatibility with the existing code
 */
export function componentBuilder<T extends VariantAppearance, P extends ComponentProps, D extends Record<string, any> = {}>(
  props: P,
  theme: ComponentTheme | StyleVariantComponentTheme | SimpleComponentTheme | BaseTheme,
  propsToOmit: readonly string[] = []
): ComponentBuilder {
  const { cleanProps, tag, classes } = useComponentClasses(props, theme as BaseTheme, propsToOmit);
  return new ComponentBuilder(cleanProps, tag ?? "div").withExtraClasses([classes]);
}
