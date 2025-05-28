import React from "react";
import { BaseTheme } from "./baseTheme";
import { TypographyTheme } from "../typography/typographyTheme";
import { HideTheme } from "../layout/hideTheme";
import { deepMerge } from "../../../utils/deepMerge";
import { ItemsTheme } from "../layout/itemsTheme";
import { JustifyTheme } from "../layout/justifyTheme";
import { PositionTheme } from "../layout/positionTheme";

export interface ThemeMap<P> {
  [key: string]: BaseTheme | ThemeMap<P> | string;
}

export class ComponentTheme<P extends object> {
  readonly tag: React.ElementType;
  readonly base: string;
  readonly subThemes: ThemeMap<P>;
  readonly defaults: Partial<P>;

  constructor(
    tag: React.ElementType,
    base: string,
    subThemes: ThemeMap<P>,
    defaults: Partial<P> = {}
  ) {
    this.tag = tag;
    this.base = base;
    this.subThemes = deepMerge({
        layout: {
          hide: new HideTheme(),
          items: new ItemsTheme(),
          justify: new JustifyTheme(),
          position: new PositionTheme(),
        },
        typography: TypographyTheme.createDefaultTypographyTheme(),
      },
      subThemes
    );
    this.defaults = defaults;
  }

  getClasses(props: P, defaults: Partial<P> = this.defaults): string[] {
    const user = props as Record<string, any>;
    const defs = defaults as Record<string, any>;
    const classes: string[] = [];

    // 1) add the base string
    if (this.base) {
      classes.push(...this.base.split(/\s+/));
    }

    // 2) walk recursively
    const walk = (map: ThemeMap<P>) => {
      for (const key in map) {
        const node = map[key];

        if (typeof node === "string") {
          // string leaf → split on spaces
          classes.push(...node.split(/\s+/).filter(Boolean));

        } else if (node instanceof BaseTheme) {
          // theme leaf → call its getClasses
          classes.push(...node.getClasses(user, defs));

        } else if (node && typeof node === "object") {
          // nested map → recurse
          walk(node as ThemeMap<P>);
        }
      }
    };

    walk(this.subThemes);
    return classes.filter(Boolean);
  }
}
