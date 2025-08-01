import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { RowProps } from "../props/props";
import { BreakpointTheme } from "./size/breakpointTheme";
import { BgAppearanceTheme } from "./appearance/bgAppearanceTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
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
    background: BgAppearanceTheme;
    border: GenericVariantTheme<TextAppearanceTheme>;
    ring: GenericVariantTheme<TextAppearanceTheme>;
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
      radius: new RadiusTheme(),
    },
    appearance: {
      background: new BgAppearanceTheme(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
    }
  },
  {
    row: true,
    md: true,
    flex: true,
    itemsCenter: true,
    gap: true,
    noBorder: true,
    noRing: true,
    sharp: true,
  },
  ROW_CATEGORIES
);
