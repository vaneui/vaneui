import { ComponentTheme } from "../theme/common";
import type { GridProps } from "./GridProps";
import type { GridTheme } from "./GridTheme";
import { GRID_CATEGORIES } from "../props/categoryBuilders";
import { gridDefaults } from "./gridDefaults";
import { gridSubThemes } from "./gridSubThemes";

export const defaultGrid4Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "vane-grid vane-grid-4 grid-cols-4 max-mobile:grid-cols-2",
  gridSubThemes,
  gridDefaults,
  GRID_CATEGORIES,
  undefined,
  'layout'
);
