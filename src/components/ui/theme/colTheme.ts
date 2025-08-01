import { DirectionTheme } from "./layout/directionTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { ColProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BgAppearanceTheme } from "./appearance/bgAppearanceTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import { COL_CATEGORIES } from "../props";

export interface ColTheme extends BaseComponentTheme {
  size: {
    gap: GapTheme;
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

export const defaultColTheme = new ComponentTheme<ColProps, ColTheme>(
  "div",
  "",
  {
    size: {
      gap: new GapTheme(),
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
    column: true,
    md: true,
    flex: true,
    gap: true,
    noBorder: true,
    noRing: true,
    sharp: true,
  },
  COL_CATEGORIES
);
