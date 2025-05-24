import { TypographyTheme } from "./typography/typographyTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { ColProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";

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
    typography: TypographyTheme.createDefaultTypographyTheme(),
    direction: new DirectionTheme(),
    appearance: SimpleAppearanceTheme.createDefaultStyle(),
  },
  {
    md: true,
    transparent: true,
  }
);
