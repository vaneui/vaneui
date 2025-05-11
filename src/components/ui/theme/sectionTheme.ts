import { SectionThemeClass } from "./sectionThemeClass";

// Re-export the SectionThemeClass as SectionTheme
export type SectionTheme = SectionThemeClass;

// Default section theme
export const defaultSectionTheme: SectionTheme = SectionThemeClass.createDefaultSectionTheme();
