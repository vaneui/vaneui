import { ColLayoutThemeClass } from "./colLayoutThemeClass";

// Re-export the ColLayoutThemeClass as ColLayoutTheme
export type ColLayoutTheme = ColLayoutThemeClass;

// Re-export the createColLayoutTheme function from ColLayoutThemeClass
export const createColLayoutTheme = ColLayoutThemeClass.createColLayoutTheme;
