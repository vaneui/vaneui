import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutsThemes, DefaultLayoutThemes } from "./common/ComponentTheme";
import type { RowProps } from "../row";
import { themeDefaults } from "./defaults";
import { BreakpointTheme } from "./size/breakpointTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { SimpleConsumerTheme } from "./appearance/simpleConsumerTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { TextAlignTheme } from "./typography/textAlignTheme";
import { ROW_CATEGORIES } from "../props";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass, ringConsumerClass } from "../classes/appearanceClasses";

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
    background: SimpleConsumerTheme;
    text: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
    shadow: ShadowAppearanceTheme;
  };
  typography: {
    textAlign: TextAlignTheme;
  };
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
      background: new SimpleConsumerTheme({ base: bgConsumerClasses.base }, 'bg'),
      text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
      border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerTheme({ base: ringConsumerClass }, 'ring'),
      shadow: ShadowAppearanceTheme.createLayoutTheme(),
    },
    typography: {
      textAlign: new TextAlignTheme(),
    },
  },
  themeDefaults.row as Partial<RowProps>,
  ROW_CATEGORIES,
  undefined,
  'layout'
);
