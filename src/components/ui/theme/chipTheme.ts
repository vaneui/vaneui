import { TypographyTheme } from "./typography/typographyTheme";
import { SizeTheme } from "./size/sizeTheme";
import { VariantAppearanceTheme } from "./appearance/variantAppearanceTheme";
import { VariantComponentTheme } from "./common/variantComponentTheme";
import { RadiusLayoutTheme } from "./layout/radiusLayoutTheme";
import { ChipProps, TypographyComponentProps } from "../props/props";

export const defaultChipTheme: VariantComponentTheme<ChipProps> = VariantComponentTheme.createStyleVariantComponentTheme<ChipProps>(
  "span",
  "w-fit h-fit inline-flex gap-2 items-center transition-all duration-200 whitespace-nowrap",
  new SizeTheme(
    {
      xs: 'px-2',
      sm: 'px-2.5',
      md: 'px-3.5',
      lg: 'px-5',
      xl: 'px-6',
    },
    {
      xs: 'py-1',
      sm: 'py-1.5',
      md: 'py-2',
      lg: 'py-3',
      xl: 'py-4',
    },
    {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-base',
    },
    {
      xs: 'gap-1',
      sm: 'gap-1.5',
      md: 'gap-2',
      lg: 'gap-2.5',
      xl: 'gap-3',
    }
  ),
  VariantAppearanceTheme.createDefault(),
  TypographyTheme.createDefaultTypographyTheme(),
  RadiusLayoutTheme.createBaseLayoutTheme({
    xs: 'rounded-sm',
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
  }),
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
