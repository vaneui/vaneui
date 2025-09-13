import { BaseComponentTheme, ComponentTheme, defaultLayoutsThemes, DefaultLayoutThemes } from "./common/ComponentTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { SectionProps } from "../props";
import { themeDefaults } from "./defaults";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { SECTION_CATEGORIES } from "../props";
import { BreakpointTheme } from "./size/breakpointTheme";

export interface SectionTheme extends BaseComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
    breakpoint: BreakpointTheme;
  };
  appearance: {
    background: GenericVariantTheme<AppearanceTheme>;
    text: GenericVariantTheme<AppearanceTheme>;
    border: GenericVariantTheme<AppearanceTheme>;
    ring: GenericVariantTheme<AppearanceTheme>;
    shadow: ShadowAppearanceTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    direction: DirectionTheme;
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
}

export const defaultSectionTheme = new ComponentTheme<SectionProps, SectionTheme>(
  "div",
  "w-full flex-col",
  {
    size: {
      px: new PxTheme({
        xs: 'px-5 max-lg:px-4 max-md:px-3',
        sm: 'px-6 max-lg:px-5 max-md:px-4',
        md: 'px-7 max-lg:px-6 max-md:px-5',
        lg: 'px-8 max-lg:px-7 max-md:px-6',
        xl: 'px-9 max-lg:px-8 max-md:px-7',
      }),
      py: new PyTheme({
        xs: 'py-4 max-md:py-3',
        sm: 'py-8 max-md:py-6',
        md: 'py-12 max-md:py-6',
        lg: 'py-16 max-lg:py-14 max-md:py-12',
        xl: 'py-20 max-lg:py-16 max-md:py-12',
      }),
      gap: new GapTheme({xs: 'gap-4', sm: 'gap-6', md: 'gap-8', lg: 'gap-12', xl: 'gap-16'}),
      breakpoint: new BreakpointTheme(),
    },
    appearance: {
      background: GenericVariantTheme.createLayoutBgAppearanceTheme(),
      text: GenericVariantTheme.createUIElementTextThemeIgnoreTransparent(),
      border: GenericVariantTheme.createUIElementBorderTheme(),
      ring: GenericVariantTheme.createUIElementRingTheme(),
      shadow: ShadowAppearanceTheme.createLayoutTheme(),
    },
    layout: {
      ...defaultLayoutsThemes,
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: RadiusTheme.createLayoutTheme(),
    },
  },
  themeDefaults.section as Partial<SectionProps>,
  SECTION_CATEGORIES,
);
