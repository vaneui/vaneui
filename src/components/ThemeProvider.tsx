import { useContext, useMemo } from 'react';
import type { ThemeProviderProps } from './themeTypes';
import { ThemeContext } from './themeContext';
import { defaultTheme } from './defaultTheme';
import { deepClone, deepMerge, mergeDefaults } from "./utils/deepMerge";

// dev-only: a customization key that matches no theme node is silently
// discarded by the duck-typed descent below — the #1 trap is the flat form
// `{ button: { filled: true } }` for components with sub-themes, which need
// `{ button: { main: { filled: true } } }`
const warnDeadCustomization = (option: string, path: string, hint: string): void => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `VaneUI ThemeProvider: ${option} path "${path}" does not match any theme node and will have no effect. ${hint}`
    );
  }
};

const SUB_THEME_HINT = 'Components with sub-themes need the nested form, e.g. { button: { main: { filled: true } } }.';

type ThemeNode = Record<string, unknown>;

const isObjectLike = (value: unknown): value is ThemeNode =>
  typeof value === 'object' && value !== null;

/** Shallow copy that keeps the prototype, so a ComponentTheme or mapper instance stays one. */
const copyNode = <T extends object>(node: T): T =>
  Array.isArray(node)
    ? ([...node] as unknown as T)
    : Object.assign(Object.create(Object.getPrototypeOf(node)), node);

// the two per-node slots a provider customizes, and how an incoming value combines with the node's own
const CUSTOMIZATION_SLOTS = {
  defaults: {
    option: 'themeDefaults',
    merge: (current: ThemeNode, incoming: ThemeNode): ThemeNode =>
      mergeDefaults(current as Record<string, boolean>, incoming as Record<string, boolean>),
  },
  extraClasses: {
    option: 'extraClasses',
    merge: (current: ThemeNode, incoming: ThemeNode): ThemeNode => ({ ...current, ...incoming }),
  },
} as const;

type CustomizationSlot = keyof typeof CUSTOMIZATION_SLOTS;

/* Applies a themeDefaults / extraClasses object to a theme tree without writing to it: a node
   that takes a customization is copied, and so is each ancestor on the way to it. Everything
   off that path is returned by reference, so the base theme (a parent provider's, or
   defaultTheme) stays untouched and its nodes keep their warm class caches. Returns the node
   itself when nothing below it changed. */
function withCustomization<T>(
  themeNode: T,
  customization: unknown,
  slot: CustomizationSlot,
  path: string = ''
): T {
  if (!isObjectLike(themeNode) || !isObjectLike(customization)) {
    return themeNode;
  }

  // a node that owns the slot takes the customization, unless the customization nests the slot name itself
  const current = slot in themeNode ? themeNode[slot] : undefined;
  if (isObjectLike(current) && !(slot in customization)) {
    const copy: ThemeNode = copyNode(themeNode);
    copy[slot] = CUSTOMIZATION_SLOTS[slot].merge(current, customization);
    return copy as T;
  }

  let copy: ThemeNode | undefined;
  for (const key in customization) {
    const keyPath = path ? `${path}.${key}` : key;
    const child = key in themeNode ? themeNode[key] : undefined;
    const childCustomization = customization[key];
    if (isObjectLike(child) && isObjectLike(childCustomization)) {
      const nextChild = withCustomization(child, childCustomization, slot, keyPath);
      if (nextChild !== child) {
        copy ??= copyNode(themeNode);
        copy[key] = nextChild;
      }
    } else {
      warnDeadCustomization(CUSTOMIZATION_SLOTS[slot].option, keyPath, SUB_THEME_HINT);
    }
  }

  return (copy ?? themeNode) as T;
}

export function ThemeProvider(
  {
    children,
    theme: themeObject,
    themeDefaults,
    extraClasses,
    themeOverride,
    mergeStrategy = 'merge'
  }: ThemeProviderProps) {
  // null when this is the root provider (context default is null — P2-3)
  const parentTheme = useContext(ThemeContext);

  const mergedTheme = useMemo(() => {
      const baseTheme = mergeStrategy === 'replace'
        ? defaultTheme
        : parentTheme ?? defaultTheme;

      // fast path: nothing to customize — reuse the base theme by reference.
      // Keeps context identity stable across re-renders.
      if (themeObject === undefined &&
          themeDefaults === undefined &&
          extraClasses === undefined &&
          typeof themeOverride !== 'function') {
        return baseTheme;
      }

      // Structural sharing: no step below writes to baseTheme. Each one copies the
      // nodes it changes (and their ancestors) and shares the rest by reference, so a
      // provider costs a handful of objects instead of a clone of the whole tree.
      // deepMerge is copy-on-write along the paths of its source.
      let finalTheme = themeObject
        ? deepMerge(baseTheme, themeObject)
        : baseTheme;

      // themeOverride may mutate anything it is handed, so it is the one input that
      // still gets a private clone of the whole tree
      if (typeof themeOverride === 'function') {
        finalTheme = themeOverride(deepClone(finalTheme));
      }

      if (themeDefaults !== undefined) {
        finalTheme = withCustomization(finalTheme, themeDefaults, 'defaults');
      }

      if (extraClasses !== undefined) {
        finalTheme = withCustomization(finalTheme, extraClasses, 'extraClasses');
      }

      return finalTheme;
    },
    [themeObject, themeDefaults, extraClasses, themeOverride, mergeStrategy, parentTheme]
  );

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
}
