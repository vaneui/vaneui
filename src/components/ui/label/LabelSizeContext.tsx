import { createContext, useContext } from 'react';
import type React from 'react';
import type { SizeKey } from '../props';
import type { ComponentTheme } from '../theme/common';
import { mergeDefaults } from '../../utils/deepMerge';

/**
 * Resolved size of the nearest Label ancestor, consumed by its form children
 * (Input, Checkbox). A scalar context instead of a nested ThemeProvider, so
 * mounting a Label never forks the theme graph — useTheme() inside a Label
 * subtree returns the same object as outside.
 */
export const LabelSizeContext = createContext<SizeKey | null>(null);

export function useLabelSizeContext(): SizeKey | null {
  return useContext(LabelSizeContext);
}

// mirrors ComponentTheme's own (unexported) props constraint
type ThemeableProps = { className?: string; children?: React.ReactNode; tag?: React.ElementType };

/* Derives a theme whose size default is the propagated Label size (merged at defaults level, so explicit child size still wins); withDefaults shares themes/base by reference, so it's cheap. */
export function withLabelSizeDefault<P extends ThemeableProps, T extends object>(
  theme: ComponentTheme<P, T>,
  size: SizeKey | null
): ComponentTheme<P, T> {
  if (size === null) {
    return theme;
  }
  const derived = theme.withDefaults(
    mergeDefaults(theme.defaults as Record<string, boolean>, { [size]: true }) as Partial<P>
  );
  // withDefaults resets extraClasses; share the source theme's so extra
  // classes from an outer ThemeProvider still apply inside a Label
  derived.extraClasses = theme.extraClasses;
  return derived;
}
