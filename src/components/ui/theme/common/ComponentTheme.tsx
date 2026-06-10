import React from "react";
import { BaseClassMapper } from "./BaseClassMapper";
import { ComponentCategoryKey } from "../../props";
import { ComponentKeys } from "../../props";
import { HideClassMapper } from "../layout/hideClassMapper";
import { ItemsClassMapper } from "../layout/itemsClassMapper";
import { JustifyClassMapper } from "../layout/justifyClassMapper";
import { PositionClassMapper } from "../layout/positionClassMapper";
import { FontStyleClassMapper } from "../typography/fontStyleClassMapper";
import { FontFamilyClassMapper } from "../typography/fontFamilyClassMapper";
import { FontWeightClassMapper } from "../typography/fontWeightClassMapper";
import { TextDecorationClassMapper } from "../typography/textDecorationClassMapper";
import { TextTransformClassMapper } from "../typography/textTransformClassMapper";
import { TextAlignClassMapper } from "../typography/textAlignClassMapper";
import { TruncateClassMapper } from "../typography/truncateClassMapper";
import { DeepPartial } from "../../../utils/deepPartial";
import { DisplayClassMapper } from "../layout/displayClassMapper";
import { twMerge } from "tailwind-merge";
import { OverflowClassMapper } from "../layout/overflowClassMapper";
import { WidthClassMapper } from "../layout/widthClassMapper";
import { HeightClassMapper } from "../layout/heightClassMapper";
import { pickFirstTruthyKeyByCategory } from "../../../utils/componentUtils";

type ComponentProps = { className?: string; children?: React.ReactNode; tag?: React.ElementType; };
type ThemeNode<P> = BaseClassMapper | ThemeMap<P>;

export type VaneComponentType = 'ui' | 'layout';

export type ThemeMap<P> = {
  [key: string]: ThemeNode<P>;
};

export interface DefaultLayoutClassMappers {
  hide: HideClassMapper;
  items: ItemsClassMapper;
  justify: JustifyClassMapper;
  position: PositionClassMapper;
  display: DisplayClassMapper;
  overflow: OverflowClassMapper;
}

export interface DefaultTypographyClassMappers {
  fontFamily: FontFamilyClassMapper;
  fontWeight: FontWeightClassMapper;
  fontStyle: FontStyleClassMapper;
  textDecoration: TextDecorationClassMapper;
  textTransform: TextTransformClassMapper;
  textAlign: TextAlignClassMapper;
  truncate: TruncateClassMapper;
}

export interface BaseComponentTheme {
  layout: DefaultLayoutClassMappers;
}

export interface BaseTypographyComponentTheme extends BaseComponentTheme {
  typography: DefaultTypographyClassMappers;
}

export const defaultLayoutClassMappers: DefaultLayoutClassMappers = {
  hide: new HideClassMapper(),
  items: new ItemsClassMapper(),
  justify: new JustifyClassMapper(),
  position: new PositionClassMapper(),
  display: new DisplayClassMapper(),
  overflow: new OverflowClassMapper(),
};

export interface DefaultSizedLayoutClassMappers extends DefaultLayoutClassMappers {
  width: WidthClassMapper;
  height: HeightClassMapper;
}

export const defaultSizedLayoutClassMappers: DefaultSizedLayoutClassMappers = {
  ...defaultLayoutClassMappers,
  width: new WidthClassMapper(),
  height: new HeightClassMapper(),
};

export const defaultTypographyClassMappers: DefaultTypographyClassMappers = {
  fontFamily: new FontFamilyClassMapper(),
  fontWeight: new FontWeightClassMapper(),
  fontStyle: new FontStyleClassMapper(),
  textDecoration: new TextDecorationClassMapper(),
  textTransform: new TextTransformClassMapper(),
  textAlign: new TextAlignClassMapper(),
  truncate: new TruncateClassMapper(),
};

export class ComponentTheme<P extends ComponentProps, TTheme extends object> {
  readonly tag: React.ElementType;
  readonly base: string;
  readonly themes: TTheme;
  readonly vaneType?: VaneComponentType;
  // fallback for pickFirstTruthyKeyByCategory when props omit a category; merged via ThemeProvider
  defaults: Partial<P>;
  extraClasses: Partial<Record<keyof P, string>>;
  private readonly categories: readonly ComponentCategoryKey[];
  // base type decoupled from P so ComponentTheme<SpecificProps, T> stays structurally compatible
  private readonly tagFunction?: (props: ComponentProps, defaults: Partial<ComponentProps>) => React.ElementType;

  constructor(
    tag: React.ElementType,
    base: string,
    themes: DeepPartial<TTheme>,
    defaults: Partial<P> = {},
    categories: readonly ComponentCategoryKey[],
    tagFunction?: (props: P, defaults: Partial<P>) => React.ElementType,
    vaneType?: VaneComponentType
  ) {
    this.tag = tag;
    this.base = base;
    this.defaults = defaults;
    this.extraClasses = {};
    this.categories = categories;
    // safe: existing tagFunctions only access optional props (e.g. href)
    this.tagFunction = tagFunction as typeof this.tagFunction;
    this.vaneType = vaneType;
    this.themes = themes as TTheme;
  }

