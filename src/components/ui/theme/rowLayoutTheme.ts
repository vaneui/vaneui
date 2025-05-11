import { RowLayoutThemeClass } from "./rowLayoutThemeClass";

// Re-export the RowLayoutThemeClass as RowLayoutTheme
export type RowLayoutTheme = RowLayoutThemeClass;

// Re-export the createRowLayoutTheme function from RowLayoutThemeClass
export const createRowLayoutTheme = RowLayoutThemeClass.createRowLayoutTheme;
