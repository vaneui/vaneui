import { twMerge } from "tailwind-merge";
import {
  BaseComponentProps,
} from "../ui/props/props";
import React from "react";

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
 * Factory function that creates and returns a ComponentBuilder instance
 * This maintains backward compatibility with the existing code
 */
export function componentBuilder(
  cleanProps: BaseComponentProps,
  defaultTag: string,
  baseClasses?: string
): ComponentBuilder {
  return new ComponentBuilder(cleanProps, defaultTag, baseClasses);
}
