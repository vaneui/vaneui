import { DirectionTheme } from "./layout/directionTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { ColProps } from "../props";
import { themeDefaults } from "./defaults";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { textAppearanceClasses } from "../classes/typographyClasses";
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
    background: AppearanceTheme;
    text: AppearanceTheme;
    border: GenericVariantTheme<AppearanceTheme>;
    ring: GenericVariantTheme<AppearanceTheme>;
    shadow: GenericVariantTheme<ShadowAppearanceTheme>;
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
  themeDefaults.col as Partial<ColProps>,
  COL_CATEGORIES,
  (props: ColProps, defaults: Partial<ColProps>) => {
    return props.href ? "a" : "div";
  }
);
