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

// HTML tags where the native disabled attribute is valid and desired
const NATIVE_DISABLED_TAGS = new Set([
  'button', 'input', 'select', 'textarea', 'fieldset', 'optgroup', 'option',
]);

// props consumed by the theme engine itself — never forwarded to the DOM
// (boolean category props are stripped separately via ResolutionState.omitKeys)
const INTERNAL_PROPS = new Set(['className', 'tag', 'children', 'theme']);

// attributes that are invalid on a given resolved tag — stripped so a wrong-tag
// HTML attribute can't leak through a tag-switching component (e.g. type/form
// reaching a rendered <a>, or href/target/download/rel reaching a rendered
// <button>). Components like Button/NavLink/Badge union button + anchor attrs.
const TAG_INVALID_ATTRS: Record<string, readonly string[]> = {
  a: ['type', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget'],
  button: ['href', 'target', 'download', 'rel', 'hrefLang', 'ping'],
};

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

/**
 * Per-instance derived resolution state:
 * - omitKeys / baseClasses are constants derived from `categories` / `base`,
 *   previously recomputed on every getComponentConfig / getClasses call.
 * - walkCache memoizes the theme-tree walk per extracted-keys signature. The
 *   walk output is a pure function of (themes tree, extractedKeys): mappers
 *   are stateless class-string holders (see BaseClassMapper subclasses), and
 *   the tree is walked in stable Object.keys order. `defaults` deliberately
 *   does NOT invalidate the cache — it only influences which keys get
 *   extracted (the cache KEY) — and `extraClasses` are applied per call in
 *   getClasses, never cached.
 */
interface ResolutionState {
  /** boolean prop names consumed by the theme system (union of all category keys) — stripped from DOM props */
  omitKeys: ReadonlySet<string>;
  /** `base` pre-split on whitespace, empty entries removed */
  baseClasses: readonly string[];
  /** extracted-keys signature → theme-tree walk output (pre-filtered, treated as immutable) */
  walkCache: Map<string, readonly string[]>;
}

/**
 * Resolution state is keyed by instance IDENTITY in a module-level WeakMap —
 * deliberately NOT stored on the instance. Both deepClone and deepMerge copy
 * ComponentTheme instances generically (prototype-preserving Object.assign of
 * enumerable own properties), so state stored on the instance would either
 * travel into clones — serving class strings computed BEFORE ThemeProvider
 * applied that clone's themeOverride / themeDefaults / extraClasses
 * customizations — or break outright (Set/Map internal slots do not survive a
 * generic property copy). Keying by identity guarantees every clone / merged
 * copy / withDefaults() instance starts cold and derives state from its OWN
 * base / categories / themes.
 *
 * Safety invariant (matches ThemeProvider's contract): all theme
 * customization — themeOverride mutating mapper nodes in place,
 * applyDefaultsRecursively replacing `defaults`, applyExtraClassesRecursively
 * replacing `extraClasses` — happens inside ThemeProvider's useMemo on a
 * freshly deep-cloned tree, strictly BEFORE children can render and resolve
 * classes against it. A fresh clone is never warm, so no cache entry can
 * predate a customization. Mutating a theme instance AFTER it has rendered is
 * unsupported (it already produced torn output before this cache existed —
 * only re-rendered components would pick the mutation up).
 *
 * NOTE: this is unrelated to the reverted P0-4 "WeakMap visited cache" inside
 * deepClone — cloning still forks every node per occurrence; this map never
 * affects clone identity or sharing, it only memoizes pure per-instance
 * derivations. Growth is bounded: at most one entry per live theme instance
 * (WeakMap-keyed, GC-friendly), each holding one walk result per distinct
 * category-value combination actually rendered with that instance.
 */
const resolutionStateMap = new WeakMap<object, ResolutionState>();

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

  private resolutionState(): ResolutionState {
    let state = resolutionStateMap.get(this);
    if (state === undefined) {
      state = {
        omitKeys: new Set<string>(this.categories.flatMap(category => ComponentKeys[category])),
        baseClasses: this.base ? this.base.split(/\s+/).filter(Boolean) : [],
        walkCache: new Map(),
      };
      resolutionStateMap.set(this, state);
    }
    return state;
  }

  /**
   * Resolve the active key for every category (explicit props win over
   * defaults) and expand the `inherit` appearance shorthand into the granular
   * inheritColor / inheritBg / inheritBorder flags (size inheritance stays
   * opt-in via inheritSize).
   *
   * Single source of truth for key resolution: getClasses and
   * getComponentConfig both resolve through here, so the public getClasses
   * sees the exact same expanded key set the render path uses. (Previously
   * the expansion lived only in getComponentConfig, so the two entry points
   * could disagree — e.g. extraClasses keyed on `inheritColor` applied when
   * rendering but not via a direct getClasses call.)
   */
  private resolveExtractedKeys(props: P): Record<string, string> {
    const componentProps = props as unknown as Record<string, boolean>;
    const defaults = this.defaults as Record<string, boolean>;

    const extractedKeys: Record<string, string> = {};
    for (const category of this.categories) {
      const key = pickFirstTruthyKeyByCategory(componentProps, defaults, category);
      if (key !== undefined) {
        extractedKeys[category] = key;
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

    return extractedKeys;
  }

  getClasses(props: P, precomputedKeys?: Record<string, string>): string[] {
    const extractedKeys = precomputedKeys ?? this.resolveExtractedKeys(props);
    const state = this.resolutionState();

    const classes: string[] = state.baseClasses.slice();

    // Signature of the resolved keys. for...in (not Object.keys) so any
    // enumerable inherited key on a caller-supplied precomputedKeys object is
    // captured too — mappers read keys via plain property access, which also
    // sees the prototype chain, and the signature must cover everything the
    // walk can observe. Both internal paths build plain objects in stable
    // `categories` order, so signatures are stable per instance.
    let signature = '';
    for (const category in extractedKeys) {
      signature += category;
      signature += ':';
      signature += extractedKeys[category];
      signature += '|';
    }

    let walkClasses = state.walkCache.get(signature);
    if (walkClasses === undefined) {
      const collected: string[] = [];
      const walk = (map: object) => {
        for (const key of Object.keys(map)) {
          const node = (map as ThemeMap<P>)[key];

          if (node instanceof BaseClassMapper) {
            collected.push(...node.getClasses(extractedKeys));
          } else if (node && typeof node === "object" && !Array.isArray(node)) {
            walk(node);
          }
        }
      };
      walk(this.themes);
      walkClasses = collected.filter(Boolean);
      state.walkCache.set(signature, walkClasses);
    }
    classes.push(...walkClasses);

    // extraClasses are applied per call (never cached) so the cached walk
    // output stays valid even if extraClasses are replaced on this instance
    for (const [, value] of Object.entries(extractedKeys)) {
      if (value && this.extraClasses[value as keyof P]) {
        const existingClasses = this.extraClasses[value as keyof P];
        if (existingClasses !== undefined) {
          classes.push(...existingClasses.split(/\s+/));
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
    const componentProps = props as unknown as Record<string, boolean>;
    const extractedKeys = this.resolveExtractedKeys(props);

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

    const { omitKeys } = this.resolutionState();

    // Build the DOM-props object in a single pass over the props actually
    // present, skipping theme-consumed keys via the precomputed omit set.
    // (Previously: spread the props, then issue one `delete` per possible
    // category key — 150+ deletes per render regardless of how few props the
    // element actually has.)
    const rawProps = props as Record<PropertyKey, unknown>;
    const other: Record<PropertyKey, unknown> = {};
    for (const key of Object.keys(rawProps)) {
      if (omitKeys.has(key) || INTERNAL_PROPS.has(key)) {
        continue;
      }
      other[key] = rawProps[key];
    }
    // parity with the previous spread-based copy: enumerable symbol-keyed
    // props were forwarded too, and Object.keys only yields string keys
    for (const sym of Object.getOwnPropertySymbols(rawProps)) {
      if (Object.prototype.propertyIsEnumerable.call(rawProps, sym)) {
        other[sym] = rawProps[sym];
      }
    }

    const { className, tag } = props;
    const componentTag: React.ElementType = tag ?? this.getTag(props) ?? "div";

    // preserve the HTML-native disabled attr (it overlaps with a category
    // key), but only on tags that support it — a placeholder link rendered
    // for disabled href-switching must stay focusable per the aria-disabled
    // pattern, and native disabled would pull it out of the tab order
    const supportsNativeDisabled =
      typeof componentTag !== 'string' || NATIVE_DISABLED_TAGS.has(componentTag);
    if (rawProps.disabled !== undefined && supportsNativeDisabled) {
      other.disabled = rawProps.disabled;
    } else if (!supportsNativeDisabled && 'disabled' in other) {
      // a tag that doesn't support native disabled (e.g. <a>, <span>) must not
      // carry a leaked `disabled` attribute — the state is exposed via
      // data-disabled / aria-disabled instead
      delete other.disabled;
    }

    // drop attributes that don't belong on the resolved tag
    if (typeof componentTag === 'string') {
      const invalidAttrs = TAG_INVALID_ATTRS[componentTag];
      if (invalidAttrs) {
        for (const attr of invalidAttrs) {
          if (attr in other) delete other[attr];
        }
      }
    }

    const themeGeneratedClasses = this.getClasses(props, extractedKeys);
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
    if (rawProps.disabled) {
      dataAttributes['data-disabled'] = 'true';
    }
    if (rawProps.readOnly) {
      dataAttributes['data-readonly'] = 'true';
    }
    // error state must be AT-perceivable, not color-only: emit aria-invalid
    // (unless the consumer set it explicitly) alongside a data-status hook
    if (extractedKeys.status === 'error') {
      dataAttributes['data-status'] = 'error';
      if (rawProps['aria-invalid'] === undefined) {
        dataAttributes['aria-invalid'] = 'true';
      }
    }

    return {
      Tag: componentTag,
      finalClasses,
      finalProps: { ...other, ...dataAttributes },
    };
  }
}
