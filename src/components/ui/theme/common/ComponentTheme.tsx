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
  /** Library baseline defaults. Values here act as soft fallbacks only —
   *  they are used by pickFirstTruthyKeyByCategory as a last resort but they
   *  do NOT cause data-appearance / data-variant attributes to be emitted.
   *  This lets a default `<Button>` inherit its colors from the nearest
   *  ancestor or :root via CSS custom-property cascade. */
  defaults: Partial<P>;
  /** Theme-provider overrides from `themeDefaults`. Values here are treated
   *  as user intent: they participate in category extraction via pickFirst
   *  AND cause data attribute emission, so `<ThemeProvider themeDefaults={{
   *  badge: { danger: true } }}>` works as expected. Populated in-place by
   *  ThemeProvider.applyDefaultsRecursively; stays empty in the library
   *  default theme. */
  userDefaults: Partial<P>;
  /** When true, the appearance+variant keys in `defaults` are treated as
   *  semantic identity — they emit data-appearance/data-variant attributes
   *  and trigger the component's own CSS rule instead of inheriting from
   *  an ancestor. Set to true for Mark, Chip, Link, MenuLabel, Checkbox
   *  (components whose visual identity requires a specific palette
   *  regardless of context); left false for Button, Card, Badge, Code,
   *  etc., which are expected to inherit from a filled ancestor via CSS
   *  custom-property cascade. Per-instance user props and ThemeProvider
   *  `themeDefaults` still override the identity in the usual way. */
  readonly hasIdentity: boolean;
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
    vaneType?: VaneComponentType,
    hasIdentity: boolean = false
  ) {
    this.tag = tag;
    this.base = base;
    this.defaults = defaults;
    this.userDefaults = {};
    this.extraClasses = {};
    this.categories = categories;
    // Safe: P extends ComponentProps, and getTag() always passes P-typed values.
    // All existing tagFunctions only access optional props (e.g. href).
    this.tagFunction = tagFunction as typeof this.tagFunction;
    this.vaneType = vaneType;
    this.hasIdentity = hasIdentity;
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
      this.hasIdentity,
    );
  }

  getClasses(props: P, precomputedKeys?: Record<string, string>): string[] {
    const componentProps = props as unknown as Record<string, boolean>;
    const classes: string[] = [];

    if (this.base) {
      classes.push(...this.base.split(/\s+/));
    }

    const defaults = this.defaults as Record<string, boolean>;
    const effectiveProps: Record<string, boolean> = {
      ...(this.userDefaults as Record<string, boolean>),
      ...componentProps,
    };
    if (this.hasIdentity) {
      this.promoteIdentityCategory(effectiveProps, defaults, ComponentKeys.appearance);
      this.promoteIdentityCategory(effectiveProps, defaults, ComponentKeys.variant);
    }
    let extractedKeys: Record<string, string>;
    if (precomputedKeys) {
      extractedKeys = precomputedKeys;
    } else {
      extractedKeys = {};
      for (const category of this.categories) {
        const key = pickFirstTruthyKeyByCategory(effectiveProps, defaults, category);
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

  /** Helper for hasIdentity=true components. If `effectiveProps` does not
   *  already contain a truthy key in `categoryKeys`, mutate it to include
   *  the first truthy key for that category from `defaults`. Used to
   *  promote semantic-identity appearance/variant from the library
   *  baseline into the user-intent path so data attributes are emitted.
   *  No-op if the category is already covered or if no default is set. */
  private promoteIdentityCategory(
    effectiveProps: Record<string, boolean>,
    defaults: Record<string, boolean>,
    categoryKeys: readonly string[],
  ): void {
    for (const k of categoryKeys) {
      if (effectiveProps[k] === true) return;
    }
    for (const k of categoryKeys) {
      if (defaults[k] === true) {
        effectiveProps[k] = true;
        return;
      }
    }
  }

  getComponentConfig(props: P) {
    const cleanProps: Record<string, unknown> = {...props};
    const componentProps = props as unknown as Record<string, boolean>;
    const defaults = this.defaults as Record<string, boolean>;
    // Effective props merge: library baseline (defaults) is applied LAST
    // inside pickFirstTruthyKeyByCategory as a soft fallback. userDefaults
    // (from ThemeProvider.themeDefaults) and direct JSX props both represent
    // user intent and flow through the same "props" path so that category
    // extraction AND data-attribute emission treat them identically.
    const effectiveProps: Record<string, boolean> = {
      ...(this.userDefaults as Record<string, boolean>),
      ...componentProps,
    };

    // Identity promotion: for components with hasIdentity=true (Mark, Chip,
    // Link, MenuLabel, Checkbox), the appearance/variant keys in `defaults`
    // represent semantic identity that must emit data attributes. If the
    // user hasn't already covered one of these categories (via JSX props or
    // themeDefaults), promote the first truthy default key for that category
    // into effectiveProps so it reaches the data-attribute gate below.
    if (this.hasIdentity) {
      this.promoteIdentityCategory(effectiveProps, defaults, ComponentKeys.appearance);
      this.promoteIdentityCategory(effectiveProps, defaults, ComponentKeys.variant);
    }

    // Extract keys for data attributes
    const extractedKeys: Record<string, string> = {};
    for (const category of this.categories) {
      const key = pickFirstTruthyKeyByCategory(effectiveProps, defaults, category);
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
    // Data attributes are emitted only when "user intent" provided an
    // appearance or variant. User intent = direct JSX props + ThemeProvider
    // themeDefaults (both flow into effectiveProps). Library baseline defaults
    // (this.defaults) fill in whichever side the user did not provide — so
    // `<Button filled>` still resolves to filled + primary — but a component
    // using ONLY its library baseline stays attribute-free and inherits its
    // colors from the nearest ancestor (or :root) via CSS custom-property
    // cascade. This makes explicit props always win over any inherited
    // filled context.
    const userSetAppearance = ComponentKeys.appearance.some(k => effectiveProps[k] === true);
    const userSetVariant = ComponentKeys.variant.some(k => effectiveProps[k] === true);
    if (
      (userSetAppearance || userSetVariant) &&
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
