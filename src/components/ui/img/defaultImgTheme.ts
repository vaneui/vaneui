import {
  ComponentTheme,
  defaultSizedLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { ImgProps } from "./ImgProps";
import { BorderClassMapper } from "../theme/layout/borderClassMapper";
import { RingClassMapper } from "../theme/layout/ringClassMapper";
import { FocusVisibleClassMapper } from "../theme/layout/focusVisibleClassMapper";
import { RadiusClassMapper } from "../theme/layout/radiusClassMapper";
import { ObjectFitClassMapper } from "../theme/layout/objectFitClassMapper";
import { bgAppearance, borderAppearance, ringAppearance, focusVisibleAppearance, shadowLayoutAppearance } from "../theme/common/appearanceClassMappers";
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
      shadow: shadowLayoutAppearance,
    }
  },
  imgDefaults,
  IMG_CATEGORIES,
  undefined,
  'layout'
);
