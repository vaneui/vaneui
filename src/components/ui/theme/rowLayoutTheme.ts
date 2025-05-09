import { BaseLayoutTheme, createBaseLayoutTheme } from "./baseLayoutTheme";

export type RowLayoutTheme = BaseLayoutTheme & {
};

export const createRowLayoutTheme = (): RowLayoutTheme => {
  const baseTheme = createBaseLayoutTheme();

  return {
    ...baseTheme,
    direction: {
      ...baseTheme.direction,
      row: "flex-row",
    },
  };
};
