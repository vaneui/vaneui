import { BaseComponentTheme, ComponentTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { ChipProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { ShadowTheme } from "./layout/shadowTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { VariantTheme } from "./appearance/variantTheme";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import { backgroundAppearanceClasses, filledBackgroundAppearanceClasses } from "../classes/appearanceClasses";

export interface ChipTheme<P> extends BaseComponentTheme<P> {
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
    radius: RadiusTheme;
    border: BorderTheme;
    ring: RingTheme;
  };
}

export const defaultChipTheme = new ComponentTheme<ChipProps, ChipTheme<ChipProps>>(
  "span",
  "w-fit h-fit inline-flex gap-2 items-center transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new PxTheme({
        padding: {
          xs: 'px-2',
          sm: 'px-2.5',
          md: 'px-3',
          lg: 'px-3.5',
          xl: 'px-4',
        }
      }),
      py: new PyTheme({
        padding: {
          xs: 'py-0.5',
          sm: 'py-1',
          md: 'py-1.5',
          lg: 'py-2',
          xl: 'py-2.5',
        }
      }),
      text: new SizeTheme({
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
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
      radius: new RadiusTheme({
        rounded: {
          xs: 'rounded-sm',
          sm: 'rounded-md',
          md: 'rounded-lg',
          lg: 'rounded-xl',
          xl: 'rounded-2xl',
        }
      }),
      border: new BorderTheme(),
      ring: new RingTheme(),
    },
  },
  {
    md: true,
    outline: true,
    secondary: true,
    rounded: true,
    mono: true,
    normal: true,
    noShadow: true,
    padding: true,
    gap: true,
    ring: true,
  }
);
