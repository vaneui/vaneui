import {
  BaseTypographyComponentTheme,
  ComponentTheme, defaultLayoutsThemes,
  DefaultLayoutThemes, defaultTypographyThemes
} from "./common/ComponentTheme";
import { ButtonProps } from "../props";
import { FontSizeTheme } from "./size/fontSizeTheme";
import { LineHeightTheme } from "./size/lineHeightTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { FocusVisibleTheme } from "./layout/focusVisibleTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { uiPaddingClasses } from "../classes/layoutClasses";
import { SizeKey } from "../props";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { BUTTON_CATEGORIES } from "../props";
import { themeDefaults } from "./defaults";

const buttonAspectRatioClasses: Record<SizeKey, string> = {
  xs: "[--aspect-ratio:2]",    // px-2 vs py-1 = 2
  sm: "[--aspect-ratio:2]",    // px-3 vs py-1.5 = 2
  md: "[--aspect-ratio:2]",    // px-4 vs py-2 = 2
  lg: "[--aspect-ratio:2]",    // px-5 vs py-2.5 = 2
  xl: "[--aspect-ratio:2]",    // px-6 vs py-3 = 2
};

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
  "w-fit h-fit cursor-pointer transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new PxTheme(buttonAspectRatioClasses, true),
      py: new PyTheme(uiPaddingClasses, true),
      gap: new GapTheme(true),
      text: new FontSizeTheme(),
      lineHeight: new LineHeightTheme({
        xs: "[--lh:1.3]",
        sm: "[--lh:1.3]",
        md: "[--lh:1.3]",
        lg: "[--lh:1.3]",
        xl: "[--lh:1.3]"
      }),
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
