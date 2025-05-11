import { BadgeLayoutThemeClass } from "./badgeLayoutThemeClass";

// Re-export the BadgeLayoutThemeClass as BadgeLayoutTheme
export type BadgeLayoutTheme = BadgeLayoutThemeClass;

// Re-export the createBadgeLayoutTheme function from BadgeLayoutThemeClass
export const createBadgeLayoutTheme = BadgeLayoutThemeClass.createBadgeLayoutTheme;
