import { GapSizeTheme } from "./size/gapSizeTheme";
import { TypographyTheme } from "./typography/typographyTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { GridProps } from "../props/props";

const gridGap = new GapSizeTheme({
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-5',
  xl: 'gap-6',
});

const gridTypography = TypographyTheme.createDefaultTypographyTheme();
const gridAppearance = SimpleAppearanceTheme.createDefaultStyle();
const gridDefaults: Partial<Record<keyof GridProps, boolean>> = {
  md: true,
  transparent: true,
};

const gridSubThemes = {
  size: {
    gap: gridGap,
  },
  typography: gridTypography,
  appearance: gridAppearance,
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
