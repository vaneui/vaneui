import { TypographyTheme } from "./typography/typographyTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { CardProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";

export const defaultCardTheme = new ComponentTheme<CardProps>(
  "div",
  "flex overflow-hidden",
  {
    size: {
      px: new SizeTheme({
        xs: 'px-3',
        sm: 'px-4',
        md: 'px-5',
        lg: 'px-6',
        xl: 'px-8',
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
    appearance: SimpleAppearanceTheme.createDefaultStyle(),
  },
  {
    md: true,
    default: true,
    sans: true,
    normal: true,
    column: true,
  }
);
