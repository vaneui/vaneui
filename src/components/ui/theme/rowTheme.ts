import { DirectionTheme } from "./layout/directionTheme";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { RowProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";

export const defaultRowTheme = new ComponentTheme<RowProps>(
  "div",
  "flex flex-row",
  {
    size: {
      px: new SizeTheme(),
      py: new SizeTheme(),
      text: new SizeTheme(),
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
    itemsCenter: true,
    flexWrap: true,
  }
);
