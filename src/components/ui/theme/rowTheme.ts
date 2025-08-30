import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { RowProps } from "../props";
import { themeDefaults } from "./defaults";
import { BreakpointTheme } from "./size/breakpointTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { textAppearanceClasses } from "../classes/typographyClasses";
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
    background: AppearanceTheme;
    text: AppearanceTheme;
    border: GenericVariantTheme<AppearanceTheme>;
    ring: GenericVariantTheme<AppearanceTheme>;
    shadow: GenericVariantTheme<ShadowAppearanceTheme>;
  }
}

export const defaultRowTheme = new ComponentTheme<RowProps, RowTheme>(
  "div",
  "",
  {
    size: {
      gap: new GapTheme(),
      breakpoint: new BreakpointTheme(),
    },
    layout: {
      ...defaultLayoutTheme,
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: RadiusTheme.createLayoutTheme(),
    },
    appearance: {
      background: AppearanceTheme.createLayoutBgTheme(),
      text: AppearanceTheme.createTheme({base: textAppearanceClasses}),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      shadow: GenericVariantTheme.createLayoutShadowTheme(),
    }
  },
  themeDefaults.row as Partial<RowProps>,
  ROW_CATEGORIES,
  (props: RowProps, defaults: Partial<RowProps>) => {
    // Determine tag based on href prop
    return props.href ? "a" : "div";
  }
);
