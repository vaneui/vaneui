import { ColThemeClass } from "./colThemeClass";

// Re-export the ColThemeClass as ColTheme
export type ColTheme = ColThemeClass;

// Default col theme
export const defaultColTheme: ColTheme = ColThemeClass.createDefaultColTheme();
