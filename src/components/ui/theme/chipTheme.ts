import { TypographyTheme } from "./typography/typographyTheme";
import { VariantAppearanceTheme } from "./appearance/variantAppearanceTheme";
import { RadiusLayoutTheme } from "./layout/radiusLayoutTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { ChipProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";

export const defaultChipTheme = new ComponentTheme<ChipProps>(
  "span",
  "w-fit h-fit inline-flex gap-2 items-center transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new SizeTheme({
        xs: 'px-2',
        sm: 'px-2.5',
        md: 'px-3.5',
        lg: 'px-5',
        xl: 'px-6',
      }),
      py: new SizeTheme({
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
    },
    appearance: VariantAppearanceTheme.createDefault(),
    typography: TypographyTheme.createDefaultTypographyTheme(),
    radius: RadiusLayoutTheme.createBaseLayoutTheme({
      xs: 'rounded-sm',
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
    }),
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
