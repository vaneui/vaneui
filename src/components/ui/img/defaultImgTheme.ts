import {
  ComponentTheme,
  defaultLayoutsThemes,
} from "../theme/common/ComponentTheme";
import type { ImgProps } from "./ImgProps";
import { BorderTheme } from "../theme/layout/borderTheme";
import { RingTheme } from "../theme/layout/ringTheme";
import { FocusVisibleTheme } from "../theme/layout/focusVisibleTheme";
import { RadiusTheme } from "../theme/layout/radiusTheme";
import { ObjectFitTheme } from "../theme/layout/objectFitTheme";
import { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import { bgConsumerClasses, borderConsumerClass, ringConsumerClass, focusVisibleConsumerClass } from "../classes/appearanceClasses";
import type { ImgTheme } from "./ImgTheme";
import { imgDefaults } from "./imgDefaults";
import { IMG_CATEGORIES } from "./ImgCategories";

export const defaultImgTheme = new ComponentTheme<ImgProps, ImgTheme>(
  "img",
  "vane-img",
  {
    layout: {
      ...defaultLayoutsThemes,
      border: new BorderTheme(),
      ring: new RingTheme(),
      focusVisible: new FocusVisibleTheme(),
      radius: new RadiusTheme(),
      objectFit: new ObjectFitTheme(),
    },
    appearance: {
      background: new SimpleConsumerTheme({ base: bgConsumerClasses.base }, 'bg'),
      border: new SimpleConsumerTheme({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerTheme({ base: ringConsumerClass }, 'ring'),
      focusVisible: new SimpleConsumerTheme({ base: focusVisibleConsumerClass }, 'focusVisible'),
      shadow: ShadowAppearanceTheme.createLayoutTheme()
    }
  },
  imgDefaults,
  IMG_CATEGORIES,
  undefined,
  'layout'
);
