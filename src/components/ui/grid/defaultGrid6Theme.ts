import { ComponentTheme } from "../theme/common";
import type { GridProps } from "./GridProps";
import type { GridTheme } from "./GridTheme";
import { GRID_CATEGORIES } from "../props/categoryBuilders";
import { gridDefaults } from "./gridDefaults";
import { gridSubThemes } from "./gridSubThemes";

export const defaultGrid6Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "vane-grid vane-grid-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6",
  gridSubThemes,
  gridDefaults,
  GRID_CATEGORIES,
  undefined,
  'layout'
);
