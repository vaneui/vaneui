import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";

// Re-export the BaseLayoutThemeClass as BaseLayoutTheme
export type BaseLayoutTheme = BaseLayoutThemeClass;

// Re-export the createBaseLayoutTheme function from BaseLayoutThemeClass
export const createBaseLayoutTheme = BaseLayoutThemeClass.createBaseLayoutTheme;
