import { SizeTheme } from "./size/sizeTheme";
import { TypographyTheme } from "./typography/typographyTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { GapTheme } from "./layout/gapTheme";
import { ItemsTheme } from "./layout/itemsTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { RowProps } from "../props/props";

export const defaultRowTheme = new ComponentTheme<RowProps>(
  "div",
  "flex flex-row",
  {
    size: new SizeTheme(),
    typography: TypographyTheme.createDefaultTypographyTheme(),
    direction: new DirectionTheme(),
    gap: new GapTheme({
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-5',
      xl: 'gap-6',
    }),
    items: new ItemsTheme(),
    wrap: new WrapTheme(),
  },
  {
    md: true,
    transparent: true,
    itemsCenter: true,
    flexWrap: true,
  }
);
