import { RowThemeClass } from "./rowThemeClass";

// Re-export the RowThemeClass as RowTheme
export type RowTheme = RowThemeClass;

// Default row theme
export const defaultRowTheme: RowTheme = RowThemeClass.createDefaultRowTheme();
