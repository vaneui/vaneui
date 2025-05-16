import { SizeTheme } from "./size/sizeTheme";
import { TypographyTheme } from "./typography/typographyTheme";
import { DirectionLayoutTheme } from "./layout/directionLayoutTheme";
import { SimpleComponentTheme } from "./common/simpleComponentTheme";

export const defaultRowTheme: SimpleComponentTheme = new SimpleComponentTheme(
  "flex flex-row",
  new SizeTheme(
    undefined,
    undefined,
    undefined,
    {
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-5',
      xl: 'gap-6',
    }
  ),
  TypographyTheme.createDefaultTypographyTheme(),
  DirectionLayoutTheme.createDirectionTheme(),
  {
    md: true,
    outline: true,
    transparent: true,
    itemsCenter: true,
    flexWrap: true,
    noBorder: true,
    noShadow: true,
    noRing: true,
  }
);
