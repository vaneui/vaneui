import { BaseLayoutTheme, createBaseLayoutTheme } from "./baseLayoutTheme";
import { SizeKey } from "../props/propKeys";
import { roundedMap } from "../classes/badgeClasses";

export type BadgeLayoutTheme = BaseLayoutTheme & {
  radius?: Record<SizeKey, string>;
};

export const createBadgeLayoutTheme = (): BadgeLayoutTheme => {
  const baseTheme = createBaseLayoutTheme();

  return {
    ...baseTheme,
    radius: roundedMap
  };
};