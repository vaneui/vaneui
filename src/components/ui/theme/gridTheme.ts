import { SizeTheme } from "./size/sizeTheme";
import { BaseLayoutTheme } from "./layout/baseLayoutTheme";
import { TypographyTheme } from "./typography/typographyTheme";
import { SimpleComponentTheme } from "./common/simpleComponentTheme";

const gridSize = new SizeTheme(
  undefined,
  undefined,
  undefined,
  {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-5',
    xl: 'gap-6',
  });

const gridTypography = TypographyTheme.createDefaultTypographyTheme();
const gridLayout = BaseLayoutTheme.createBaseLayoutTheme();
const gridDefaults = {
  md: true,
  outline: true,
  transparent: true,
  noBorder: true,
  noShadow: true,
  noRing: true,
};

export const defaultGrid3Theme: SimpleComponentTheme = new SimpleComponentTheme(
  "grid grid-cols-1 md:grid-cols-3",
  gridSize,
  gridTypography,
  gridLayout,
  gridDefaults,
);


export const defaultGrid4Theme: SimpleComponentTheme = new SimpleComponentTheme(
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  gridSize,
  gridTypography,
  gridLayout,
  gridDefaults,
);