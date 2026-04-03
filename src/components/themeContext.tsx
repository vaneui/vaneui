// Re-export barrel — all theme system exports in one place.
// Components and consumers import from this file.
// Implementation is split across themeTypes.ts, defaultTheme.ts, and ThemeProvider.tsx.

export type {
  ThemeProps,
  PartialTheme,
  ThemeDefaults,
  ThemeExtraClasses,
  ThemeProviderProps,
  MergeStrategy,
} from './themeTypes';

export { defaultTheme } from './defaultTheme';
export { ThemeProvider, useTheme } from './ThemeProvider';
