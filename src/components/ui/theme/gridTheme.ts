import { GridThemeClass } from "./gridThemeClass";

// Re-export the GridThemeClass as GridTheme
export type GridTheme = GridThemeClass;

// Default grid theme
export const defaultGridTheme: GridTheme = GridThemeClass.createDefaultGridTheme();

// Grid3 specific theme
export const grid3Theme: GridTheme = GridThemeClass.createGrid3Theme();

// Grid4 specific theme
export const grid4Theme: GridTheme = GridThemeClass.createGrid4Theme();
