import {
  BaseTypographyComponentTheme,
  ComponentTheme, defaultLayoutsThemes,
  DefaultLayoutThemes, defaultTypographyThemes
} from "./common/ComponentTheme";
import { ButtonProps } from "../props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { FocusVisibleTheme } from "./layout/focusVisibleTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { uiPaddingClasses, buttonAspectRatioClasses } from "../classes/layoutClasses";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { BUTTON_CATEGORIES } from "../props";
import { themeDefaults } from "./defaults";

export interface ButtonTheme extends BaseTypographyComponentTheme {
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

export const defaultButtonTheme = new ComponentTheme<ButtonProps, ButtonTheme>(
  "button",
  "w-fit h-fit cursor-pointer transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new PxTheme(uiPaddingClasses, buttonAspectRatioClasses, true),
      py: new PyTheme(uiPaddingClasses, true),
      gap: new GapTheme({xs: '[--gap-unit:1]', sm: '[--gap-unit:1.5]', md: '[--gap-unit:2]', lg: '[--gap-unit:2.5]', xl: '[--gap-unit:3]'}, true),
      text: new SizeTheme({xs: 'text-xs', sm: 'text-sm', md: 'text-base', lg: 'text-lg', xl: 'text-xl'}),
    },
    appearance: {
      background: GenericVariantTheme.createBgAppearanceTheme(),
      text: GenericVariantTheme.createUIElementTextThemeIgnoreTransparent(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      focusVisible: GenericVariantTheme.createUIElementFocusVisibleTheme(),
      shadow: GenericVariantTheme.createUIElementShadowTheme()
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
  themeDefaults.button as Partial<ButtonProps>,
  BUTTON_CATEGORIES,
  (props: ButtonProps) => {
    // Determine tag based on href prop
    return props.href ? "a" : "button";
  }
);
