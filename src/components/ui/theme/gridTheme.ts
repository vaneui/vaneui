import { BaseComponentTheme, ComponentTheme } from "./common/ComponentTheme";
import { GridProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";

export interface GridTheme<P> extends BaseComponentTheme<P> {
  size: {
    gap: GapTheme;
  };
}

const gridDefaults: Partial<GridProps> = {
  md: true,
  gap: true,
};

const gridSubThemes = {
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
};

export const defaultGrid3Theme = new ComponentTheme<GridProps, GridTheme<GridProps>>(
  "div",
  "grid grid-cols-1 md:grid-cols-3",
  gridSubThemes,
  gridDefaults,
);

export const defaultGrid4Theme = new ComponentTheme<GridProps, GridTheme<GridProps>>(
  "div",
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  gridSubThemes,
  gridDefaults,
);
