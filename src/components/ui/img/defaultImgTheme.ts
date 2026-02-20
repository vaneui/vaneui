import { ComponentTheme, defaultSizedLayoutClassMappers, bgAppearance, borderAppearance, ringAppearance, focusVisibleAppearance, shadowAppearance } from "../theme/common";
import type { ImgProps } from "./ImgProps";
import { BorderClassMapper, RingClassMapper, FocusVisibleClassMapper, RadiusClassMapper, ObjectFitClassMapper } from "../theme/layout";
import type { ImgTheme } from "./ImgTheme";
import { imgDefaults } from "./imgDefaults";
import { IMG_CATEGORIES } from "./ImgCategories";

export const defaultImgTheme = new ComponentTheme<ImgProps, ImgTheme>(
  "img",
  "vane-img",
  {
    layout: {
      ...defaultSizedLayoutClassMappers,
      border: new BorderClassMapper(),
      ring: new RingClassMapper(),
      focusVisible: new FocusVisibleClassMapper(),
      radius: new RadiusClassMapper(),
      objectFit: new ObjectFitClassMapper(),
    },
    appearance: {
      background: bgAppearance,
      border: borderAppearance,
      ring: ringAppearance,
      focusVisible: focusVisibleAppearance,
      shadow: shadowAppearance,
    }
  },
  imgDefaults,
  IMG_CATEGORIES,
  undefined,
  'layout'
);
