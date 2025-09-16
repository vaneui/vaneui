import { DirectionTheme } from "./layout/directionTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutsThemes, DefaultLayoutThemes } from "./common/ComponentTheme";
import { ContainerProps } from "../props";
import { themeDefaults } from "./defaults";
import { GapTheme } from "./size/gapTheme";
import { SizeTheme } from "./size/sizeTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { CONTAINER_CATEGORIES } from "../props";

export interface ContainerTheme extends BaseComponentTheme {
  size: {
    gap: GapTheme;
    maxWidth: SizeTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    direction: DirectionTheme;
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
  appearance: {
    background: GenericVariantTheme<AppearanceTheme>;
    text: GenericVariantTheme<AppearanceTheme>;
    border: GenericVariantTheme<AppearanceTheme>;
    ring: GenericVariantTheme<AppearanceTheme>;
    shadow: GenericVariantTheme<ShadowAppearanceTheme>;
  }
}

export const defaultContainerTheme = new ComponentTheme<ContainerProps, ContainerTheme>(
  "div",
  "flex-col mx-auto w-full",
  {
    size: {
      gap: new GapTheme(),
      maxWidth: new SizeTheme({xs: 'max-w-3xl', sm: 'max-w-4xl', md: 'max-w-5xl', lg: 'max-w-6xl', xl: 'max-w-7xl'}),
    },
    layout: {
      ...defaultLayoutsThemes,
      border: new BorderTheme(),
      ring: new RingTheme(),
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
      radius: RadiusTheme.createLayoutTheme(),
    },
    appearance: {
      background: GenericVariantTheme.createLayoutBgAppearanceTheme(),
      text: GenericVariantTheme.createUIElementTextThemeIgnoreTransparent(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      shadow: GenericVariantTheme.createLayoutShadowTheme(),
    }
  },
  themeDefaults.container as Partial<ContainerProps>,
  CONTAINER_CATEGORIES,
);
