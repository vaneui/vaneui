import { DirectionTheme } from "./layout/directionTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { ContainerProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { SizeTheme } from "./size/sizeTheme";
import { WrapTheme } from "./layout/wrapTheme";

export const defaultContainerTheme = new ComponentTheme<ContainerProps>(
  "div",
  "flex flex-col mx-auto w-full",
  {
    size: {
      gap: new GapTheme({
        xs: 'gap-2 max-lg:gap-1',
        sm: 'gap-4 max-lg:gap-3 max-md:gap-2',
        md: 'gap-6 max-lg:gap-5 max-md:gap-4',
        lg: 'gap-8 max-lg:gap-7 max-md:gap-6',
        xl: 'gap-10 max-lg:gap-9 max-md:gap-8',
      }),
      maxWidth: new SizeTheme({
        xs: 'max-w-3xl',
        sm: 'max-w-4xl',
        md: 'max-w-5xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
      }),
    },
    layout: {
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
    },
  },
  {
    md: true,
    transparent: true,
    itemsStart: true,
  }
);
