import { TypographyTheme } from "./typography/typographyTheme";
import { SimpleComponentTheme } from "./common/simpleComponentTheme";
import { DirectionLayoutTheme } from "./layout/directionLayoutTheme";
import { MaxWidthSizeTheme } from "./size/maxWidthSizeTheme";
import { LayoutComponentProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";

export const defaultContainerTheme: SimpleComponentTheme<LayoutComponentProps> = SimpleComponentTheme.createSimpleComponentTheme<LayoutComponentProps>(
  "div",
  "flex flex-col mx-auto w-full",
  new MaxWidthSizeTheme(
    undefined,
    undefined,
    undefined,
    {
      xs: 'gap-2 max-lg:gap-1',
      sm: 'gap-4 max-lg:gap-3 max-md:gap-2',
      md: 'gap-6 max-lg:gap-5 max-md:gap-4',
      lg: 'gap-8 max-lg:gap-7 max-md:gap-6',
      xl: 'gap-10 max-lg:gap-9 max-md:gap-8',
    },
    {
      xs: 'max-w-3xl',
      sm: 'max-w-4xl',
      md: 'max-w-5xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
    }
  ),
  TypographyTheme.createDefaultTypographyTheme(),
  DirectionLayoutTheme.createDirectionTheme(),
  {
    md: true,
    transparent: true,
    itemsStart: true,
  }
);
