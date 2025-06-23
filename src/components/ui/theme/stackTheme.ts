import { DirectionTheme } from "./layout/directionTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BaseComponentTheme, ComponentTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { StackProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { commonGaps } from "../classes/spacingClasses";

export interface StackTheme<P> extends BaseComponentTheme<P> {
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

export const defaultStackTheme = new ComponentTheme<StackProps, StackTheme<StackProps>>(
  "div",
  "flex",
  {
    size: {
      px: new PxTheme({
        padding: {
          xs: 'px-2',
          sm: 'px-3',
          md: 'px-4',
          lg: 'px-5',
          xl: 'px-6',
        }
      }),
      py: new PyTheme({
        padding: {
          xs: 'py-2',
          sm: 'py-3',
          md: 'py-4',
          lg: 'py-5',
          xl: 'py-6',
        }
      }),
      gap: new GapTheme({
        gap: commonGaps
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
    column: true,
    flexWrap: true,
    gap: true,
    padding: true,
  }
);
