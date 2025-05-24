import { TypographyTheme } from "./typography/typographyTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { GapTheme } from "./size/gapTheme";
import { ItemsTheme } from "./layout/itemsTheme";
import { JustifyTheme } from "./layout/justifyTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BorderTheme } from "./layout/borderTheme";
import { ShadowTheme } from "./layout/shadowTheme";
import { RingTheme } from "./layout/ringTheme";
import { HideTheme } from "./layout/hideTheme";
import { PositionTheme } from "./layout/positionTheme";
import { LayoutComponentProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";

export const defaultSectionTheme = new ComponentTheme<LayoutComponentProps>(
  "div",
  "w-full flex flex-col",
  {
    size: {
      px: new SizeTheme({
        xs: 'px-5 max-lg:px-4 max-md:px-3',
        sm: 'px-6 max-lg:px-5 max-md:px-4',
        md: 'px-7 max-lg:px-6 max-md:px-5',
        lg: 'px-8 max-lg:px-7 max-md:px-6',
        xl: 'px-9 max-lg:px-8 max-md:px-7',
      }),
      py: new SizeTheme({
        xs: 'py-3',
        sm: 'py-5',
        md: 'py-8 max-md:py-5',
        lg: 'py-16 max-lg:py-14 max-md:py-12',
        xl: 'py-20 max-lg:py-16 max-md:py-12',
      }),
      gap: new GapTheme({
        xs: 'gap-2',
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-12',
        xl: 'gap-16',
      }),
    },
    typography: TypographyTheme.createDefaultTypographyTheme(),
    direction: new DirectionTheme(),
    items: new ItemsTheme(),
    justify: new JustifyTheme(),
    wrap: new WrapTheme(),
    border: new BorderTheme(),
    shadow: new ShadowTheme(),
    ring: new RingTheme(),
    hide: new HideTheme(),
    position: new PositionTheme(),
  },
  {
    md: true,
    default: true,
    itemsStart: true,
  }
);
