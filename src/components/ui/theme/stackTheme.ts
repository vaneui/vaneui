import { SizeTheme } from "./size/sizeTheme";
import { TypographyTheme } from "./typography/typographyTheme";
import { SimpleComponentTheme } from "./common/simpleComponentTheme";
import { DirectionLayoutTheme } from "./layout/directionLayoutTheme";

export const defaultStackTheme: SimpleComponentTheme = new SimpleComponentTheme(
  "flex",
  new SizeTheme(
    {
      xs: 'px-2',
      sm: 'px-3',
      md: 'px-4',
      lg: 'px-5',
      xl: 'px-6',
    },
    {
      xs: 'py-2',
      sm: 'py-3',
      md: 'py-4',
      lg: 'py-5',
      xl: 'py-6',
    },
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
    transparent: true,
    column: true,
    flexWrap: true,
    noBorder: true,
    noShadow: true,
    noRing: true,
  }
);