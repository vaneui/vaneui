import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { GridProps } from "./GridProps";
import type { GridTheme } from "./GridTheme";
import { GRID_CATEGORIES } from "../props/categoryBuilders";
import { gridDefaults } from "./gridDefaults";
import { gridSubThemes } from "./gridSubThemes";

export const defaultGrid5Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "vane-grid vane-grid-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  gridSubThemes,
  gridDefaults,
  GRID_CATEGORIES,
  undefined,
  'layout'
);
