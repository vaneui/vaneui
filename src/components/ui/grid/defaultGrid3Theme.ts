import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { GridProps } from "./GridProps";
import type { GridTheme } from "./GridTheme";
import { GRID_CATEGORIES } from "../props/categoryBuilders";
import { gridDefaults } from "./gridDefaults";
import { gridSubThemes } from "./gridSubThemes";

export const defaultGrid3Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "vane-grid vane-grid-3 grid-cols-1 md:grid-cols-3",
  gridSubThemes,
  gridDefaults,
  GRID_CATEGORIES,
  undefined,
  'layout'
);
