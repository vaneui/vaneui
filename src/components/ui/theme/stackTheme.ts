import { DirectionTheme } from "./layout/directionTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { StackProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { SizeTheme } from "./size/sizeTheme";

export const defaultStackTheme = new ComponentTheme<StackProps>(
  "div",
  "flex",
  {
    size: {
      px: new SizeTheme({
        xs: 'px-2',
        sm: 'px-3',
        md: 'px-4',
        lg: 'px-5',
        xl: 'px-6',
      }),
      py: new SizeTheme({
        xs: 'py-2',
        sm: 'py-3',
        md: 'py-4',
        lg: 'py-5',
        xl: 'py-6',
      }),
      gap: new GapTheme({
        xs: 'gap-2',
        sm: 'gap-3',
        md: 'gap-4',
        lg: 'gap-5',
        xl: 'gap-6',
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
  }
);
