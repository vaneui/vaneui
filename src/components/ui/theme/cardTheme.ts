import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { GapSizeTheme } from "./size/gapSizeTheme";
import { TypographyTheme } from "./typography/typographyTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { CardProps } from "../props/props";

export const defaultCardTheme = new ComponentTheme<CardProps>(
  "div",
  "flex overflow-hidden",
  {
    size: {
      px: new PxTheme({
        xs: 'px-3',
        sm: 'px-4',
        md: 'px-5',
        lg: 'px-6',
        xl: 'px-8',
      }),
      py: new PyTheme({
        xs: 'py-2',
        sm: 'py-3',
        md: 'py-4',
        lg: 'py-5',
        xl: 'py-6',
      }),
      gap: new GapSizeTheme({
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
    default: true,
    sans: true,
    normal: true,
    column: true,
  }
);
