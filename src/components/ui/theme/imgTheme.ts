import {
  BaseComponentTheme,
  ComponentTheme,
  defaultLayoutsThemes,
  DefaultLayoutThemes
} from "./common/ComponentTheme";
import { ImgProps } from "../props";
import { themeDefaults } from "./defaults";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { IMG_CATEGORIES } from "../props";

export interface ImgTheme extends BaseComponentTheme {
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
  appearance: {
    background: GenericVariantTheme<AppearanceTheme>;
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
      ...defaultLayoutsThemes,
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: RadiusTheme.createLayoutTheme(),
    },
    appearance: {
      background: GenericVariantTheme.createSimpleUIElementBgAppearanceTheme(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      shadow: GenericVariantTheme.createLayoutShadowTheme()
    }
  },
  themeDefaults.img,
  IMG_CATEGORIES
);