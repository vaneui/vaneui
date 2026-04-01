import { createContext, useContext, useMemo } from 'react';
import type { ThemeProps, ThemeProviderProps } from './themeTypes';
import { defaultTheme } from './defaultTheme';
import { deepClone, deepMerge, mergeDefaults } from "./utils/deepMerge";

/**
 * Recursively applies defaults to theme objects while preserving structure.
 * Navigates both theme and defaults objects in parallel.
 */
function applyDefaultsRecursively(
  themeObject: Record<string, unknown> | object,
  defaultsObject: Record<string, unknown> | object
): void {
  if (!themeObject || typeof themeObject !== 'object' || !defaultsObject || typeof defaultsObject !== 'object') {
    return;
  }

  // If this theme object has a 'defaults' property and defaultsObject looks like defaults
  if ('defaults' in themeObject &&
      typeof themeObject.defaults === 'object' &&
      themeObject.defaults !== null &&
      !('defaults' in defaultsObject)) {
    // defaultsObject is the actual defaults to apply
    themeObject.defaults = mergeDefaults(
      themeObject.defaults as Record<string, boolean>,
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

      // Always start with a deep clone to ensure isolation
      let finalTheme = themeObject
        ? deepMerge(deepClone(baseTheme), themeObject)
        : deepClone(baseTheme);

      if (typeof themeOverride === 'function') {
        const themeToModify = deepClone(finalTheme);
        finalTheme = themeOverride(themeToModify);
      }

      if (themeDefaults !== undefined) {
        // Clone before modifying to ensure isolation
        finalTheme = deepClone(finalTheme);
        // Apply defaults recursively, preserving the structure
        applyDefaultsRecursively(finalTheme, themeDefaults);
      }

      if (extraClasses !== undefined) {
        // Clone before modifying to ensure isolation
        finalTheme = deepClone(finalTheme);
        // Apply extra classes recursively, preserving the structure
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
