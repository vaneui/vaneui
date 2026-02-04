import {
  ComponentTheme,
  defaultLayoutsThemes,
} from "../theme/common/ComponentTheme";
import type { ImgProps } from "./ImgProps";
import { BorderClassMapper } from "../theme/layout/borderClassMapper";
import { RingClassMapper } from "../theme/layout/ringClassMapper";
import { FocusVisibleClassMapper } from "../theme/layout/focusVisibleClassMapper";
import { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import { ObjectFitClassMapper } from "../theme/layout/objectFitClassMapper";
import { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
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
      border: new BorderClassMapper(),
      ring: new RingClassMapper(),
      focusVisible: new FocusVisibleClassMapper(),
      radius: new RadiusClassMapper(),
      objectFit: new ObjectFitClassMapper(),
    },
    appearance: {
      background: new SimpleConsumerClassMapper({ base: bgConsumerClasses.base }, 'bg'),
      border: new SimpleConsumerClassMapper({ base: borderConsumerClass }, 'border'),
      ring: new SimpleConsumerClassMapper({ base: ringConsumerClass }, 'ring'),
      focusVisible: new SimpleConsumerClassMapper({ base: focusVisibleConsumerClass }, 'focusVisible'),
      shadow: ShadowAppearanceClassMapper.createLayoutTheme()
    }
  },
  imgDefaults,
  IMG_CATEGORIES,
  undefined,
  'layout'
);
