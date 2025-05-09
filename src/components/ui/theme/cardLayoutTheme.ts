import { BaseLayoutTheme, createBaseLayoutTheme } from "./baseLayoutTheme";

export type CardLayoutTheme = BaseLayoutTheme & {
};

export const createCardLayoutTheme = (): CardLayoutTheme => {
  const baseTheme = createBaseLayoutTheme();

  return {
    ...baseTheme,
  };
};
