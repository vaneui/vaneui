import { gapMap, pxMap, pyMap, textSizeMap } from "../classes/buttonClasses";
import { TypographyTheme } from "./typography/typographyTheme";
import { SizeTheme } from "./size/sizeTheme";
import { roundedMap } from "../classes/buttonClasses";
import { StyleAppearanceTheme } from "./appearance/styleAppearanceTheme";
import { StyleVariantComponentTheme } from "./common/styleVariantComponentTheme";
import { RadiusLayoutTheme } from "./layout/radiusLayoutTheme";
import { ButtonProps } from "../props/props";

export const defaultButtonTheme: StyleVariantComponentTheme<ButtonProps> = new StyleVariantComponentTheme<ButtonProps>(
  "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap",
  new SizeTheme(
    pxMap,
    pyMap,
    textSizeMap,
    gapMap
  ),
  StyleAppearanceTheme.createDefault(),
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
