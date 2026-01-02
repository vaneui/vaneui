import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutsThemes, DefaultLayoutThemes } from "./common/ComponentTheme";
import type { RowProps } from "../row";
import { themeDefaults } from "./defaults";
import { BreakpointTheme } from "./size/breakpointTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { ROW_CATEGORIES } from "../props";

export interface RowTheme extends BaseComponentTheme {
  size: {
    gap: GapTheme;
    breakpoint: BreakpointTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    direction: DirectionTheme;
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
  appearance: {
    background: GenericVariantTheme<AppearanceTheme>;
    text: GenericVariantTheme<AppearanceTheme>;
    border: GenericVariantTheme<AppearanceTheme>;
    ring: GenericVariantTheme<AppearanceTheme>;
    shadow: GenericVariantTheme<ShadowAppearanceTheme>;
  }
}

export const defaultRowTheme = new ComponentTheme<RowProps, RowTheme>(
  "div",
  "vane-row",
  {
    size: {
      gap: new GapTheme(),
      breakpoint: new BreakpointTheme(),
    },
    layout: {
      ...defaultLayoutsThemes,
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: new RadiusTheme(),
    },
    appearance: {
      background: GenericVariantTheme.createLayoutBgAppearanceTheme(),
      text: GenericVariantTheme.createUIElementTextThemeIgnoreTransparent(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      shadow: GenericVariantTheme.createLayoutShadowTheme(),
    }
  },
  themeDefaults.row as Partial<RowProps>,
  ROW_CATEGORIES
);
