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
      px: new PxTheme(),
      py: new PyTheme(),
      gap: new GapTheme({
        xs: "[--gap-unit:1]",
        sm: "[--gap-unit:1.5]",
        md: "[--gap-unit:2]",
        lg: "[--gap-unit:2.5]",
        xl: "[--gap-unit:3]",
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
