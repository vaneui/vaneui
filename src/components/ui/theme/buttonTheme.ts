import {
  BaseTypographyComponentTheme,
  ComponentTheme, defaultLayoutsThemes,
  DefaultLayoutThemes, defaultTypographyThemes
} from "./common/ComponentTheme";
import type { ButtonProps } from "../button";
import { FontSizeTheme } from "./size/fontSizeTheme";
import { LineHeightTheme } from "./size/lineHeightTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { FocusVisibleTheme } from "./layout/focusVisibleTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
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
    text: FontSizeTheme;
    lineHeight: LineHeightTheme;
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
  "vane-button w-fit h-fit cursor-pointer transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new PxTheme(),
      py: new PyTheme(),
      gap: new GapTheme(),
      text: new FontSizeTheme(),
      lineHeight: new LineHeightTheme(),
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
      radius: new RadiusTheme(),
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
