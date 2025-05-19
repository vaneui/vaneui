import { SizeTheme } from "./size/sizeTheme";
import { TypographyTheme } from "./typography/typographyTheme";
import { SimpleComponentTheme } from "./common/simpleComponentTheme";
import { DirectionLayoutTheme } from "./layout/directionLayoutTheme";
import { CardProps } from "../props/props";

export const defaultCardTheme: SimpleComponentTheme<CardProps> = new SimpleComponentTheme<CardProps>(
  "flex overflow-hidden",
  new SizeTheme(
    {
      xs: 'px-3',
      sm: 'px-4',
      md: 'px-5',
      lg: 'px-6',
      xl: 'px-8',
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
    default: true,
    sans: true,
    normal: true,
    column: true,
  }
);
