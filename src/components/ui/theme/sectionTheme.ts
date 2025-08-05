import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { SectionProps } from "../props/props";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import {
  borderAppearanceClasses,
  ringAppearanceClasses
} from "../classes/appearanceClasses";
import { textAppearanceClasses } from "../classes/typographyClasses";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { ShadowAppearanceTheme } from "./appearance/shadowAppearanceTheme";
import { SECTION_CATEGORIES } from "../props";

export interface SectionTheme extends BaseComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    gap: GapTheme;
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
      gap: new GapTheme({
        xs: 'gap-4',
        sm: 'gap-6',
        md: 'gap-8',
        lg: 'gap-12',
        xl: 'gap-16',
      }),
    },
    appearance: {
      background: AppearanceTheme.createLayoutBgTheme(),
      text: AppearanceTheme.createTheme({base: textAppearanceClasses}, {
        transparentClassSource: textAppearanceClasses,
        linkClassSource: textAppearanceClasses
      }),
      border: AppearanceTheme.createTheme({base: borderAppearanceClasses}, {
        transparentClassSource: borderAppearanceClasses,
        linkClassSource: borderAppearanceClasses
      }),
      ring: AppearanceTheme.createTheme({base: ringAppearanceClasses}, {
        transparentClassSource: ringAppearanceClasses,
        linkClassSource: ringAppearanceClasses
      }),
      shadow: ShadowAppearanceTheme.createTheme(),
    },
    layout: {
      ...defaultLayoutTheme,
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: new RadiusTheme({
        xs: 'rounded-md',
        sm: 'rounded-lg',
        md: 'rounded-xl',
        lg: 'rounded-2xl',
        xl: 'rounded-3xl',
      }),
    },
  },
  {
    md: true,
    flex: true,
    default: true,
    itemsStart: true,
    gap: true,
    padding: true,
    noBorder: true,
    noRing: true,
    noShadow: true,
    sharp: true,
  },
  SECTION_CATEGORIES
);
