import { DirectionTheme } from "./layout/directionTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutsThemes, DefaultLayoutThemes } from "./common/ComponentTheme";
import type { StackProps } from "../stack";
import { themeDefaults } from "./defaults";
import { GapTheme } from "./size/gapTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { BreakpointTheme } from "./size/breakpointTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { STACK_CATEGORIES } from "../props";

export interface StackTheme extends BaseComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
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

export const defaultStackTheme = new ComponentTheme<StackProps, StackTheme>(
  "div",
  "vane-stack",
  {
    size: {
      px: new PxTheme(),
      py: new PyTheme(),
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
  themeDefaults.stack as Partial<StackProps>,
  STACK_CATEGORIES,
);
