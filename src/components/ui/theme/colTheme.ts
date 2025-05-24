import { DirectionTheme } from "./layout/directionTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { ColProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";

export const defaultColTheme = new ComponentTheme<ColProps>(
  "div",
  "flex flex-col",
  {
    size: {
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
    appearance: SimpleAppearanceTheme.createDefaultStyle(),
  },
  {
    md: true,
    transparent: true,
  }
);
