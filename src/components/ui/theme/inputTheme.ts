import {
  BaseTypographyComponentTheme,
  ComponentTheme, defaultLayoutsThemes,
  DefaultLayoutThemes, defaultTypographyThemes
} from "./common/ComponentTheme";
import { InputProps } from "../props";
import { SizeTheme } from "./size/sizeTheme";
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
import { INPUT_CATEGORIES } from "../props";
import { themeDefaults } from "./defaults";

export interface InputTheme extends BaseTypographyComponentTheme {
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
    focusBorder: GenericVariantTheme<AppearanceTheme>;
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

export const defaultInputTheme = new ComponentTheme<InputProps, InputTheme>(
  "input",
  "w-full transition-all duration-200",
  {
    size: {
      px: new PxTheme({
        xs: 'px-2', sm: 'px-3', md: 'px-4', lg: 'px-5', xl: 'px-6',
      }),
      py: new PyTheme({xs: 'py-1', sm: 'py-1.5', md: 'py-2', lg: 'py-2.5', xl: 'py-3'}),
      gap: new GapTheme({xs: 'gap-1', sm: 'gap-1.5', md: 'gap-2', lg: 'gap-2.5', xl: 'gap-3'}),
      text: new SizeTheme({xs: 'text-xs', sm: 'text-sm', md: 'text-base', lg: 'text-lg', xl: 'text-xl'}),
    },
    appearance: {
      background: GenericVariantTheme.createBgAppearanceTheme(),
      text: GenericVariantTheme.createUIElementTextThemeIgnoreTransparent(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      focusBorder: GenericVariantTheme.createUIElementFocusBorderTheme(),
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
  themeDefaults.input as Partial<InputProps>,
  INPUT_CATEGORIES,
  () => "input"
);