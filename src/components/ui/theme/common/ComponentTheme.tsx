import React from "react";
import { BaseTheme } from "./baseTheme";
import { HideTheme } from "../layout/hideTheme";
import { deepMerge } from "../../../utils/deepMerge";
import { ItemsTheme } from "../layout/itemsTheme";
import { JustifyTheme } from "../layout/justifyTheme";
import { PositionTheme } from "../layout/positionTheme";
import { FontFamilyTheme } from "../typography/fontFamilyTheme";
import { FontWeightTheme } from "../typography/fontWeightTheme";
import { FontStyleTheme } from "../typography/fontStyleTheme";
import { TextDecorationTheme } from "../typography/textDecorationTheme";
import { TextTransformTheme } from "../typography/textTransformTheme";
import { TextAlignTheme } from "../typography/textAlignTheme";
import { DeepPartial } from "../../../utils/deepPartial";

type ThemeNode<P> = BaseTheme | ThemeMap<P>;

export type ThemeMap<P> = {
  [key: string]: ThemeNode<P>;
};

export interface DefaultLayoutThemes<P> {
  hide: HideTheme;
  items: ItemsTheme;
  justify: JustifyTheme;
  position: PositionTheme;
}

export interface DefaultTypographyThemes<P> {
  fontFamily: FontFamilyTheme;
  fontWeight: FontWeightTheme;
  fontStyle: FontStyleTheme;
  textDecoration: TextDecorationTheme;
  textTransform: TextTransformTheme;
  textAlign: TextAlignTheme;
}

export interface BaseComponentTheme<P> {
  layout: DefaultLayoutThemes<P>;
  typography: DefaultTypographyThemes<P>;
}

export class ComponentTheme<
  P extends object,
  TThemes extends object
> {
  readonly tag: React.ElementType;
  readonly base: string;
  readonly defaults: Partial<P>;
  readonly themes: TThemes;

  constructor(
    tag: React.ElementType,
    base: string,
    subThemes: DeepPartial<TThemes>,
    defaults: Partial<P> = {}
  ) {
    this.tag = tag;
    this.base = base;
    this.defaults = defaults;

    const defaultInternalThemes: BaseComponentTheme<P> = {
      layout: {
        hide: new HideTheme(),
        items: new ItemsTheme(),
        justify: new JustifyTheme(),
        position: new PositionTheme(),
      },
      typography: {
        fontFamily: new FontFamilyTheme(),
        fontWeight: new FontWeightTheme(),
        fontStyle: new FontStyleTheme(),
        textDecoration: new TextDecorationTheme(),
        textTransform: new TextTransformTheme(),
        textAlign: new TextAlignTheme()
      }
    };
    this.themes = deepMerge(defaultInternalThemes as unknown as TThemes, subThemes) as TThemes;
  }

  getClasses(props: P, defaults: Partial<P> = this.defaults): string[] {
    const user = props as unknown as Record<string, boolean>;
    const defs = defaults as unknown as Record<string, boolean>;
    const classes: string[] = [];

    if (this.base) {
      classes.push(...this.base.split(/\s+/));
    }

    const walk = (map: object) => {
      for (const key of Object.keys(map)) {
        const node = (map as ThemeMap<P>)[key];

        if (node instanceof BaseTheme) {
          classes.push(...node.getClasses(user, defs));
        } else if (node && typeof node === "object" && !Array.isArray(node)) {
          walk(node);
        }
      }
    };

    walk(this.themes);
    return classes.filter(Boolean);
  }
}
