import { StackLayoutThemeClass } from "./stackLayoutThemeClass";

// Re-export the StackLayoutThemeClass as StackLayoutTheme
export type StackLayoutTheme = StackLayoutThemeClass;

// Re-export the createStackLayoutTheme function from StackLayoutThemeClass
export const createStackLayoutTheme = StackLayoutThemeClass.createStackLayoutTheme;
