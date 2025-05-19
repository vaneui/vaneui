import { SizeTheme } from "./size/sizeTheme";
import { TypographyTheme } from "./typography/typographyTheme";
import { SimpleComponentTheme } from "./common/simpleComponentTheme";
import { DirectionLayoutTheme } from "./layout/directionLayoutTheme";
import { ColProps } from "../props/props";

export const defaultColTheme: SimpleComponentTheme<ColProps> = new SimpleComponentTheme<ColProps>(
  "flex flex-col",
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
    transparent: true,
  }
);
