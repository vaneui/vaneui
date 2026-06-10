import { createContext, useContext, useMemo } from 'react';
import type { ThemeProps, ThemeProviderProps } from './themeTypes';
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

function applyDefaultsRecursively(
  themeObject: Record<string, unknown> | object,
  defaultsObject: Record<string, unknown> | object,
  path: string = ''
): void {
  if (!themeObject || typeof themeObject !== 'object' || !defaultsObject || typeof defaultsObject !== 'object') {
    return;
  }

  if ('defaults' in themeObject &&
      typeof themeObject.defaults === 'object' &&
      themeObject.defaults !== null &&
      !('defaults' in defaultsObject)) {
    themeObject.defaults = mergeDefaults(
      themeObject.defaults as Record<string, boolean>,
      defaultsObject as Record<string, boolean>
    );
  } else {
    for (const key in defaultsObject) {
      const keyPath = path ? `${path}.${key}` : key;
      if (key in themeObject &&
          typeof (themeObject as Record<string, unknown>)[key] === 'object' &&
          (themeObject as Record<string, unknown>)[key] !== null &&
          typeof (defaultsObject as Record<string, unknown>)[key] === 'object' &&
          (defaultsObject as Record<string, unknown>)[key] !== null) {
        applyDefaultsRecursively((themeObject as Record<string, unknown>)[key] as Record<string, unknown>, (defaultsObject as Record<string, unknown>)[key] as Record<string, unknown>, keyPath);
      } else {
        warnDeadCustomization('themeDefaults', keyPath, SUB_THEME_HINT);
      }
    }
  }
}

function applyExtraClassesRecursively(
  themeObject: Record<string, unknown> | object,
  extraClassesObject: Record<string, unknown> | object,
  path: string = ''
): void {
  if (!themeObject || typeof themeObject !== 'object' || !extraClassesObject || typeof extraClassesObject !== 'object') {
    return;
  }

  if ('extraClasses' in themeObject &&
      typeof themeObject.extraClasses === 'object' &&
      themeObject.extraClasses !== null &&
      !('extraClasses' in extraClassesObject)) {
    themeObject.extraClasses = {
      ...themeObject.extraClasses,
      ...extraClassesObject as Record<string, string>
    };
  } else {
    for (const key in extraClassesObject) {
      const keyPath = path ? `${path}.${key}` : key;
      if (key in themeObject &&
          typeof (themeObject as Record<string, unknown>)[key] === 'object' &&
          (themeObject as Record<string, unknown>)[key] !== null &&
          typeof (extraClassesObject as Record<string, unknown>)[key] === 'object' &&
          (extraClassesObject as Record<string, unknown>)[key] !== null) {
        applyExtraClassesRecursively((themeObject as Record<string, unknown>)[key] as Record<string, unknown>, (extraClassesObject as Record<string, unknown>)[key] as Record<string, unknown>, keyPath);
      } else {
        warnDeadCustomization('extraClasses', keyPath, SUB_THEME_HINT);
      }
    }
  }
}

const ThemeContext = createContext<ThemeProps>(defaultTheme);

export function ThemeProvider(
  {
    children,
    theme: themeObject,
    themeDefaults,
    extraClasses,
    themeOverride,
    mergeStrategy = 'merge'
  }: ThemeProviderProps) {
  const parentTheme = useContext(ThemeContext);

  const mergedTheme = useMemo(() => {
      const baseTheme = mergeStrategy === 'replace'
        ? defaultTheme
        : parentTheme;

      // fast path: nothing to customize — reuse the base theme by reference.
      // Keeps context identity stable across re-renders and skips the
      // whole-tree clone (the clone below exists only to isolate mutations,
      // and this path performs none).
      if (themeObject === undefined &&
          themeDefaults === undefined &&
          extraClasses === undefined &&
          typeof themeOverride !== 'function') {
        return baseTheme;
      }

      // clone for isolation before merging
      let finalTheme = themeObject
        ? deepMerge(deepClone(baseTheme), themeObject)
        : deepClone(baseTheme);

      // themeOverride gets a fresh clone so the callback can't corrupt our copy
      if (typeof themeOverride === 'function') {
        finalTheme = themeOverride(deepClone(finalTheme));
      }

      // in-place mutation is safe — finalTheme is already a unique copy
      if (themeDefaults !== undefined) {
        applyDefaultsRecursively(finalTheme, themeDefaults);
      }

      if (extraClasses !== undefined) {
        applyExtraClassesRecursively(finalTheme, extraClasses);
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

export function useTheme(): ThemeProps {
  return useContext(ThemeContext);
}
