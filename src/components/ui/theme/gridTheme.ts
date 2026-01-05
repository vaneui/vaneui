import { BaseComponentTheme, ComponentTheme, defaultLayoutsThemes, DefaultLayoutThemes } from "./common/ComponentTheme";
import type { GridProps } from "../grid";
import { themeDefaults } from "./defaults";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { SimpleConsumerTheme } from "./appearance/simpleConsumerTheme";
import { DeepPartial } from "../../utils/deepPartial";
import { GRID_CATEGORIES } from "../props";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass } from "../classes/appearanceClasses";

export interface GridTheme extends BaseComponentTheme {
  size: {
    gap: GapTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
    text: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    flexDirection: DirectionTheme;
    radius: RadiusTheme;
    border: BorderTheme;
  };
}

const gridSubThemes: DeepPartial<GridTheme> = {
  size: {
    gap: new GapTheme(),
  },
  appearance: {
    background: new SimpleConsumerTheme({ base: bgConsumerClasses.base }, 'bg'),
    text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
    border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
  },
  layout: {
    ...defaultLayoutsThemes,
    wrap: new WrapTheme(),
    flexDirection: new DirectionTheme(),
    radius: new RadiusTheme(),
    border: new BorderTheme(),
  },
};

export const defaultGrid2Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "vane-grid vane-grid-2 grid-cols-1 md:grid-cols-2",
  gridSubThemes,
  themeDefaults.grid2 as Partial<GridProps>,
  GRID_CATEGORIES,
  undefined,
  'layout'
);

export const defaultGrid3Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "vane-grid vane-grid-3 grid-cols-1 md:grid-cols-3",
  gridSubThemes,
  themeDefaults.grid3 as Partial<GridProps>,
  GRID_CATEGORIES
);

export const defaultGrid4Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "vane-grid vane-grid-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  gridSubThemes,
  themeDefaults.grid4 as Partial<GridProps>,
  GRID_CATEGORIES
);

export const defaultGrid5Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "vane-grid vane-grid-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  gridSubThemes,
  themeDefaults.grid5 as Partial<GridProps>,
  GRID_CATEGORIES
);

export const defaultGrid6Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "vane-grid vane-grid-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6",
  gridSubThemes,
  themeDefaults.grid6 as Partial<GridProps>,
  GRID_CATEGORIES
);
