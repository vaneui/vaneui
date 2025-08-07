import { DirectionTheme } from "./layout/directionTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { CardProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import {
  borderAppearanceClasses,
  ringAppearanceClasses
} from "../classes/appearanceClasses";
import { textAppearanceClasses } from "../classes/typographyClasses";
import { BreakpointTheme } from "./size/breakpointTheme";
import { RingTheme } from "./layout/ringTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { CARD_CATEGORIES } from "../props";

export interface CardTheme extends BaseComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
  };
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    radius: RadiusTheme;
    ring: RingTheme;
    wrap: WrapTheme;
    direction: DirectionTheme;
    breakpoint: BreakpointTheme;
    shadow: ShadowAppearanceTheme;
  };
  appearance: {
    background: AppearanceTheme;
    text: AppearanceTheme;
    border: AppearanceTheme;
    ring: AppearanceTheme;
  };
}

export const defaultCardTheme = new ComponentTheme<CardProps, CardTheme>(
  "div",
  "",
  {
    size: {
      px: new PxTheme({
        xs: "px-2",
        sm: "px-3 max-lg:px-2",
        md: "px-4 max-lg:px-3",
        lg: "px-5 max-lg:px-4 max-md:px-3",
        xl: "px-6 max-lg:px-5 max-md:px-4"
      }),
      py: new PyTheme({
        xs: "py-2",
        sm: "py-3 max-lg:py-2",
        md: "py-4 max-lg:py-3",
        lg: "py-5 max-lg:py-4 max-md:py-3",
        xl: "py-6 max-lg:py-5 max-md:py-4"
      }),
      gap: new GapTheme(),
    },
    layout: {
      ...defaultLayoutTheme,
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: RadiusTheme.createLayoutTheme(),
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
      breakpoint: new BreakpointTheme(),
      shadow: ShadowAppearanceTheme.createTheme(),
    },
    appearance: {
      background: AppearanceTheme.createLayoutBgTheme(),
      text: AppearanceTheme.createTheme({base: textAppearanceClasses}),
      border: AppearanceTheme.createTheme({base: borderAppearanceClasses}),
      ring: AppearanceTheme.createTheme({base: ringAppearanceClasses}),
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
  },
  CARD_CATEGORIES,
  (props: CardProps, defaults: Partial<CardProps>) => {
    return props.href ? "a" : "div";
  }
);
