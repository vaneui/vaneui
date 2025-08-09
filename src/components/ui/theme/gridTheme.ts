import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { GridProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { DeepPartial } from "../../utils/deepPartial";
import { GRID_CATEGORIES } from "../props";

export interface GridTheme extends BaseComponentTheme {
  size: {
    gap: GapTheme;
  };
  appearance: {
    background: AppearanceTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    flexDirection: DirectionTheme;
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
      xs: "gap-2",
      sm: "gap-4  max-lg:gap-2",
      md: "gap-6  max-lg:gap-4",
      lg: "gap-8  max-lg:gap-6 max-md:gap-4",
      xl: "gap-10 max-lg:gap-8 max-md:gap-6"
    }),
  },
  appearance: {
    background: AppearanceTheme.createLayoutBgTheme(),
  },
  layout: {
    ...defaultLayoutTheme,
    wrap: new WrapTheme(),
    flexDirection: new DirectionTheme(),
  },
};

export const defaultGrid3Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "grid-cols-1 md:grid-cols-3",
  gridSubThemes,
  gridDefaults,
  GRID_CATEGORIES,
  (props: GridProps, defaults: Partial<GridProps>) => {
    return props.href ? "a" : "div";
  }
);

export const defaultGrid4Theme = new ComponentTheme<GridProps, GridTheme>(
  "div",
  "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  gridSubThemes,
  gridDefaults,
  GRID_CATEGORIES,
  (props: GridProps, defaults: Partial<GridProps>) => {
    return props.href ? "a" : "div";
  }
);
