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
import { mergeDefaults } from "../../../utils/deepMerge";

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
  /** Library baseline defaults — used by pickFirstTruthyKeyByCategory as
   *  a soft fallback. Components whose defaults match the baseline palette
   *  (primary + outline) stay attribute-free and inherit colors from the
   *  nearest ancestor (or :root). Components whose defaults deviate from
   *  baseline (e.g. Mark → warning, Chip → secondary, Checkbox → filled)
   *  automatically emit data attributes so their own CSS rule fires —
   *  see the baseline-deviation gate in getComponentConfig. */
  defaults: Partial<P>;
  /** Theme-provider overrides from `themeDefaults`. Merged with `defaults`
   *  (via mergeDefaults, which handles mutually-exclusive categories) at
   *  extraction time. Values here shift the resolved appearance/variant
   *  away from baseline, which causes data-attribute emission — so
   *  `<ThemeProvider themeDefaults={{ badge: { danger: true } }}>` works
   *  as expected. Populated by ThemeProvider.applyDefaultsRecursively;
   *  stays empty in the library default theme. */
  userDefaults: Partial<P>;
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
    this.userDefaults = {};
    this.extraClasses = {}
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

    // Merge userDefaults (ThemeProvider overrides) into library defaults so
    // pickFirstTruthy sees them as fallbacks behind JSX props. mergeDefaults
    // handles mutually-exclusive categories correctly (e.g. themeDefaults
    // danger=true flips the library's primary=true to false).
    const mergedDefaults = mergeDefaults(
      this.defaults as Record<string, boolean>,
      this.userDefaults as Record<string, boolean>,
    );
    let extractedKeys: Record<string, string>;
    if (precomputedKeys) {
      extractedKeys = precomputedKeys;
    } else {
      extractedKeys = {};
      for (const category of this.categories) {
        const key = pickFirstTruthyKeyByCategory(componentProps, mergedDefaults, category);
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

    // Merge userDefaults (ThemeProvider overrides) into library defaults.
    // mergeDefaults handles mutually-exclusive categories so a themeDefault
    // like `{ danger: true }` correctly flips the library's `primary: true`
    // to false. JSX props are checked first by pickFirstTruthy.
    const mergedDefaults = mergeDefaults(
      this.defaults as Record<string, boolean>,
      this.userDefaults as Record<string, boolean>,
    );

    // Extract keys for data attributes
    const extractedKeys: Record<string, string> = {};
    for (const category of this.categories) {
      const key = pickFirstTruthyKeyByCategory(componentProps, mergedDefaults, category);
      if (key !== undefined) {
        extractedKeys[category] = key;
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
    // Data-attribute gate: emit data-appearance / data-variant when EITHER:
    //
    // (a) The resolved appearance/variant deviates from the primary+outline
    //     baseline. This covers "identity" components (Mark→warning,
    //     Chip→secondary, Link→link, Checkbox→filled) whose non-baseline
    //     defaults must trigger their own CSS rule regardless of context.
    //
    // (b) The user explicitly provided an appearance or variant — via JSX
    //     props or ThemeProvider.themeDefaults. This covers the case where
    //     a user writes `<Text primary outline>` inside a filled Card and
    //     expects the explicit props to override the inherited filled
    //     context, even though primary+outline IS baseline.
    //
    // Components using ONLY their library baseline defaults (Button, Card,
    // Badge, etc.) match neither condition: their defaults resolve to
    // primary+outline (not non-baseline) and no user props are set (not
    // user-intent). They stay attribute-free and inherit from ancestors.
    //
    // The `inherit` appearance is always excluded — it signals "inherit
    // from parent, don't emit" (Text, Title, Label, etc.).
    const userDefs = this.userDefaults as Record<string, boolean>;
    const userSetAppearance = ComponentKeys.appearance.some(k => componentProps[k] === true || userDefs[k] === true);
    const userSetVariant = ComponentKeys.variant.some(k => componentProps[k] === true || userDefs[k] === true);
    const isNonBaseline =
      (extractedKeys.appearance &&
       extractedKeys.appearance !== 'primary' &&
       extractedKeys.appearance !== 'inherit') ||
      (extractedKeys.variant &&
       extractedKeys.variant !== 'outline');
    if (
      (isNonBaseline || userSetAppearance || userSetVariant) &&
      extractedKeys.appearance &&
      extractedKeys.appearance !== 'inherit'
    ) {
      dataAttributes['data-appearance'] = extractedKeys.appearance;
      if (extractedKeys.variant) {
        dataAttributes['data-variant'] = extractedKeys.variant;
      }
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
