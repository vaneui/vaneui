import {
  BaseTypographyComponentTheme,
  ComponentTheme,
  defaultLayoutsThemes,
  DefaultLayoutThemes,
  defaultTypographyThemes
} from "./common/ComponentTheme";
import { CodeProps } from "../props";
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
  "",
  {
    size: {
      px: new PxTheme({
        xs: "[--aspect-ratio:1.8]",
        sm: "[--aspect-ratio:1.8]",
        md: "[--aspect-ratio:1.8]",
        lg: "[--aspect-ratio:1.8]",
        xl: "[--aspect-ratio:1.8]",
      }, true),
      py: new PyTheme({
        xs: "[--py-unit:0.4]",
        sm: "[--py-unit:0.6]",
        md: "[--py-unit:0.8]",
        lg: "[--py-unit:1]",
        xl: "[--py-unit:1.2]",
      }, true),
      text: new FontSizeTheme({
        xs: "[--fs-unit:5]",
        sm: "[--fs-unit:6]",
        md: "[--fs-unit:7]",
        lg: "[--fs-unit:8]",
        xl: "[--fs-unit:9]",
      }),
      lineHeight: new LineHeightTheme(
        {
          xs: "[--lh:1]",
          sm: "[--lh:1]",
          md: "[--lh:1]",
          lg: "[--lh:1]",
          xl: "[--lh:1]"
        }
      ),
      gap: GapTheme.createForUI()
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
      radius: new RadiusTheme({
        xs: '[--br-unit:1]',
        sm: '[--br-unit:2]',
        md: '[--br-unit:3]',
        lg: '[--br-unit:4]',
        xl: '[--br-unit:5]'
      }, true),
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