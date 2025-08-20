import {
  BaseTypographyComponentTheme,
  ComponentTheme,
  defaultLayoutTheme,
  DefaultLayoutThemes,
  defaultTypographyTheme
} from "./common/ComponentTheme";
import { CodeProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";
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
import { CODE_CATEGORIES } from "../props";

export interface CodeTheme extends BaseTypographyComponentTheme {
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
    shadow: GenericVariantTheme<ShadowAppearanceTheme>;
  };
  layout: DefaultLayoutThemes & {
    radius: RadiusTheme;
    border: BorderTheme;
    ring: RingTheme;
    wrap: WrapTheme;
    flexDirection: DirectionTheme;
  };
}

export const defaultCodeTheme = new ComponentTheme<CodeProps, CodeTheme>(
  "code",
  "",
  {
    size: {
      px: new PxTheme({xs: 'px-1', sm: 'px-1.5', md: 'px-1.5', lg: 'px-2', xl: 'px-2'}),
      py: new PyTheme({xs: 'py-0', sm: 'py-0.5', md: 'py-1', lg: 'py-1', xl: 'py-1'}),
      text: new SizeTheme({xs: 'text-xs', sm: 'text-sm', md: 'text-sm', lg: 'text-base', xl: 'text-lg'}),
      gap: new GapTheme({xs: 'gap-0.5', sm: 'gap-1', md: 'gap-1.5', lg: 'gap-2', xl: 'gap-2.5'})
    },
    appearance: {
      background: GenericVariantTheme.createSimpleUIElementBgAppearanceTheme(),
      text: GenericVariantTheme.createUIElementTextTheme(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      shadow: GenericVariantTheme.createLayoutShadowTheme()
    },
    layout: {
      ...defaultLayoutTheme,
      radius: RadiusTheme.createUITheme(),
      border: new BorderTheme(),
      ring: new RingTheme(),
      wrap: new WrapTheme(),
      flexDirection: new DirectionTheme(),
    },
    typography: defaultTypographyTheme,
  },
  {
    inline: true,
    outline: true,
    default: true,
    rounded: true,
    mono: true,
    padding: true,
    gap: true,
    ring: true,
  },
  CODE_CATEGORIES
);