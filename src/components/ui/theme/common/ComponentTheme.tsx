import React from "react";
import { BaseTheme } from "./baseTheme";
import type { BasePropsStructure } from "../../props";
import { HideTheme } from "../layout/hideTheme";
import { ItemsTheme } from "../layout/itemsTheme";
import { JustifyTheme } from "../layout/justifyTheme";
import { PositionTheme } from "../layout/positionTheme";
import { FontStyleTheme } from "../typography/fontStyleTheme";
import { FontFamilyTheme } from "../typography/fontFamilyTheme";
import { FontWeightTheme } from "../typography/fontWeightTheme";
import { TextDecorationTheme } from "../typography/textDecorationTheme";
import { TextTransformTheme } from "../typography/textTransformTheme";
import { TextAlignTheme } from "../typography/textAlignTheme";
import { DeepPartial } from "../../../utils/deepPartial";
import { DisplayTheme } from "../layout/displayTheme";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "../../props/props";
import { OverflowTheme } from "../layout/overflowTheme";

type ThemeNode<P> = BaseTheme | ThemeMap<P>;

export type ThemeMap<P> = {
  [key: string]: ThemeNode<P>;
};

export interface DefaultLayoutThemes {
  hide: HideTheme;
  items: ItemsTheme;
  justify: JustifyTheme;
  position: PositionTheme;
  display: DisplayTheme;
  overflow: OverflowTheme;
}

export interface DefaultTypographyThemes {
  fontFamily: FontFamilyTheme;
  fontWeight: FontWeightTheme;
  fontStyle: FontStyleTheme;
  textDecoration: TextDecorationTheme;
  textTransform: TextTransformTheme;
  textAlign: TextAlignTheme;
}

export const defaultLayoutTheme: DefaultLayoutThemes = {
  hide: new HideTheme(),
  items: new ItemsTheme(),
  justify: new JustifyTheme(),
  position: new PositionTheme(),
  display: new DisplayTheme(),
  overflow: new OverflowTheme(),
};

export const defaultTypographyTheme: DefaultTypographyThemes = {
  fontFamily: new FontFamilyTheme(),
  fontWeight: new FontWeightTheme(),
  fontStyle: new FontStyleTheme(),
  textDecoration: new TextDecorationTheme(),
  textTransform: new TextTransformTheme(),
  textAlign: new TextAlignTheme()
};

export interface BaseComponentTheme {
  layout: DefaultLayoutThemes;
}

export interface BaseTypographyComponentTheme extends BaseComponentTheme {
  typography: DefaultTypographyThemes;
}

export class ComponentTheme<P extends ComponentProps, TTheme extends object> {
  readonly tag: React.ElementType;
  readonly base: string;
  readonly themes: TTheme;
  defaults: Partial<P>;
  private readonly extractKeys?: (props: Record<string, boolean>, defaults: Record<string, boolean>) => BasePropsStructure;

  constructor(
    tag: React.ElementType,
    base: string,
    subThemes: DeepPartial<TTheme>,
    defaults: Partial<P> = {},
    extractKeys?: (props: Record<string, boolean>, defaults: Record<string, boolean>) => BasePropsStructure
  ) {
    this.tag = tag;
    this.base = base;
    this.defaults = defaults;
    this.extractKeys = extractKeys;
    // Type assertion: we trust that all default themes provide complete objects
    this.themes = subThemes as TTheme;
  }

  getClasses(props: P, defaults: Partial<P> = this.defaults): string[] {
    const user = props as unknown as Record<string, boolean>;
    const defs = defaults as Record<string, boolean>;
    const classes: string[] = [];

    if (this.base) {
      classes.push(...this.base.split(/\s+/));
    }

    // Extract keys once if extractor is provided
    const extractedKeys = this.extractKeys ? this.extractKeys(user, defs) : undefined;

    const walk = (map: object) => {
      for (const key of Object.keys(map)) {
        const node = (map as ThemeMap<P>)[key];

        if (node instanceof BaseTheme) {
          // If extractedKeys is not available, create a minimal one for backward compatibility
          const keys = extractedKeys || {};
          classes.push(...node.getClasses(keys));
        } else if (node && typeof node === "object" && !Array.isArray(node)) {
          walk(node);
        }
      }
    };

    walk(this.themes);
    return classes.filter(Boolean);
  }

  getComponentConfig(props: P, propsToOmit: readonly string[] = []) {
    const cleanProps: Record<string, any> = {...props};
    // Remove the propsToOmit keys
    for (const k of propsToOmit) {
      delete cleanProps[k];
    }
    // Also remove internal ThemedComponent props
    delete cleanProps.propsToOmit;
    delete cleanProps.theme;

    const {className, tag, ...other} = cleanProps as P;
    const componentTag: React.ElementType = tag ?? this.tag ?? "div";
    // Use original props for theme generation, but cleanProps for final DOM props
    const originalProps = props as P;
    const themeGeneratedClasses = this.getClasses(originalProps);
    const finalClasses = twMerge(...themeGeneratedClasses, className);

    return {
      Tag: componentTag,
      finalClasses,
      finalProps: other,
    };
  }
}

