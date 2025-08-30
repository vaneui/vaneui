import { DirectionTheme } from "./layout/directionTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { StackProps } from "../props";
import { themeDefaults } from "./defaults";
import { GapTheme } from "./size/gapTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { BreakpointTheme } from "./size/breakpointTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { STACK_CATEGORIES } from "../props";

export interface StackTheme extends BaseComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
    breakpoint: BreakpointTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    direction: DirectionTheme;
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
  appearance: {
    background: AppearanceTheme;
    border: GenericVariantTheme<AppearanceTheme>;
    ring: GenericVariantTheme<AppearanceTheme>;
    shadow: GenericVariantTheme<ShadowAppearanceTheme>;
  }
}

export const defaultStackTheme = new ComponentTheme<StackProps, StackTheme>(
  "div",
  "",
  {
    size: {
      px: new PxTheme({xs: 'px-2', sm: 'px-3', md: 'px-4', lg: 'px-5', xl: 'px-6'}),
      py: new PyTheme({xs: 'py-2', sm: 'py-3', md: 'py-4', lg: 'py-5', xl: 'py-6'}),
      gap: new GapTheme(),
      breakpoint: new BreakpointTheme(),
    },
    layout: {
      ...defaultLayoutTheme,
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: RadiusTheme.createLayoutTheme(),
    },
    appearance: {
      background: AppearanceTheme.createLayoutBgTheme(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      shadow: GenericVariantTheme.createLayoutShadowTheme(),
    }
  },
  themeDefaults.stack as Partial<StackProps>,
  STACK_CATEGORIES,
  (props: StackProps, defaults: Partial<StackProps>) => {
    return props.href ? "a" : "div";
  }
);
