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

/** Component type for CSS variable scoping - UI components have compact spacing, Layout components have generous spacing */
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
  /** Component defaults — used by pickFirstTruthyKeyByCategory as a
   *  fallback when JSX props don't specify a value for a category.
   *  ThemeProvider.themeDefaults merges into this via applyDefaultsRecursively.
   *
   *  Data-attribute gate: every component whose resolved appearance is NOT
   *  `inherit` emits data-appearance + data-variant so its own CSS rule
   *  fires. Only components that default to `inherit` (Text, Title, Label,
   *  etc.) skip emission and inherit colors from their nearest ancestor
   *  via CSS custom-property cascade. */
  defaults: Partial<P>;
  extraClasses: Partial<Record<keyof P, string>>;
  private readonly categories: readonly ComponentCategoryKey[];
  // Base type for storage — decoupled from P so that ComponentTheme<SpecificProps, T>
  // is structurally compatible with ComponentTheme<ComponentProps, object>.
  // The constructor parameter still uses P for caller type safety.
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
    // Safe: P extends ComponentProps, and getTag() always passes P-typed values.
    // All existing tagFunctions only access optional props (e.g. href).
    this.tagFunction = tagFunction as typeof this.tagFunction;
    this.vaneType = vaneType;
    // Type assertion: we trust that all default themes provide complete objects
    this.themes = themes as TTheme;
  }

  /** Create a variant of this theme with different defaults (e.g., menu divider from divider) */
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

    // No need for border/noBorder mutual exclusion logic anymore
    // since noBorder is now part of the border category and
    // pickFirstTruthyKeyByCategory handles the priority naturally

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

    // Expand 'inherit' appearance shorthand into granular inherit flags.
    // Only expands COLOR, BG, and BORDER — not SIZE. Size inheritance is a
    // separate concern: components that need it (Link, Code, Kbd, Mark) set
    // `inheritSize: true` explicitly in their defaults. If `inherit` also
    // expanded into `inheritSize`, then `<Text sm>` would ignore the explicit
    // `sm` prop and inherit from parent instead — breaking user intent.
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

    // Preserve HTML-native attributes that overlap with category keys
    if ((props as Record<string, unknown>).disabled !== undefined) {
      cleanProps.disabled = (props as Record<string, unknown>).disabled;
    }

    delete cleanProps.theme;

    const {className, tag, children: _children, ...other} = cleanProps as P;
    const componentTag: React.ElementType = tag ?? this.getTag(props) ?? "div";
    // Use original props for theme generation, but cleanProps for final DOM props
    const originalProps = props as P;
    const themeGeneratedClasses = this.getClasses(originalProps, extractedKeys);
    const finalClasses = twMerge(...themeGeneratedClasses, className);

    // Build data attributes for key categories
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
    // Data-attribute gate:
    // - Appearance is emitted when present AND inheritColor is not active.
    //   When inheritColor is set (either explicitly or via `inherit` appearance
    //   expansion), data-appearance is suppressed so colors cascade from the
    //   nearest ancestor via CSS custom-property inheritance.
    // - Variant is emitted when EITHER:
    //   (a) appearance is present — needed for the two-axis CSS architecture
    //       (appearance sets --app-* intermediates, variant maps them to
    //       final --*-color variables; both rules must fire), OR
    //   (b) variant deviates from `outline` — lets `<Row filled>` or
    //       `<Button ghost>` work without an explicit appearance; the variant
    //       rule reads --app-* inherited from the nearest ancestor.
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
