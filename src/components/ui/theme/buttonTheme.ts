import { BaseComponentTheme, ComponentTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { ButtonProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { ShadowTheme } from "./layout/shadowTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { VariantTheme } from "./appearance/variantTheme";

export interface ButtonTheme<P> extends BaseComponentTheme<P> {
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

export const defaultButtonTheme = new ComponentTheme<ButtonProps, ButtonTheme<ButtonProps>>(
  "button",
  "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new PxTheme({
        padding: {
          xs: 'px-2',
          sm: 'px-2.5',
          md: 'px-3.5',
          lg: 'px-5',
          xl: 'px-6',
        }
      }),
      py: new PyTheme({
        padding: {
          xs: 'py-1',
          sm: 'py-1.5',
          md: 'py-2',
          lg: 'py-3',
          xl: 'py-4',
        }
      }),
      gap: new GapTheme({
        gap: {
          xs: 'gap-1.5',
          sm: 'gap-2',
          md: 'gap-3',
          lg: 'gap-4',
          xl: 'gap-5',
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
      background: VariantTheme.createDefaultBackground(),
      text: VariantTheme.createDefaultText(),
      border: VariantTheme.createDefaultBorder(),
      ring: VariantTheme.createDefaultRing(),
    },
    layout: {
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: new RadiusTheme({
        rounded: {
          xs: 'rounded-sm',
          sm: 'rounded-md',
          md: 'rounded-md',
          lg: 'rounded-lg',
          xl: 'rounded-xl',
        }
      }),
    },
  },
  {
    md: true,
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
  }
);
