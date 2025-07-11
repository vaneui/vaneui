import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme } from "./common/ComponentTheme";
import { GridProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { DeepPartial } from "../../utils/deepPartial";

export interface GridTheme extends BaseComponentTheme {
  size: {
    gap: GapTheme;
  };
}

const gridDefaults: Partial<GridProps> = {
  md: true,
  gap: true,
  grid: true,
};

const gridSubThemes: DeepPartial<GridTheme> = {
  size: {
    gap: new GapTheme({
      gap: {
        xs: "gap-2",
        sm: "gap-4  max-lg:gap-2",
        md: "gap-6  max-lg:gap-4",
        lg: "gap-8  max-lg:gap-6 max-md:gap-4",
        xl: "gap-10 max-lg:gap-8 max-md:gap-6"
      }
    }),
  },
  layout: defaultLayoutTheme,
};

export const defaultGrid3Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "grid-cols-1 md:grid-cols-3",
  gridSubThemes,
  gridDefaults,
);

export const defaultGrid4Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  gridSubThemes,
  gridDefaults,
);
