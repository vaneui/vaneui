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
import { GenericVariantTheme } from "./appearance/genericVariantTheme";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";

export interface ChipTheme<P> extends BaseComponentTheme<P> {
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
  layout: DefaultLayoutThemes<P> & {
    radius: RadiusTheme;
    border: BorderTheme;
    ring: RingTheme;
  };
}

export const defaultChipTheme = new ComponentTheme<ChipProps, ChipTheme<ChipProps>>(
  "span",
  "w-fit h-fit transition-all duration-200 whitespace-nowrap",
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
      background: GenericVariantTheme.createSimpleBgAppearanceTheme(),
      text: GenericVariantTheme.createUIElementTextTheme(),
      border: GenericVariantTheme.createBorderAppearanceTheme(),
      ring: GenericVariantTheme.createRingAppearanceTheme(),
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
    inlineFlex: true,
    itemsCenter: true,
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
