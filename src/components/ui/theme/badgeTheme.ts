import {
  BaseTypographyComponentTheme,
  ComponentTheme, defaultLayoutTheme,
  DefaultLayoutThemes, defaultTypographyTheme
} from "./common/ComponentTheme";
import { BadgeProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { ShadowTheme } from "./layout/shadowTheme";
import { RingTheme } from "./layout/ringTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import { GenericVariantTheme } from "./appearance/genericVariantTheme";

export interface BadgeTheme extends BaseTypographyComponentTheme {
  size: {
    px: PxTheme;
    py: PyTheme;
    text: SizeTheme;
    gap: GapTheme;
    shadow: ShadowTheme;
  };
  appearance: {
    background: GenericVariantTheme<TextAppearanceTheme>;
    text: GenericVariantTheme<TextAppearanceTheme>;
    border: GenericVariantTheme<TextAppearanceTheme>;
    ring: GenericVariantTheme<TextAppearanceTheme>;
  };
  layout: DefaultLayoutThemes & {
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
}

export const defaultBadgeTheme = new ComponentTheme<BadgeProps, BadgeTheme>(
  "span",
  "w-fit h-fit transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new PxTheme({
        padding: {
          xs: "px-2",
          sm: "px-3",
          md: "px-4",
          lg: "px-5",
          xl: "px-6"
        }
      }),
      py: new PyTheme({
        padding: {
          xs: 'py-1',
          sm: 'py-1.5',
          md: 'py-2',
          lg: 'py-2.5',
          xl: 'py-3',
        }
      }),
      gap: new GapTheme({
        gap: {
          xs: 'gap-1',
          sm: 'gap-1.5',
          md: 'gap-2',
          lg: 'gap-2.5',
          xl: 'gap-3',
        }
      }),
      text: new SizeTheme({
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      }),
      shadow: new ShadowTheme(),
    },
    appearance: {
      background: GenericVariantTheme.createSimpleBgAppearanceTheme(),
      text: GenericVariantTheme.createUIElementTextTheme(),
      border: GenericVariantTheme.createBorderAppearanceTheme(),
      ring: GenericVariantTheme.createRingAppearanceTheme(),
    },
    layout: {
      ...defaultLayoutTheme,
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: new RadiusTheme({
        rounded: {
          xs: "rounded-xs",
          sm: "rounded-sm",
          md: "rounded-md",
          lg: "rounded-lg",
          xl: "rounded-xl"
        }
      }),
    },
    typography: defaultTypographyTheme,
  },
  {
    md: true,
    inlineFlex: true,
    outline: true,
    pill: true,
    sans: true,
    semibold: true,
    uppercase: true,
    noShadow: true,
    itemsCenter: true,
    padding: true,
    gap: true,
    ring: true,
  }
);
