import {
  BaseTypographyComponentTheme,
  ComponentTheme, defaultLayoutTheme,
  DefaultLayoutThemes, defaultTypographyTheme
} from "./common/ComponentTheme";
import { ButtonProps } from "../props/props";
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
import { BUTTON_CATEGORIES } from "../props";

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
    shadow: GenericVariantTheme<ShadowAppearanceTheme>;
  };
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
    wrap: WrapTheme;
    flexDirection: DirectionTheme;
    reverse: DirectionTheme;
  };
}

export const defaultButtonTheme = new ComponentTheme<ButtonProps, ButtonTheme>(
  "button",
  "w-fit h-fit cursor-pointer transition-all duration-200 whitespace-nowrap",
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
      background: GenericVariantTheme.createUIElementBgAppearanceTheme(),
      text: GenericVariantTheme.createUIElementTextTheme(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      shadow: GenericVariantTheme.createUIElementShadowTheme()
    },
    layout: {
      ...defaultLayoutTheme,
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: RadiusTheme.createUITheme(),
      wrap: new WrapTheme(),
      flexDirection: new DirectionTheme(),
      reverse: new DirectionTheme(),
    },
    typography: defaultTypographyTheme,
  },
  {
    md: true,
    inlineFlex: true,
    itemsCenter: true,
    justifyCenter: true,
    outline: true,
    default: true,
    rounded: true,
    sans: true,
    semibold: true,
    textCenter: true,
    noBorder: true,
    gap: true,
    padding: true,
    ring: true,
    shadow: true,
  },
  BUTTON_CATEGORIES,
  (props: ButtonProps, defaults: Partial<ButtonProps>) => {
    // Determine tag based on href prop
    return props.href ? "a" : "button";
  }
);
