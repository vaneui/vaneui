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
    const merged = {...this.defaults, ...props} as Record<string, any>;
    const classes: string[] = [];

    if (this.base) {
      classes.push(...this.base.split(" "));
    }

    const walk = (map: ThemeMap<P>) => {
      for (const key in map) {
        const node = map[key];
        if (node instanceof BaseTheme) {
          classes.push(...node.getClasses(merged));
        } else {
          walk(node);
        }
      }
    };

    walk(this.subThemes);
    return classes.filter(Boolean);
  }

  createElement(props: P & { children?: React.ReactNode }) {
    const {children, ...rest} = props as any;
    const Comp = this.tag;
    return (
      <Comp className={this.getClasses(rest)} {...rest}>
        {children}
      </Comp>
    );
  }
}
