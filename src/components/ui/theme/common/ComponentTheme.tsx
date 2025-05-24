import React from "react";
import { BaseTheme } from "./baseTheme";
import { TypographyTheme } from "../typography/typographyTheme";
import { HideTheme } from "../layout/hideTheme";
import { deepMerge } from "../../../utils/deepMerge";
import { ItemsTheme } from "../layout/itemsTheme";
import { JustifyTheme } from "../layout/justifyTheme";
import { PositionTheme } from "../layout/positionTheme";

export interface ThemeMap<P> {
  [key: string]: BaseTheme | ThemeMap<P>;
}

export class ComponentTheme<P extends object> {
  readonly tag: React.ElementType;
  readonly base: string;
  readonly subThemes: ThemeMap<P>;
  readonly defaults: Partial<P>;

  private commonSubThemes: ThemeMap<P> = {
    layout: {
      hide: new HideTheme(),
      items: new ItemsTheme(),
      justify: new JustifyTheme(),
      position: new PositionTheme(),
    },
    typography: TypographyTheme.createDefaultTypographyTheme(),
  };

  constructor(
    tag: React.ElementType,
    base: string,
    subThemes: ThemeMap<P>,
    defaults: Partial<P> = {}
  ) {
    this.tag = tag;
    this.base = base;
    this.subThemes = deepMerge(
      this.commonSubThemes,
      subThemes
    );
    this.defaults = defaults;
  }

  getClasses(props: P): string[] {
    // Don't merge defaults with props, keep them separate
    const propsRecord = props as Record<string, any>;
    const defaultsRecord = this.defaults as Record<string, any>;
    const classes: string[] = [];

    if (this.base) {
      classes.push(...this.base.split(" "));
    }

    const walk = (map: ThemeMap<P>) => {
      for (const key in map) {
        const node = map[key];
        if (node instanceof BaseTheme) {
          // Pass both real props and defaults separately
          classes.push(...node.getClasses(propsRecord, defaultsRecord));
        } else {
          walk(node);
        }
      }
    };

    walk(this.subThemes);
    return classes.filter(Boolean);
  }
}
