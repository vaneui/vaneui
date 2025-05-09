import { BaseLayoutTheme, createBaseLayoutTheme } from "./baseLayoutTheme";

export type LayoutTheme = BaseLayoutTheme;

import { SizeKey } from "../props/propKeys";
export const createDefaultLayoutTheme = (radius: Record<SizeKey, string> | undefined = undefined): LayoutTheme => {
  return createBaseLayoutTheme(radius);
};
