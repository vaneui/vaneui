import {
  BaseComponentTheme,
  ComponentTheme,
  defaultLayoutsThemes,
  DefaultLayoutThemes
} from "./common/ComponentTheme";
import type { ImgProps } from "../img";
import { themeDefaults } from "./defaults";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { SimpleConsumerTheme } from "./appearance/simpleConsumerTheme";
import { FocusVisibleTheme } from "./layout/focusVisibleTheme";
import { IMG_CATEGORIES } from "../props";
import { bgConsumerClasses, borderConsumerClass, ringConsumerClass, focusVisibleConsumerClass } from "../classes/appearanceClasses";

export interface ImgTheme extends BaseComponentTheme {
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    ring: RingTheme;
    focusVisible: FocusVisibleTheme;
    radius: RadiusTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
    border: SimpleConsumerTheme;
    ring: SimpleConsumerTheme;
    focusVisible: SimpleConsumerTheme;
    shadow: ShadowAppearanceTheme;
  };
}

export const defaultImgTheme = new ComponentTheme<ImgProps, ImgTheme>(
  "img",
  "vane-img object-cover", // Default to cover for better image display
  {
    layout: {
      ...defaultLayoutsThemes,
      border: new BorderTheme(),
      ring: new RingTheme(),
      focusVisible: new FocusVisibleTheme(),
      radius: new RadiusTheme(),
    },
    appearance: {
      background: new SimpleConsumerTheme({ base: bgConsumerClasses.base }, 'bg'),
      border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerTheme({ base: ringConsumerClass }, 'ring'),
      focusVisible: new SimpleConsumerTheme({ base: focusVisibleConsumerClass }, 'focusVisible'),
      shadow: ShadowAppearanceTheme.createLayoutTheme()
    }
  },
  themeDefaults.img,
  IMG_CATEGORIES
);