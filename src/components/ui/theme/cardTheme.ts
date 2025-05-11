import { CardThemeClass } from "./cardThemeClass";

// Re-export the CardThemeClass as CardTheme
export type CardTheme = CardThemeClass;

// Default card theme
export const defaultCardTheme: CardTheme = CardThemeClass.createDefaultCardTheme();
