import { DirectionTheme } from "./layout/directionTheme";
import { BaseComponentTheme, ComponentTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { CardProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { ShadowTheme } from "./layout/shadowTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { commonGaps } from "../classes/spacingClasses";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import {
  borderAppearanceClasses,
  layoutBackgroundAppearanceClasses,
  ringAppearanceClasses
} from "../classes/appearanceClasses";
import { textAppearanceClasses } from "../classes/typographyClasses";
import { BgAppearanceTheme } from "./appearance/bgAppearanceTheme";
import { BreakpointTheme } from "./size/breakpointTheme";
import { RingTheme } from "./layout/ringTheme";

export interface CardTheme<P> extends BaseComponentTheme<P> {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
    shadow: ShadowTheme;
  };
  layout: DefaultLayoutThemes<P> & {
    border: BorderTheme;
    radius: RadiusTheme;
    ring: RingTheme;
    wrap: WrapTheme;
    direction: DirectionTheme;
    breakpoint: BreakpointTheme;
  };
  appearance: {
    background: BgAppearanceTheme;
    text: TextAppearanceTheme;
    border: TextAppearanceTheme;
    ring: TextAppearanceTheme;
  };
}

export const defaultCardTheme = new ComponentTheme<CardProps, CardTheme<CardProps>>(
  "div",
  "overflow-hidden",
  {
    size: {
      px: new PxTheme({
        padding: {
          xs: 'px-3',
          sm: 'px-4',
          md: 'px-5',
          lg: 'px-6',
          xl: 'px-8',
        }
      }),
      py: new PyTheme({
        padding: {
          xs: 'py-2',
          sm: 'py-3',
          md: 'py-4',
          lg: 'py-5',
          xl: 'py-6',
        }
      }),
      gap: new GapTheme({gap: commonGaps}),
      shadow: new ShadowTheme(),
    },
    layout: {
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: new RadiusTheme({
        rounded: {
          xs: "rounded-md",
          sm: "rounded-lg",
          md: "rounded-xl",
          lg: "rounded-2xl",
          xl: "rounded-3xl"
        }
      }),
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
      breakpoint: new BreakpointTheme(),
    },
    appearance: {
      background: new BgAppearanceTheme(),
      text: TextAppearanceTheme.createTheme({base: textAppearanceClasses}),
      border: TextAppearanceTheme.createTheme({base: borderAppearanceClasses}),
      ring: TextAppearanceTheme.createTheme({base: ringAppearanceClasses}),
    }
  },
  {
    md: true,
    flex: true,
    default: true,
    rounded: true,
    normal: true,
    column: true,
    border: true,
    gap: true,
    padding: true,
  }
);
