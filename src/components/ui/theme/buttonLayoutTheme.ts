import { BaseLayoutTheme, createBaseLayoutTheme } from "./baseLayoutTheme";
import { SizeKey } from "../props/propKeys";
import { roundedMap } from "../classes/buttonClasses";

export type ButtonLayoutTheme = BaseLayoutTheme & {
  radius?: Record<SizeKey, string>;
};

export const createButtonLayoutTheme = (): ButtonLayoutTheme => {
  const baseTheme = createBaseLayoutTheme();

  return {
    ...baseTheme,
    radius: roundedMap
  };
};