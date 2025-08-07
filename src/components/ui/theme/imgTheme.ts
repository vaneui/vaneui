import {
  BaseComponentTheme,
  ComponentTheme,
  defaultLayoutTheme,
  DefaultLayoutThemes
} from "./common/ComponentTheme";
import { ImgProps } from "../props";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { borderAppearanceClasses, ringAppearanceClasses } from "../classes/appearanceClasses";
import { IMG_CATEGORIES } from "../props";

export interface ImgTheme extends BaseComponentTheme {
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
  appearance: {
    border: GenericVariantTheme<AppearanceTheme>;
    ring: GenericVariantTheme<AppearanceTheme>;
    shadow: GenericVariantTheme<ShadowAppearanceTheme>;
  };
}

export const defaultImgTheme = new ComponentTheme<ImgProps, ImgTheme>(
  "img",
  "object-cover", // Default to cover for better image display
  {
    layout: {
      ...defaultLayoutTheme,
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: RadiusTheme.createLayoutTheme(),
    },
    appearance: {
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      shadow: GenericVariantTheme.createUIElementShadowTheme()
    }
  },
  {
    rounded: true,
    noShadow: true,
    noBorder: true,
    noRing: true,
  },
  IMG_CATEGORIES
);