import { TypographyTheme } from "./typography/typographyTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { SimpleAppearanceTheme } from "./appearance/simpleAppearanceTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { LayoutComponentProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { SizeTheme } from "./size/sizeTheme";

export const defaultContainerTheme = new ComponentTheme<LayoutComponentProps>(
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
    typography: TypographyTheme.createDefaultTypographyTheme(),
    direction: new DirectionTheme(),
    appearance: SimpleAppearanceTheme.createDefaultStyle(),
  },
  {
    md: true,
    transparent: true,
    itemsStart: true,
  }
);
