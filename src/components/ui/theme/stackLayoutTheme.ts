import { BaseLayoutTheme, createBaseLayoutTheme } from "./baseLayoutTheme";

export type StackLayoutTheme = BaseLayoutTheme & {
};

export const createStackLayoutTheme = (): StackLayoutTheme => {
  const baseTheme = createBaseLayoutTheme();

  return {
    ...baseTheme,
  };
};
