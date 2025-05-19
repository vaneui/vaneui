import { SizeTheme } from "./size/sizeTheme";
import { TypographyTheme } from "./typography/typographyTheme";
import { SimpleComponentTheme } from "./common/simpleComponentTheme";
import { DirectionLayoutTheme } from "./layout/directionLayoutTheme";
import { LayoutComponentProps } from "../props/props";

export const defaultSectionTheme: SimpleComponentTheme<LayoutComponentProps> = SimpleComponentTheme.createSimpleComponentTheme<LayoutComponentProps>(
  "div",
  "w-full flex flex-col",
  new SizeTheme(
    {
      xs: 'px-5 max-lg:px-4 max-md:px-3',
      sm: 'px-6 max-lg:px-5 max-md:px-4',
      md: 'px-7 max-lg:px-6 max-md:px-5',
      lg: 'px-8 max-lg:px-7 max-md:px-6',
      xl: 'px-9 max-lg:px-8 max-md:px-7',
    },
    {
      xs: 'py-3',
      sm: 'py-5',
      md: 'py-8 max-md:py-5',
      lg: 'py-16 max-lg:py-14 max-md:py-12',
      xl: 'py-20 max-lg:py-16 max-md:py-12',
    },
    undefined,
    {
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-12',
      xl: 'gap-16',
    }
  ),
  TypographyTheme.createDefaultTypographyTheme(),
  DirectionLayoutTheme.createDirectionTheme(),
  {
    md: true,
    default: true,
    itemsStart: true,
  }
);
