import { DirectionTheme } from "./layout/directionTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutsThemes, DefaultLayoutThemes } from "./common/ComponentTheme";
import type { ColProps } from "../col";
import { themeDefaults } from "./defaults";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { SimpleConsumerTheme } from "./appearance/simpleConsumerTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { COL_CATEGORIES } from "../props";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass, ringConsumerClass } from "../classes/appearanceClasses";

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
    background: SimpleConsumerTheme;
    text: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
    shadow: ShadowAppearanceTheme;
  }
}

export const defaultColTheme = new ComponentTheme<ColProps, ColTheme>(
  "div",
  "vane-col",
  {
    size: {
      gap: new GapTheme(),
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
      background: new SimpleConsumerTheme({ base: bgConsumerClasses.base }, 'bg'),
      text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
      border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerTheme({ base: ringConsumerClass }, 'ring'),
      shadow: ShadowAppearanceTheme.createLayoutTheme(),
    }
  },
  themeDefaults.col as Partial<ColProps>,
  COL_CATEGORIES,
);
