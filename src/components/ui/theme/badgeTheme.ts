import {
  BaseTypographyComponentTheme,
  ComponentTheme, defaultLayoutsThemes,
  DefaultLayoutThemes, defaultTypographyThemes
} from "./common/ComponentTheme";
import { BadgeProps } from "../props";
import { themeDefaults } from "./defaults";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { FocusVisibleTheme } from "./layout/focusVisibleTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { uiPaddingClasses, badgeAspectRatioClasses } from "../classes/layoutClasses";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { BADGE_CATEGORIES } from "../props";

export interface BadgeTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    text: SizeTheme;
    gap: GapTheme;
  };
  appearance: {
    background: GenericVariantTheme<AppearanceTheme>;
    text: GenericVariantTheme<AppearanceTheme>;
    border: GenericVariantTheme<AppearanceTheme>;
    ring: GenericVariantTheme<AppearanceTheme>;
    focusVisible: GenericVariantTheme<AppearanceTheme>;
    shadow: GenericVariantTheme<ShadowAppearanceTheme>;
  };
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    ring: RingTheme;
    focusVisible: FocusVisibleTheme;
    radius: RadiusTheme;
    wrap: WrapTheme;
    flexDirection: DirectionTheme;
  };
}

export const defaultBadgeTheme = new ComponentTheme<BadgeProps, BadgeTheme>(
  "span",
  "w-fit h-fit transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new PxTheme(uiPaddingClasses, badgeAspectRatioClasses, true),
      py: new PyTheme(uiPaddingClasses, true),
      gap: new GapTheme({xs: '[--gap-unit:1]', sm: '[--gap-unit:1.5]', md: '[--gap-unit:2]', lg: '[--gap-unit:2.5]', xl: '[--gap-unit:3]'}, true),
      text: new SizeTheme({xs: 'text-xs', sm: 'text-sm', md: 'text-base', lg: 'text-lg', xl: 'text-xl'})
    },
    appearance: {
      background: GenericVariantTheme.createSimpleUIElementBgAppearanceTheme(),
      text: GenericVariantTheme.createUIElementTextThemeIgnoreTransparent(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      focusVisible: GenericVariantTheme.createUIElementFocusVisibleTheme(),
      shadow: GenericVariantTheme.createLayoutShadowTheme()
    },
    layout: {
      ...defaultLayoutsThemes,
      border: new BorderTheme(),
      ring: new RingTheme(),
      focusVisible: new FocusVisibleTheme(),
      radius: RadiusTheme.createUITheme(),
      wrap: new WrapTheme(),
      flexDirection: new DirectionTheme(),
    },
    typography: defaultTypographyThemes,
  },
  themeDefaults.badge as Partial<BadgeProps>,
  BADGE_CATEGORIES,
  (props: BadgeProps) => {
    return props.href ? "a" : "span";
  }
);
