import { VariantAppearanceTheme } from "./appearance/variantAppearanceTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { ChipProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { ShadowTheme } from "./layout/shadowTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RingTheme } from "./layout/ringTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";

export const defaultChipTheme = new ComponentTheme<ChipProps>(
  "span",
  "w-fit h-fit inline-flex gap-2 items-center transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new PxTheme({
        xs: 'px-2',
        sm: 'px-2.5',
        md: 'px-3.5',
        lg: 'px-5',
        xl: 'px-6',
      }),
      py: new PyTheme({
        xs: 'py-1',
        sm: 'py-1.5',
        md: 'py-2',
        lg: 'py-3',
        xl: 'py-4',
      }),
      text: new SizeTheme({
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-base',
      }),
      gap: new GapTheme({
        xs: 'gap-1',
        sm: 'gap-1.5',
        md: 'gap-2',
        lg: 'gap-2.5',
        xl: 'gap-3',
      }),
      shadow: new ShadowTheme(),
    },
    appearance: VariantAppearanceTheme.createDefault(),
    layout: {
      radius: new RadiusTheme({
        xs: 'rounded-sm',
        sm: 'rounded-md',
        md: 'rounded-lg',
        lg: 'rounded-xl',
        xl: 'rounded-2xl',
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
  }
);