  withDefaults(defaults: Partial<P>): ComponentTheme<P, TTheme> {
    return new ComponentTheme<P, TTheme>(
      this.tag,
      this.base,
      this.themes,
      defaults,
      this.categories,
      this.tagFunction as ((props: P, defaults: Partial<P>) => React.ElementType) | undefined,
      this.vaneType,
    );
  }

  getClasses(props: P, precomputedKeys?: Record<string, string>): string[] {
    const componentProps = props as unknown as Record<string, boolean>;
    const classes: string[] = [];

    if (this.base) {
      classes.push(...this.base.split(/\s+/));
    }

    const defaults = this.defaults as Record<string, boolean>;
    let extractedKeys: Record<string, string>;
    if (precomputedKeys) {
      extractedKeys = precomputedKeys;
    } else {
      extractedKeys = {};
      for (const category of this.categories) {
        const key = pickFirstTruthyKeyByCategory(componentProps, defaults, category);
        if (key !== undefined) {
          extractedKeys[category] = key;
        }
      }
    }

    const walk = (map: object) => {
      for (const key of Object.keys(map)) {
        const node = (map as ThemeMap<P>)[key];

        if (node instanceof BaseClassMapper) {
          classes.push(...node.getClasses(extractedKeys));
        } else if (node && typeof node === "object" && !Array.isArray(node)) {
          walk(node);
        }
      }
    };

    walk(this.themes);

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

    const extractedKeys: Record<string, string> = {};
    for (const category of this.categories) {
      const key = pickFirstTruthyKeyByCategory(componentProps, defaults, category);
      if (key !== undefined) {
        extractedKeys[category] = key;
      }
    }

    // dev-only: categories are mutually exclusive, but the boolean-props API
    // can't express that in types — when 2+ props of one category are
    // explicitly true, the winner is ComponentKeys array order (NOT JSX
    // order), which is undiscoverable without a warning
    if (process.env.NODE_ENV !== 'production') {
      for (const category of this.categories) {
        const truthyKeys = ComponentKeys[category].filter(k => componentProps[k] === true);
        if (truthyKeys.length > 1) {
          const tagName = typeof this.tag === 'string' ? `<${this.tag}>` : 'component';
          console.warn(
            `VaneUI: conflicting ${category} props on ${tagName}: ${truthyKeys.join(', ')} — "${truthyKeys[0]}" wins (canonical key order, not JSX order). Pass only one prop per category.`
          );
        }
      }
    }

    // expand `inherit` shorthand into COLOR/BG/BORDER only (size inheritance is opt-in via inheritSize)
    if (extractedKeys.appearance === 'inherit') {
      if (!extractedKeys.inheritColor) {
        extractedKeys.inheritColor = 'inheritColor';
      }
      if (!extractedKeys.inheritBg) {
        extractedKeys.inheritBg = 'inheritBg';
      }
      if (!extractedKeys.inheritBorder) {
        extractedKeys.inheritBorder = 'inheritBorder';
      }
    }

    const keysToOmit =
      this.categories.flatMap(category => ComponentKeys[category]);
    for (const k of keysToOmit) {
      delete cleanProps[k];
    }

    // preserve HTML-native attrs that overlap with category keys
    if ((props as Record<string, unknown>).disabled !== undefined) {
      cleanProps.disabled = (props as Record<string, unknown>).disabled;
    }

    delete cleanProps.theme;

    const {className, tag, children: _children, ...other} = cleanProps as P;
    const componentTag: React.ElementType = tag ?? this.getTag(props) ?? "div";
    const originalProps = props as P;
    const themeGeneratedClasses = this.getClasses(originalProps, extractedKeys);
    const finalClasses = twMerge(...themeGeneratedClasses, className);

    const dataAttributes: Record<string, string> = {};
    if (this.vaneType) {
      dataAttributes['data-vane-type'] = this.vaneType;
    }
    if (extractedKeys.size) {
      dataAttributes['data-size'] = extractedKeys.size;
    }
    if (extractedKeys.responsive === 'responsive') {
      dataAttributes['data-responsive'] = '';
    }
    // data-appearance suppressed when inheritColor is active (lets colors cascade from ancestor).
    // data-variant emitted when appearance is present OR variant != outline (so `<Row filled>` works without explicit appearance).
    const hasAppearance = extractedKeys.appearance && extractedKeys.inheritColor !== 'inheritColor';
    if (hasAppearance) {
      dataAttributes['data-appearance'] = extractedKeys.appearance;
    }
    if (extractedKeys.variant && (hasAppearance || extractedKeys.variant !== 'outline')) {
      dataAttributes['data-variant'] = extractedKeys.variant;
    }
    if ((props as Record<string, unknown>).disabled) {
      dataAttributes['data-disabled'] = 'true';
    }
    if ((props as Record<string, unknown>).readOnly) {
      dataAttributes['data-readonly'] = 'true';
    }

    return {
      Tag: componentTag,
      finalClasses,
      finalProps: { ...other, ...dataAttributes },
    };
  }
}
