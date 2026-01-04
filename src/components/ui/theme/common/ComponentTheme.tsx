import React from "react";
import { BaseTheme } from "./baseTheme";
import { ComponentCategoryKey } from "../../props";
import { ComponentKeys } from "../../props";
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
import { OverflowTheme } from "../layout/overflowTheme";
import { pickFirstTruthyKeyByCategory } from "../../../utils/componentUtils";

type ComponentProps = { className?: string; children?: React.ReactNode; tag?: React.ElementType; };
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

export interface BaseComponentTheme {
  layout: DefaultLayoutThemes;
}

export interface BaseTypographyComponentTheme extends BaseComponentTheme {
  typography: DefaultTypographyThemes;
}

export const defaultLayoutsThemes: DefaultLayoutThemes = {
  hide: new HideTheme(),
  items: new ItemsTheme(),
  justify: new JustifyTheme(),
  position: new PositionTheme(),
  display: new DisplayTheme(),
  overflow: new OverflowTheme(),
};

export const defaultTypographyThemes: DefaultTypographyThemes = {
  fontFamily: new FontFamilyTheme(),
  fontWeight: new FontWeightTheme(),
  fontStyle: new FontStyleTheme(),
  textDecoration: new TextDecorationTheme(),
  textTransform: new TextTransformTheme(),
  textAlign: new TextAlignTheme()
};

export class ComponentTheme<P extends ComponentProps, TTheme extends object> {
  readonly tag: React.ElementType;
  readonly base: string;
  readonly themes: TTheme;
  defaults: Partial<P>;
  extraClasses: Partial<Record<keyof P, string>>;
  private readonly categories: readonly ComponentCategoryKey[];
  private readonly tagFunction?: (props: P, defaults: Partial<P>) => React.ElementType;

  constructor(
    tag: React.ElementType,
    base: string,
    themes: DeepPartial<TTheme>,
    defaults: Partial<P> = {},
    categories: readonly ComponentCategoryKey[],
    tagFunction?: (props: P, defaults: Partial<P>) => React.ElementType
  ) {
    this.tag = tag;
    this.base = base;
    this.defaults = defaults;
    this.extraClasses = {};
    this.categories = categories;
    this.tagFunction = tagFunction;
    // Type assertion: we trust that all default themes provide complete objects
    this.themes = themes as TTheme;
  }

  getClasses(props: P): string[] {
    const componentProps = props as unknown as Record<string, boolean>;
    const classes: string[] = [];

    if (this.base) {
      classes.push(...this.base.split(/\s+/));
    }

    const defaults = this.defaults as Record<string, boolean>;
    const extractedKeys: Record<string, string> = {};
    for (const category of this.categories) {
      const key = pickFirstTruthyKeyByCategory(componentProps, defaults, category);
      if (key !== undefined) {
        extractedKeys[category] = key;
      }
    }

    // No need for border/noBorder mutual exclusion logic anymore
    // since noBorder is now part of the border category and 
    // pickFirstTruthyKeyByCategory handles the priority naturally

    const walk = (map: object) => {
      for (const key of Object.keys(map)) {
        const node = (map as ThemeMap<P>)[key];

        if (node instanceof BaseTheme) {
          classes.push(...node.getClasses(extractedKeys));
        } else if (node && typeof node === "object" && !Array.isArray(node)) {
          walk(node);
        }
      }
    };

    walk(this.themes);

    // Apply extra classes based on extracted keys
    for (const [, value] of Object.entries(extractedKeys)) {
      if (value && this.extraClasses[value as keyof P]) {
        const existingClasses = this.extraClasses[value as keyof P];
        if (existingClasses !== undefined) {
          const cs = existingClasses.split(/\s+/);
          classes.push(...cs);
        }
      }
    }

    return classes.filter(Boolean);
  }

  getTag(props: P): React.ElementType {
    if (this.tagFunction) {
      return this.tagFunction(props, this.defaults);
    }
    return this.tag;
  }

  getComponentConfig(props: P) {
    const cleanProps: Record<string, unknown> = {...props};
    const componentProps = props as unknown as Record<string, boolean>;
    const defaults = this.defaults as Record<string, boolean>;

    // Extract keys for data attributes
    const extractedKeys: Record<string, string> = {};
    for (const category of this.categories) {
      const key = pickFirstTruthyKeyByCategory(componentProps, defaults, category);
      if (key !== undefined) {
        extractedKeys[category] = key;
      }
    }

    const keysToOmit =
      this.categories.flatMap(category => ComponentKeys[category]);
    for (const k of keysToOmit) {
      delete cleanProps[k];
    }

    delete cleanProps.theme;

    const {className, tag, ...other} = cleanProps as P;
    const componentTag: React.ElementType = tag ?? this.getTag(props) ?? "div";
    // Use original props for theme generation, but cleanProps for final DOM props
    const originalProps = props as P;
    const themeGeneratedClasses = this.getClasses(originalProps);
    const finalClasses = twMerge(...themeGeneratedClasses, className);

    // Build data attributes for key categories
    const dataAttributes: Record<string, string> = {};
    if (extractedKeys.size) {
      dataAttributes['data-size'] = extractedKeys.size;
    }
    if (extractedKeys.appearance) {
      dataAttributes['data-appearance'] = extractedKeys.appearance;
    }
    if (extractedKeys.variant) {
      dataAttributes['data-variant'] = extractedKeys.variant;
    }
    if (extractedKeys.transparent) {
      dataAttributes['data-transparent'] = 'true';
    }

    return {
      Tag: componentTag,
      finalClasses,
      finalProps: { ...other, ...dataAttributes },
    };
  }
}

