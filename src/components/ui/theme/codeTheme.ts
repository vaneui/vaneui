import {
  BaseTypographyComponentTheme,
  ComponentTheme,
  defaultLayoutsThemes,
  DefaultLayoutThemes,
  defaultTypographyThemes
} from "./common/ComponentTheme";
import type { CodeProps } from "../code";
import { themeDefaults } from "./defaults";
import { FontSizeTheme } from "./size/fontSizeTheme";
import { LineHeightTheme } from "./size/lineHeightTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { SimpleConsumerTheme } from "./appearance/simpleConsumerTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { FocusVisibleTheme } from "./layout/focusVisibleTheme";
import { CODE_CATEGORIES } from "../props";
import { bgConsumerClasses, textConsumerClass, borderConsumerClass, ringConsumerClass, focusVisibleConsumerClass } from "../classes/appearanceClasses";

export interface CodeTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
    gap: GapTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
    text: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
    focusVisible: SimpleConsumerTheme;
    shadow: ShadowAppearanceTheme;
  };
  layout: DefaultLayoutThemes & {
    radius: RadiusTheme;
    border: BorderTheme;
    ring: RingTheme;
    focusVisible: FocusVisibleTheme;
    wrap: WrapTheme;
    flexDirection: DirectionTheme;
  };
}

export const defaultCodeTheme = new ComponentTheme<CodeProps, CodeTheme>(
  "code",
  "vane-code",
  {
    size: {
      px: new PxTheme(),
      py: new PyTheme(),
      text: new FontSizeTheme(),
      lineHeight: new LineHeightTheme(),
      gap: new GapTheme()
    },
    appearance: {
      background: new SimpleConsumerTheme({ base: bgConsumerClasses.base }, 'bg'),
      text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
      border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerTheme({ base: ringConsumerClass }, 'ring'),
      focusVisible: new SimpleConsumerTheme({ base: focusVisibleConsumerClass }, 'focusVisible'),
      shadow: ShadowAppearanceTheme.createLayoutTheme()
    },
    layout: {
      ...defaultLayoutsThemes,
      radius: new RadiusTheme(),
      border: new BorderTheme(),
      ring: new RingTheme(),
      focusVisible: new FocusVisibleTheme(),
      wrap: new WrapTheme(),
      flexDirection: new DirectionTheme(),
    },
    typography: defaultTypographyThemes,
  },
  themeDefaults.code,
  CODE_CATEGORIES
);