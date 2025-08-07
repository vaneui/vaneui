import { DirectionTheme } from "./layout/directionTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { ContainerProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { SizeTheme } from "./size/sizeTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import {
  borderAppearanceClasses,
  layoutBackgroundAppearanceClasses,
  ringAppearanceClasses
} from "../classes/appearanceClasses";
import { textAppearanceClasses } from "../classes/typographyClasses";
import { RadiusTheme } from "./layout/radiusTheme";
import { CONTAINER_CATEGORIES } from "../props";

export interface ContainerTheme extends BaseComponentTheme {
  size: {
    gap: GapTheme;
    maxWidth: SizeTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    direction: DirectionTheme;
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
  appearance: {
    background: AppearanceTheme;
    text: AppearanceTheme;
    border: AppearanceTheme;
    ring: AppearanceTheme;
  }
}

export const defaultContainerTheme = new ComponentTheme<ContainerProps, ContainerTheme>(
  "div",
  "flex-col mx-auto w-full",
  {
    size: {
      gap: new GapTheme({
        xs: 'gap-2 max-lg:gap-1',
        sm: 'gap-4 max-lg:gap-3 max-md:gap-2',
        md: 'gap-6 max-lg:gap-5 max-md:gap-4',
        lg: 'gap-8 max-lg:gap-7 max-md:gap-6',
        xl: 'gap-10 max-lg:gap-9 max-md:gap-8',
      }),
      maxWidth: new SizeTheme({xs: 'max-w-3xl', sm: 'max-w-4xl', md: 'max-w-5xl', lg: 'max-w-6xl', xl: 'max-w-7xl'}),
    },
    layout: {
      ...defaultLayoutTheme,
      border: new BorderTheme(),
      ring: new RingTheme(),
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
      radius: RadiusTheme.createLayoutTheme(),
    },
    appearance: {
      background: AppearanceTheme.createLayoutBgTheme(),
      text: AppearanceTheme.createTheme({base: textAppearanceClasses}),
      border: AppearanceTheme.createTheme({base: borderAppearanceClasses}),
      ring: AppearanceTheme.createTheme({base: ringAppearanceClasses}),
    }
  },
  {
    noRing: true,
    flex: true,
    md: true,
    itemsCenter: true,
    gap: true,
    sharp: true,
  },
  CONTAINER_CATEGORIES,
  (props: ContainerProps, defaults: Partial<ContainerProps>) => {
    return props.href ? "a" : "div";
  }
);
