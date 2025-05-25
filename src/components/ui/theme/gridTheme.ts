import { ComponentTheme } from "./common/ComponentTheme";
import { GridProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { gridGaps } from "../classes/spacingClasses";

const gridDefaults: Partial<GridProps> = {
  md: true,
};

const gridSubThemes = {
  size: {
    gap: new GapTheme(gridGaps),
  },
};

export const defaultGrid3Theme = new ComponentTheme<GridProps>(
  "div",
  "grid grid-cols-1 md:grid-cols-3",
  gridSubThemes,
  gridDefaults,
);

export const defaultGrid4Theme = new ComponentTheme<GridProps>(
  "div",
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  gridSubThemes,
  gridDefaults,
);
