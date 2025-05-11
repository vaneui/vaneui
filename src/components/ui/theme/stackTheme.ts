import { StackThemeClass } from "./stackThemeClass";

// Re-export the StackThemeClass as StackTheme
export type StackTheme = StackThemeClass;

// Default stack theme
export const defaultStackTheme: StackTheme = StackThemeClass.createDefaultStackTheme();
