import { CardLayoutThemeClass } from "./cardLayoutThemeClass";

// Re-export the CardLayoutThemeClass as CardLayoutTheme
export type CardLayoutTheme = CardLayoutThemeClass;

// Re-export the createCardLayoutTheme function from CardLayoutThemeClass
export const createCardLayoutTheme = CardLayoutThemeClass.createCardLayoutTheme;
