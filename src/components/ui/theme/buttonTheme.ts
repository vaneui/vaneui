import { gapMap, pxMap, pyMap, textSizeMap } from "../classes/buttonClasses";
import { TypographyTheme } from "./typography/typographyTheme";
import { SizeTheme } from "./size/sizeTheme";
import { roundedMap } from "../classes/buttonClasses";
import { VariantAppearanceTheme } from "./appearance/variantAppearanceTheme";
import { VariantComponentTheme } from "./common/variantComponentTheme";
import { RadiusLayoutTheme } from "./layout/radiusLayoutTheme";
import { ButtonProps } from "../props/props";

export const defaultButtonTheme: VariantComponentTheme<ButtonProps> = VariantComponentTheme.createStyleVariantComponentTheme<ButtonProps>(
  "button",
  "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap",
  new SizeTheme(
    pxMap,
    pyMap,
    textSizeMap,
    gapMap
  ),
  VariantAppearanceTheme.createDefault(),
  TypographyTheme.createDefaultTypographyTheme(),
  RadiusLayoutTheme.createBaseLayoutTheme(roundedMap),
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
