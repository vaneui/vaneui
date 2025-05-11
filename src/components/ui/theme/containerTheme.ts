import { ContainerThemeClass } from "./containerThemeClass";

// Re-export the ContainerThemeClass as ContainerTheme
export type ContainerTheme = ContainerThemeClass;

// Default container theme
export const defaultContainerTheme: ContainerTheme = ContainerThemeClass.createDefaultContainerTheme();
