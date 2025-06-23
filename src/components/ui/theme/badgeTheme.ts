import { BaseComponentTheme, ComponentTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { BadgeProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { ShadowTheme } from "./layout/shadowTheme";
import { RingTheme } from "./layout/ringTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { VariantTheme } from "./appearance/variantTheme";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import {
  backgroundAppearanceClasses,
  filledBackgroundAppearanceClasses,
} from "../classes/appearanceClasses";

export interface BadgeTheme<P> extends BaseComponentTheme<P> {
  size: {
    px: PxTheme;
    py: PyTheme;
    text: SizeTheme;
    gap: GapTheme;
    shadow: ShadowTheme;
  };
  appearance: {
    background: VariantTheme;
    text: VariantTheme;
    border: VariantTheme;
    ring: VariantTheme;
  };
  layout: DefaultLayoutThemes<P> & {
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
}

export const defaultBadgeTheme = new ComponentTheme<BadgeProps, BadgeTheme<BadgeProps>>(
  "span",
  "w-fit h-fit inline-flex transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new PxTheme({
        padding: {
          xs: "px-2",
          sm: "px-2.5",
          md: "px-3.5",
          lg: "px-5",
          xl: "px-6"
        }
      }),
      py: new PyTheme({
        padding: {
          xs: "py-1",
          sm: "py-1.5",
          md: "py-2",
          lg: "py-3",
          xl: "py-4"
        }
      }),
      gap: new GapTheme({
        gap: {
          xs: "gap-1",
          sm: "gap-1.5",
          md: "gap-2",
          lg: "gap-2.5",
          xl: "gap-3"
        }
      }),
      text: new SizeTheme({
        xs: 'text-xs/5',
        sm: 'text-sm/5',
        md: 'text-base',
        lg: 'text-lg/6',
        xl: 'text-xl/6',
      }),
      shadow: new ShadowTheme(),
    },
    appearance: {
      background: VariantTheme.createDefault({
        outline: TextAppearanceTheme.createDefaultStyle({
          base: backgroundAppearanceClasses,
        }),
        filled: TextAppearanceTheme.createDefaultStyle({
          base: filledBackgroundAppearanceClasses,
        })
      }),
      text: VariantTheme.createDefaultText(),
      border: VariantTheme.createDefaultBorder(),
      ring: VariantTheme.createDefaultRing(),
    },
    layout: {
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
  },
  {
    md: true,
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
