import { ChipLayoutThemeClass } from "./chipLayoutThemeClass";

// Re-export the ChipLayoutThemeClass as ChipLayoutTheme
export type ChipLayoutTheme = ChipLayoutThemeClass;

// Re-export the createChipLayoutTheme function from ChipLayoutThemeClass
export const createChipLayoutTheme = ChipLayoutThemeClass.createChipLayoutTheme;
