import { BaseComponentTheme, ComponentTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { GridProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { gridGaps } from "../classes/spacingClasses";

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
    gap: new GapTheme({gap: gridGaps}),
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
