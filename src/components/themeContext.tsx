// Theme context module — deliberately import-light (P2-3 bundle decoupling).
//
// The context default is `null`, NOT the defaultTheme registry: a value
// default here would make every component's `useTheme()` import pull all 53
// component themes into the module graph regardless of which entry point the
// consumer used. Instead, each component resolves its own theme node with a
// static per-component fallback (`theme?.badge ?? defaultBadgeTheme`),
// importing only its own default theme. Mounting a ThemeProvider is the
// deliberate opt-in to the full registry (it imports defaultTheme to merge).
//
// This file must hold ONLY the context, the hook, and TYPE imports — no
// theme value imports, no ThemeProvider/defaultTheme re-exports (a re-export
// is a module-graph edge and would defeat the decoupling). Pinned by
// bundle-decoupling.test.tsx.

import { createContext, useContext } from 'react';
import type { ThemeProps } from './themeTypes';

/**
 * @internal Exported only so ThemeProvider (a separate module, so that this
 * one stays registry-free) can publish into the same context. Not public
 * API — consume the theme via `useTheme()`.
 */
export const ThemeContext = createContext<ThemeProps | null>(null);

/**
 * Returns the active theme tree, or `null` when no `ThemeProvider` is
 * mounted above the caller.
 *
 * Components do not require a provider: without one, each component falls
 * back to its own built-in default theme. Consumers reading the theme
 * directly must handle the `null` case (or mount a `ThemeProvider`, which
 * always provides a complete tree).
 */
export function useTheme(): ThemeProps | null {
  return useContext(ThemeContext);
}

export type {
  ThemeProps,
  PartialTheme,
  ThemeDefaults,
  ThemeExtraClasses,
  ThemeProviderProps,
  MergeStrategy,
} from './themeTypes';
