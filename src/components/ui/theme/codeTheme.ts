import {
  BaseTypographyComponentTheme,
  ComponentTheme,
  defaultLayoutsThemes,
  DefaultLayoutThemes,
  defaultTypographyThemes
} from "./common/ComponentTheme";
import type { CodeProps } from "../code";
import { themeDefaults } from "./defaults";
import { FontSizeTheme } from "./size/fontSizeTheme";
import { LineHeightTheme } from "./size/lineHeightTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { FocusVisibleTheme } from "./layout/focusVisibleTheme";
import { CODE_CATEGORIES } from "../props";

export interface CodeTheme extends BaseTypographyComponentTheme {
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
    radius: RadiusTheme;
    border: BorderTheme;
    ring: RingTheme;
    focusVisible: FocusVisibleTheme;
    wrap: WrapTheme;
    flexDirection: DirectionTheme;
  };
}

export const defaultCodeTheme = new ComponentTheme<CodeProps, CodeTheme>(
  "code",
  "vane-code",
  {
    size: {
      px: new PxTheme(),
      py: new PyTheme(),
      text: new FontSizeTheme(),
      lineHeight: new LineHeightTheme(),
      gap: new GapTheme()
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
      radius: new RadiusTheme(),
      border: new BorderTheme(),
      ring: new RingTheme(),
      focusVisible: new FocusVisibleTheme(),
      wrap: new WrapTheme(),
      flexDirection: new DirectionTheme(),
    },
    typography: defaultTypographyThemes,
  },
  themeDefaults.code,
  CODE_CATEGORIES
);