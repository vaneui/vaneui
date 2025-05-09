import { BaseLayoutTheme, createBaseLayoutTheme } from "./baseLayoutTheme";

export type ColLayoutTheme = BaseLayoutTheme & {
};

export const createColLayoutTheme = (): ColLayoutTheme => {
  const baseTheme = createBaseLayoutTheme();

  return {
    ...baseTheme,
    direction: {
      ...baseTheme.direction,
      column: "flex-col",
    },
  };
};
