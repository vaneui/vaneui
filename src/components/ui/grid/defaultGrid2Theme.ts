import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { GridProps } from "./GridProps";
import type { GridTheme } from "./GridTheme";
import { GRID_CATEGORIES } from "../props/categoryBuilders";
import { gridDefaults } from "./gridDefaults";
import { gridSubThemes } from "./gridSubThemes";

export const defaultGrid2Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "vane-grid vane-grid-2 grid-cols-1 md:grid-cols-2",
  gridSubThemes,
  gridDefaults,
  GRID_CATEGORIES,
  undefined,
  'layout'
);
