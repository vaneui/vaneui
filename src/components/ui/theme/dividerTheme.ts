import { DividerThemeClass } from "./dividerThemeClass";

// Re-export the DividerThemeClass as DividerTheme
export type DividerTheme = DividerThemeClass;

// Default divider theme
export const defaultDividerTheme: DividerTheme = DividerThemeClass.createDefaultDividerTheme();
