import { BaseComponentTheme, ComponentTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { SectionProps } from "../props/props";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";

export interface SectionTheme<P> extends BaseComponentTheme<P> {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
  };
  layout: DefaultLayoutThemes<P> & {
    wrap: WrapTheme;
    direction: DirectionTheme;
  };
}

export const defaultSectionTheme = new ComponentTheme<SectionProps, SectionTheme<SectionProps>>(
  "div",
  "w-full flex flex-col",
  {
    size: {
      px: new PxTheme({
        padding: {
          xs: 'px-5 max-lg:px-4 max-md:px-3',
          sm: 'px-6 max-lg:px-5 max-md:px-4',
          md: 'px-7 max-lg:px-6 max-md:px-5',
          lg: 'px-8 max-lg:px-7 max-md:px-6',
          xl: 'px-9 max-lg:px-8 max-md:px-7',
        }
      }),
      py: new PyTheme({
        padding: {
          xs: 'py-3',
          sm: 'py-5',
          md: 'py-8 max-md:py-5',
          lg: 'py-16 max-lg:py-14 max-md:py-12',
          xl: 'py-20 max-lg:py-16 max-md:py-12',
        }
      }),
      gap: new GapTheme({
        gap: {
          xs: 'gap-2',
          sm: 'gap-4',
          md: 'gap-6',
          lg: 'gap-12',
          xl: 'gap-16',
        }
      }),
    },
    layout: {
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
    },
  },
  {
    md: true,
    default: true,
    itemsStart: true,
    gap: true,
    padding: true,
  }
);
