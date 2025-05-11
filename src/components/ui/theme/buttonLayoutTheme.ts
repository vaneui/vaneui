import { ButtonLayoutThemeClass } from "./buttonLayoutThemeClass";

// Re-export the ButtonLayoutThemeClass as ButtonLayoutTheme
export type ButtonLayoutTheme = ButtonLayoutThemeClass;

// Re-export the createButtonLayoutTheme function from ButtonLayoutThemeClass
export const createButtonLayoutTheme = ButtonLayoutThemeClass.createButtonLayoutTheme;
