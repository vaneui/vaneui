import { DirectionTheme } from "./layout/directionTheme";
import {
  BaseTypographyComponentTheme,
  ComponentTheme,
  defaultLayoutsThemes,
  DefaultLayoutThemes,
  defaultTypographyThemes
} from "./common/ComponentTheme";
import { CardProps } from "../props";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { BreakpointTheme } from "./size/breakpointTheme";
import { RingTheme } from "./layout/ringTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { CARD_CATEGORIES } from "../props";
import { themeDefaults } from "./defaults";

export interface CardTheme extends BaseTypographyComponentTheme {
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
    background: GenericVariantTheme<AppearanceTheme>;
    text: GenericVariantTheme<AppearanceTheme>;
    border: GenericVariantTheme<AppearanceTheme>;
    ring: GenericVariantTheme<AppearanceTheme>;
  };
}

export const defaultCardTheme = new ComponentTheme<CardProps, CardTheme>(
  "div",
  "",
  {
    size: {
      px: new PxTheme({
        xs: "px-3",
        sm: "px-4 max-lg:px-3",
        md: "px-5 max-lg:px-4",
        lg: "px-6 max-lg:px-5 max-md:px-4",
        xl: "px-7 max-lg:px-6 max-md:px-5"
      }),
      py: new PyTheme({
        xs: "py-3",
        sm: "py-4 max-lg:py-3",
        md: "py-5 max-lg:py-4",
        lg: "py-6 max-lg:py-5 max-md:py-4",
        xl: "py-7 max-lg:py-6 max-md:py-5"
      }),
      gap: new GapTheme({
        xs: "gap-2",
        sm: "gap-3 max-lg:gap-2",
        md: "gap-4 max-lg:gap-3",
        lg: "gap-5 max-lg:gap-4 max-md:gap-3",
        xl: "gap-6 max-lg:gap-5 max-md:gap-4"
      }),
    },
    layout: {
      ...defaultLayoutsThemes,
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: RadiusTheme.createLayoutTheme(),
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
      breakpoint: new BreakpointTheme(),
      shadow: ShadowAppearanceTheme.createLayoutTheme(),
    },
    appearance: {
      background: GenericVariantTheme.createLayoutBgAppearanceTheme(),
      text: GenericVariantTheme.createUIElementTextThemeIgnoreTransparent(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
    },
    typography: defaultTypographyThemes,
  },
  themeDefaults.card as Partial<CardProps>,
  CARD_CATEGORIES,
  (props: CardProps) => {
    return props.href ? "a" : "div";
  }
);
