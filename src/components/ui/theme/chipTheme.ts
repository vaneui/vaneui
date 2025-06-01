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
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses,
  borderAppearanceClasses, filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses, filledBorderAppearanceClasses,
  filledHoverBackgroundAppearanceClasses, filledRingAppearanceClasses,
  hoverBackgroundAppearanceClasses,
  ringAppearanceClasses
} from "../classes/appearanceClasses";
import { filledTextAppearanceClasses, textAppearanceClasses } from "../classes/typographyClasses";

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
    appearance: {
      background: VariantTheme.createDefault({
        outline: TextAppearanceTheme.createDefaultStyle({
          base: backgroundAppearanceClasses,
          hover: hoverBackgroundAppearanceClasses,
          active: activeBackgroundAppearanceClasses
        }),
        filled: TextAppearanceTheme.createDefaultStyle({
          base: filledBackgroundAppearanceClasses,
          hover: filledHoverBackgroundAppearanceClasses,
          active: filledActiveBackgroundAppearanceClasses
        })
      }),
      text: VariantTheme.createDefault({
        outline: TextAppearanceTheme.createDefaultStyle({base: textAppearanceClasses}),
        filled: TextAppearanceTheme.createDefaultStyle({base: filledTextAppearanceClasses})
      }),
      border: VariantTheme.createDefault({
        outline: TextAppearanceTheme.createDefaultStyle({base: borderAppearanceClasses}),
        filled: TextAppearanceTheme.createDefaultStyle({base: filledBorderAppearanceClasses})
      }),
      ring: VariantTheme.createDefault({
        outline: TextAppearanceTheme.createDefaultStyle({base: ringAppearanceClasses}),
        filled: TextAppearanceTheme.createDefaultStyle({base: filledRingAppearanceClasses})
      }),
    },
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
