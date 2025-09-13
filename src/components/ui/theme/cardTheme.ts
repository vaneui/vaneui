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
        xs: "px-4",
        sm: "px-5 max-lg:px-4",
        md: "px-6 max-lg:px-5",
        lg: "px-7 max-lg:px-6 max-md:px-5",
        xl: "px-8 max-lg:px-7 max-md:px-6"
      }),
      py: new PyTheme({
        xs: "py-4",
        sm: "py-5 max-lg:py-4",
        md: "py-6 max-lg:py-5",
        lg: "py-7 max-lg:py-6 max-md:py-5",
        xl: "py-8 max-lg:py-7 max-md:py-6"
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
);
