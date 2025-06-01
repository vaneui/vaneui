import { gapMap, pxMap, pyMap, textSizeMap } from "../classes/buttonClasses";
import { roundedMap } from "../classes/buttonClasses";
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
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses, borderAppearanceClasses,
  filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses, filledBorderAppearanceClasses,
  filledHoverBackgroundAppearanceClasses, filledRingAppearanceClasses,
  hoverBackgroundAppearanceClasses, ringAppearanceClasses
} from "../classes/appearanceClasses";
import { filledTextAppearanceClasses, textAppearanceClasses } from "../classes/typographyClasses";

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
      px: new PxTheme(pxMap),
      py: new PyTheme(pyMap),
      text: new SizeTheme(textSizeMap),
      gap: new GapTheme(gapMap),
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
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: new RadiusTheme(roundedMap),
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
  }
);
