import { DirectionTheme } from "./layout/directionTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { ContainerProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { SizeTheme } from "./size/sizeTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { BgAppearanceTheme } from "./appearance/bgAppearanceTheme";
import {
  borderAppearanceClasses,
  layoutBackgroundAppearanceClasses,
  ringAppearanceClasses
} from "../classes/appearanceClasses";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import { textAppearanceClasses } from "../classes/typographyClasses";
import { RadiusTheme } from "./layout/radiusTheme";
import { extractContainerKeys } from "../../utils/componentUtils";

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
    background: BgAppearanceTheme;
    text: TextAppearanceTheme;
    border: TextAppearanceTheme;
    ring: TextAppearanceTheme;
  }
}

export const defaultContainerTheme = new ComponentTheme<ContainerProps, ContainerTheme>(
  "div",
  "flex-col mx-auto w-full",
  {
    size: {
      gap: new GapTheme({
        gap: {
          xs: 'gap-2 max-lg:gap-1',
          sm: 'gap-4 max-lg:gap-3 max-md:gap-2',
          md: 'gap-6 max-lg:gap-5 max-md:gap-4',
          lg: 'gap-8 max-lg:gap-7 max-md:gap-6',
          xl: 'gap-10 max-lg:gap-9 max-md:gap-8',
        }
      }),
      maxWidth: new SizeTheme({
        xs: 'max-w-3xl',
        sm: 'max-w-4xl',
        md: 'max-w-5xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
      }),
    },
    layout: {
      ...defaultLayoutTheme,
      border: new BorderTheme(),
      ring: new RingTheme(),
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
      radius: new RadiusTheme({
        rounded: {
          xs: "rounded-md",
          sm: "rounded-lg",
          md: "rounded-xl",
          lg: "rounded-2xl",
          xl: "rounded-3xl"
        }
      }),
    },
    appearance: {
      background: new BgAppearanceTheme(),
      text: TextAppearanceTheme.createTheme({base: textAppearanceClasses}),
      border: TextAppearanceTheme.createTheme({base: borderAppearanceClasses}),
      ring: TextAppearanceTheme.createTheme({base: ringAppearanceClasses}),
    }
  },
  {
    transparent: true,
    noRing: true,
    flex: true,
    md: true,
    itemsCenter: true,
    gap: true,
    sharp: true,
  },
  extractContainerKeys
);
