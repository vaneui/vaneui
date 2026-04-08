import { createContext, useContext, useMemo } from 'react';
import type { ThemeProps, ThemeProviderProps } from './themeTypes';
import { defaultTheme } from './defaultTheme';
import { deepClone, deepMerge, mergeDefaults } from "./utils/deepMerge";

/**
 * Recursively applies themeDefaults from ThemeProvider into each matched
 * ComponentTheme's `userDefaults` field (NOT its library-baseline `defaults`).
 *
 * This split is load-bearing: values that come from ThemeProvider represent
 * user intent (the app owner configured them) and must cause data-appearance
 * / data-variant attributes to be emitted at render time. Values that come
 * from the library baseline (e.g. buttonDefaults.ts) are soft fallbacks for
 * pickFirstTruthyKeyByCategory only — they fill in missing props but do not
 * emit data attributes, which is what allows a default `<Button>` inside a
 * `<Card primary filled>` to inherit its colors via CSS custom-property
 * cascade.
 *
 * We detect a ComponentTheme node by looking for BOTH `defaults` and
 * `userDefaults` — every ComponentTheme constructor now seeds `userDefaults`
 * to an empty object, so this is a reliable marker.
 */
function applyDefaultsRecursively(
  themeObject: Record<string, unknown> | object,
  defaultsObject: Record<string, unknown> | object
): void {
  if (!themeObject || typeof themeObject !== 'object' || !defaultsObject || typeof defaultsObject !== 'object') {
    return;
  }

  // If this theme object is a ComponentTheme (has both defaults AND
  // userDefaults) and defaultsObject does not itself look like a nested
  // theme bag, merge into userDefaults.
  if ('defaults' in themeObject &&
      'userDefaults' in themeObject &&
      typeof themeObject.defaults === 'object' &&
      themeObject.defaults !== null &&
      !('defaults' in defaultsObject)) {
    (themeObject as Record<string, unknown>).userDefaults = mergeDefaults(
      (themeObject.userDefaults ?? {}) as Record<string, boolean>,
      defaultsObject as Record<string, boolean>
    );
  } else {
    // Recursively navigate matching structure
    for (const key in defaultsObject) {
      if (key in themeObject &&
          typeof (themeObject as Record<string, unknown>)[key] === 'object' &&
          (themeObject as Record<string, unknown>)[key] !== null &&
          typeof (defaultsObject as Record<string, unknown>)[key] === 'object' &&
          (defaultsObject as Record<string, unknown>)[key] !== null) {
        applyDefaultsRecursively((themeObject as Record<string, unknown>)[key] as Record<string, unknown>, (defaultsObject as Record<string, unknown>)[key] as Record<string, unknown>);
      }
    }
  }
}

/**
 * Recursively applies extra classes to theme objects while preserving structure.
 * Navigates both theme and extraClasses objects in parallel.
 */
function applyExtraClassesRecursively(
  themeObject: Record<string, unknown> | object,
  extraClassesObject: Record<string, unknown> | object
): void {
  if (!themeObject || typeof themeObject !== 'object' || !extraClassesObject || typeof extraClassesObject !== 'object') {
    return;
  }

  // If this theme object has an 'extraClasses' property and extraClassesObject looks like extra classes
  if ('extraClasses' in themeObject &&
      typeof themeObject.extraClasses === 'object' &&
      themeObject.extraClasses !== null &&
      !('extraClasses' in extraClassesObject)) {
    // extraClassesObject is the actual extra classes to apply
    themeObject.extraClasses = {
      ...themeObject.extraClasses,
      ...extraClassesObject as Record<string, string>
    };
  } else {
    // Recursively navigate matching structure
    for (const key in extraClassesObject) {
      if (key in themeObject &&
          typeof (themeObject as Record<string, unknown>)[key] === 'object' &&
          (themeObject as Record<string, unknown>)[key] !== null &&
          typeof (extraClassesObject as Record<string, unknown>)[key] === 'object' &&
          (extraClassesObject as Record<string, unknown>)[key] !== null) {
        applyExtraClassesRecursively((themeObject as Record<string, unknown>)[key] as Record<string, unknown>, (extraClassesObject as Record<string, unknown>)[key] as Record<string, unknown>);
      }
    }
  }
}

const ThemeContext = createContext<ThemeProps>(defaultTheme);

export function ThemeProvider(
  {
    children,
    theme: themeObject = {},
    themeDefaults,
    extraClasses,
    themeOverride,
    mergeStrategy = 'merge'
  }: ThemeProviderProps) {
  const parentTheme = useContext(ThemeContext);

  const mergedTheme = useMemo(() => {
      // Determine the base theme based on merge strategy
      const baseTheme = mergeStrategy === 'replace'
        ? defaultTheme
        : parentTheme;

      // Deep clone once for isolation, then merge overrides into it
      let finalTheme = themeObject
        ? deepMerge(deepClone(baseTheme), themeObject)
        : deepClone(baseTheme);

      // themeOverride receives a fresh clone so the callback can't corrupt our copy
      if (typeof themeOverride === 'function') {
        finalTheme = themeOverride(deepClone(finalTheme));
      }

      // Apply defaults and extra classes in-place — finalTheme is already
      // a unique copy not shared with any other provider or consumer
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
